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

// @@@@@@@@@@@@@@@@@@@@@@@@

// landing page

app.get('/', (request, response) => {
    console.log("landing page");
    response.render('landing');
})


// get pokemon by id

app.get('/pokemon/:id', (request, response) => {
    jsonfile.readFile(FILE, (err, obj) => {
        // receive ID input as integer
        let inputId = parseInt(request.params.id);
        // create "global variable" to hold data
        let displayData;
        // loop through pokemon
        for (let i = 0; i <obj.pokemon.length; i++) {
            let selectedPoke = obj.pokemon[i];
            // condition for matching id's
            if (inputId === selectedPoke.id) {
            //equate "global value" to data, remember that selectedPoke holds keys that will be rendered with response.render
                displayData = selectedPoke;
            }
        }
    response.render('display', displayData);
    });
});

// create form for editing
app.get('/pokemon/:id/edit', (request, response) => {
    console.log("edit form created!")
    response.render('editform');
})

// search form for new pokemon

app.get('/pokemon/new/entry', (request, response) => {
    console.log("form created");
    response.render('newform');
});

// writing new pokemon to the current batch of 151

app.post('/pokemon/new/added', (request, response) => {
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

app.listen(7000, () => console.log('~~~ Tuning in to the waves of port 7000 ~~~'));