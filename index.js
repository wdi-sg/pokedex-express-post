const express = require('express');
const jsonfile = require('jsonfile');

const FILE = 'pokedex.json';

/**
 * ===================================
 * Configurations and set up
 * ===================================
 */

// Init express app
const app = express();

// this line below, sets a layout look to your express project
const reactEngine = require('express-react-views').createEngine();
app.engine('jsx', reactEngine);

// this tells express where to look for the view files
app.set('views', __dirname + '/views');

// this line sets react to be the default view engine
app.set('view engine', 'jsx');

// tell your app to use the module
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

/**
 * ===================================
 * Routes
 * ===================================
 */

// app.get('/pokemon/:id', (request, response) => {

//   // get json from specified file
//   jsonfile.readFile(FILE, (err, obj) => {

//     // check to make sure the file was properly read
//     if( err ){

//       console.log("error with json read file:",err);
//       response.status(503).send("error reading filee");
//       return;
//     }

//     else {
//         // obj is the object from the pokedex json file
//         // extract input data from request
//         let inputId = parseInt( request.params.id );

//         var pokemon;

//         // find pokemon by id from the pokedex json file
//         for( let i=0; i<obj.pokemon.length; i++ ){

//           let currentPokemon = obj.pokemon[i];

//           if( currentPokemon.id === inputId ){
//             pokemon = currentPokemon;
//           }
//         }

//         if (pokemon === undefined) {

//           // send 404 back
//           response.status(404);
//           response.send("not found");
//         } else {

//           response.send(pokemon);
//         }
//     }
//   });
// });


app.get('/singlepokemon/:pokemon', (request, response) => {
    const pokemonName = request.params.pokemon;
    const file = 'pokedex2.json';

    jsonfile.readFile(file, (err, obj) => {
        let pokemonDetails;


        for (var i = 0; i < obj.pokemon.length; i++) {
            if (obj.pokemon[i].name.toLowerCase() === pokemonName){

                pokemonDetails = obj.pokemon[i];
            }
        }

        const data = {"pokemonDetails" : pokemonDetails}

        response.render('singlepokemon', data);
    })

})

app.get('/sortby', (request, response) => {
    // Get option selected
    const option = request.query.option;

    if (option === "name"){
        const file = 'pokedex2.json';
        jsonfile.readFile(file, (err, obj) => {
            const pokedexArray = obj["pokemon"];
            const pokemonNameArray = [];

            for (var i = 0; i < pokedexArray.length; i++) {
                pokemonNameArray.push(pokedexArray[i].name)
            }
            pokemonNameArray.sort();
            const data = {"pokemonNameArray" : pokemonNameArray};

            response.render('sortbyname', data);
        })
    }
    else if (option === "type"){
        const file = 'pokedex3.json';
        jsonfile.readFile(file, (err, obj) => {
            const pokedexArray = obj["pokemon"];
            const pokemonTypesArray = [];

            // Put all the types of pokemon in an array
            for (var i = 0; i < pokedexArray.length; i++) {
                for (var u = 0; u < pokedexArray[i].type.length; u++) {
                    if ( !(pokemonTypesArray.includes(pokedexArray[i].type[u])) ){
                        pokemonTypesArray.push(pokedexArray[i].type[u])
                    }
                }
            }

            // Arrange pokemon according to types
            // Ask instructor why reducer below is able to convert array to object

            const pokemonTypesObject = pokemonTypesArray.reduce((a,b)=> (a[b]=[],a),{});

            for (var n = 0; n < pokedexArray.length; n++) {
                for (var m = 0; m < pokedexArray[n].type.length; m++) {
                    const pokeType = pokedexArray[n].type[m]
                    pokemonTypesObject[`${pokeType}`].push(pokedexArray[n].name)

                }
            }

            const data = {"pokemonTypesArray": pokemonTypesArray, "pokemonTypesObject" : pokemonTypesObject}

            response.render('sortbytype', data);
        })
    }

})

app.get('/new', (request, response) => {
    console.log("going to new page")
    response.render('new');
});

app.post('/newpokemon', (request, response) => {
    // Find which field in form is not field
    let inputError = false;
    const formInputs = Object.values(request.body);
    for (let i=0; i<formInputs.length; i++){
        if (formInputs[i] === "") {
            // Find which key the input belongs to
            const formKeys = Object.keys(request.body)
            console.log("there is an error")
            const data = {"errorInput" : "please input empty field", "errorKey" : formKeys[i]}
            response.render('new', data);
            inputError = true;
        }
    }

    if (!inputError) {
        console.log('there is no error')
        const file = 'pokedex2.json';
        jsonfile.readFile(file, (err, obj) => {
            const pokedexArray = obj["pokemon"];
            pokedexArray.push(request.body);
            const data = {"pokemonDetails" : request.body}
            response.render('newpokemon', data);
            jsonfile.writeFile(file, obj, (err) => {
            })
        })
    }
})



app.get('/', (request, response) => {

    const file = "pokedex2.json";

    jsonfile.readFile(file, (err, obj) => {
        const pokedexArray = obj["pokemon"];
        const pokemonNameArray = [];
        for (var i = 0; i < pokedexArray.length; i++) {
            pokemonNameArray.push(pokedexArray[i].name.toLowerCase())
        }
        let data = {};
        data.pokemons = {"pokemonNameArray" : pokemonNameArray};


        response.render("home", data.pokemons);
    });
})


// app.get('/', (request, response) => {
//   response.render("home");
// });

/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));