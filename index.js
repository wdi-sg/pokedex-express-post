const express = require('express');
const jsonfile = require('jsonfile');

const FILE = 'pokedex.json';

// this line below, sets a layout look to your express project
const reactEngine = require('express-react-views').createEngine();



/**
 * ===================================
 * Configurations and set up
 * ===================================
 */

// Init express app
const app = express();

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

app.get('/pokemon/new', (request, response) => {
  response.render('form');
});

app.get('/pokemon', (request, response) => {
  response.render('form');
});

app.post('/pokemon', (req, res) => {
    // res.send(req.body);
    jsonfile.readFile(FILE, (err, obj) => {
        let newobj = {
            "id": req.body.id,
            "num": req.body.num,
            "name": req.body.name,
            "img": req.body.img,
            "height": req.body.height,
            "weight": req.body.weight
        }

        for (let property in newobj){
            if (newobj[property] == ""){
                const data = {message: "Dude you need to fill in everything"}
                res.render('form', data)
                return
            }
        }

        obj.pokemon.push(newobj);
        jsonfile.writeFile(FILE, obj, (err) => {
        console.error(err)
        // now look inside your json file
        res.send("The pokemon has been added to pokedex.json!");
        });
    })
})


// app.get('/pokemon/:id', (request, response) => {

//   // get json from specified file
//   jsonfile.readFile(FILE, (err, obj) => {

//     // check to make sure the file was properly read
//     if( err ){

//       console.log("error with json read file:",err);
//       response.status(503).send("error reading filee");
//       return;
//     }
//     // obj is the object from the pokedex json file
//     // extract input data from request
//     let inputId = parseInt( request.params.id );

//     var pokemon;

//     // find pokemon by id from the pokedex json file
//     for( let i=0; i<obj.pokemon.length; i++ ){

//       let currentPokemon = obj.pokemon[i];

//       if( currentPokemon.id === inputId ){
//         pokemon = currentPokemon;
//       }
//     }

//     if (pokemon === undefined) {

//       // send 404 back
//       response.status(404);
//       response.send("not found");
//     } else {

//       response.send(pokemon);
//     }
//   });
// });

app.get('/sort', (req, res) =>{
    console.log(req.query.sortby)
    //comparison function
    let sorter = req.query.sortby;

    let comparator = (a, b) =>{
        if (a[sorter] < b[sorter]) {
            return -1;
        }
      if (a[sorter] > b[sorter]) {
        return 1;
      }
      // a must be equal to b
      return 0;
    }


    jsonfile.readFile(FILE, (err, obj) => {

        obj.pokemon.sort(comparator);
        // res.send(obj.pokemon)

        jsonfile.writeFile(FILE, obj, (err) => {
        console.error(err)
        // now look inside your json file
        res.send("The pokemon have been sorted!");
        });
    })

})

app.get('/index', (req, res) => {
    jsonfile.readFile(FILE, (err, obj) => {
        let pokeArray = [];
        for (let el of obj.pokemon){
            pokeArray.push(el.name)
        }
        const data = {pokeArray}
        res.render('index', data)

    })
})

app.get('/types', (req, res) => {
    jsonfile.readFile(FILE, (err, obj) => {
        let pokeTypeArray = [];
        for (let el of obj.pokemon){
            for (let type of el.type){
                pokeTypeArray.push(type)
            }
        }
        let uniquePokeTypeArray = pokeTypeArray.filter((item, index) => {
            return pokeTypeArray.indexOf(item) === index
        })

        let typesWithPokemonArray = []
        for (let type of uniquePokeTypeArray){
            let pokeType = {
                "type": type,
                "pokemon" : []
            }
            typesWithPokemonArray.push(pokeType);
        }

        //for each object in the types array
        for (let i = 0; i < typesWithPokemonArray.length; i++){
            for (let j = 0; j < obj.pokemon.length; j++){
                for (let k = 0; k < obj.pokemon[j].type.length; k++){
                    if (obj.pokemon[j].type[k] === typesWithPokemonArray[i].type){
                        typesWithPokemonArray[i].pokemon.push(obj.pokemon[j].name)
                    }
                }
            }
        }

        const data = {typesWithPokemonArray}

        res.render('types', data)

    })
})


app.get('/pokemon/:name', (req, res) => {
    const data = {"name": req.params.name}
    res.render('pokemonPage', data)
})

app.get('/pokemon/:name/edit', (req, res) => {
    res.send("Page under construction")
})

app.get('/createPokemon', (req, res) =>{
    res.send("Page under construction")
})

app.get('/', (request, response) => {
  response.render('home')
});

/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));