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

app.get('/', (request, response) => {
    console.log("landing page");
    response.render('landing');
})

app.get('/pokemon/new', (request, response) => {
    console.log("form created");
    response.render('home');
});

app.get('/pokemon/:id', (request, response) => {

  // get json from specified file
  // jsonfile.readFile(FILE, (err, obj) => {
  //   // obj is the object from the pokedex json file
  //   // extract input data from request
  //   let inputId = parseInt( request.params.id );

  //   var pokemon;

  //   // find pokemon by id from the pokedex json file
  //   for( let i=0; i<obj.pokemon.length; i++ ){

  //     let currentPokemon = obj.pokemon[i];

  //     if( currentPokemon.id === inputId ){
  //       pokemon = currentPokemon;
  //     }
  //   }

  //   if (pokemon === undefined) {

  //     // send 404 back
  //     response.status(404);
  //     response.send("not found");
  //   } else {

  //     // response.send(pokemon);
  //   // displaying image from other jsx file
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

app.listen(7000, () => console.log('~~~ Tuning in to the waves of port 7000 ~~~'));