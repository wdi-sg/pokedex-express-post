const express = require('express');
const jsonfile = require('jsonfile');

const FILE = 'pokedex.json';

const app = express();
const reactEngine = require('express-react-views').createEngine();
app.engine('jsx', reactEngine);
app.set('views', __dirname + '/views');
app.set('view engine', 'jsx');
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
const methodOverride = require('method-override')
app.use(methodOverride('_method'));

// landing page
app.get('/', (request, response) => {
    console.log("landing page");
    response.render('landing');
})

// add pokemon form
app.get('/pokemon/new', (request, response) => {
    console.log("form created");
    response.render('newform');
});

// write new pokemon into array
app.post('/pokemon', (request, response) => {
    console.log("submitting form details");
    console.log(request.body);
    jsonfile.readFile(FILE, (err, obj) => {
        let newPokemon = request.body;
        // represent pokedex.json as an object
        let allPokemon = obj;
        console.log("reading file");
        // push in request.body
        allPokemon.pokemon.push(newPokemon);
        // FILE is pokedex.json, allPokemon is the new object that is being saved
        jsonfile.writeFile(FILE, allPokemon, (err) => {
            if (err) {
                console.error(err)
            } else {
                // "view" part
                response.send(request.body);
                console.log('save success!')
            }

        });
    console.log("append to main pokedex");
    });
});

// search pokemon by id
app.get('/pokemon/:id', (request, response) => {
    console.log("start*****************")

    jsonfile.readFile(FILE, (err, obj) => {
        // receive ID input as integer
        let inputId = parseInt(request.params.id);
        // create "global variable" to hold data
        // let displayData = {};
        let selectedPoke = {};
        // loop through pokemon
        for (let i = 0; i <obj.pokemon.length; i++) {
            let pokemonUnderSelection = obj.pokemon[i];

            // condition for matching id's
            if (inputId === parseInt(pokemonUnderSelection.id)) {
            //equate "global value" to data, remember that selectedPoke holds keys that will be rendered with response.render
                selectedPoke = pokemonUnderSelection;
            }
        }

        const data = {
            pokemon: selectedPoke
        };

    response.render('display', data);
    });
});

// create edit form
app.get('/pokemon/:id/edit', (request, response) => {
    console.log("edit form created");
    let id = parseInt(request.params.id);
    jsonfile.readFile(FILE, (err, obj) =>{
        console.log("this is the pokemon id number:", obj.pokemon[id-1].name)
        // because index [0] is actually first pokemon
        const data = {
            id: obj.pokemon[id-1].id,
            num: obj.pokemon[id-1].num,
            name: obj.pokemon[id-1].name,
            img: obj.pokemon[id-1].img,
            height: obj.pokemon[id-1].height,
            weight: obj.pokemon[id-1].weight
        };
        response.render('editform', data);
    })
});

// this is actually app.put, but i don't understand objects well. so. it will be app.post, cause that has worked.

app.put('/pokemon/:id', (request, response) => {
    var pokeIndexId = request.params.id;
    var editedPokemon = request.body;

    jsonfile.readFile(FILE, (err, obj) => {
        console.log("pokemon being edited is", obj.pokemon[pokeIndexId-1]);

        obj.pokemon[pokeIndexId-1] = editedPokemon;

        jsonfile.writeFile(FILE, obj, (err) => {
            console.log(err);
            response.send("YAY EDITED!!")
        })
    })
})


app.listen(7000, () => console.log('~~~ Tuning in to the waves of port 7000 ~~~'));