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

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

// this line below, sets a layout look to your express project
const reactEngine = require('express-react-views').createEngine();
app.engine('jsx', reactEngine);

// this tells express where to look for the view files
app.set('views', __dirname + '/views');

// this line sets react to be the default view engine
app.set('view engine', 'jsx');


/**
 * ===================================
 * Routes
 * ===================================
 */
 //new pokemon form page --> !!! CREATE VALIDATION in input
app.get('/pokemon/new', (request, response) => {
  response.render('NewPokemon');
});


//!!! CREATE JSX TO DISPLAY POKEMON!!!//
app.get('/pokemon/:id', (request, response) => {
  // get json from specified file
  jsonfile.readFile(FILE, (err, obj) => {

    // check to make sure the file was properly read
    if( err ){
      console.log("error with json read file:",err);
      response.status(503).send("error reading file");
      return;
    }
    // obj is the object from the pokedex json file
    // extract input data from request
    let inputId = parseInt( request.params.id );

    var pokemon;

    // find pokemon by id from the pokedex json file
    for( let i=0; i<obj.pokemon.length; i++ ){

      let currentPokemon = obj.pokemon[i];

      if( currentPokemon.id === inputId ){
        pokemon = currentPokemon;
      }
    }

    if (pokemon === undefined) {
      // send 404 back
      response.status(404);
      response.send("not found");

    } else {
      response.send(pokemon);
    }
  });
});

//!!! CREATE JSX FOR HOME PAGE!!!//
app.get('/', (request, response) => {
  //response.render('home') //this is the home page
  response.send("This is the Pokedex Express App");
});
// add Sort by name button for later


// validate the user's input data. If the user makes a mistake (i.e., the name of the pokemon is empty) render the form instead. Display the error that they made and how they can correct it.
app.post('/pokemon', (request, response) => {
    console.log(request.body);

   jsonfile.readFile(FILE, (err, obj) => {
    let idNum = parseInt(request.body.ID);
    let pokeNum = parseInt(request.body.Number);
    let pokeName = request.body.name;
    let img = request.body.Image;
    let height = request.body.Height;
    let weight = request.body.Weight;

//if any of the input fields are empty/invalid, display error and how they can correct it and still render form
// Stuart - commenting out for now
    // var idValidation = (isNaN(idNum) || request.body.ID.isEmpty()) ? 'Please enter a valid number' : 'OK'


    //create new object for newly added pokemon
    let newPokemon = {};
        newPokemon.id = idNum;
        newPokemon.num = pokeNum;
        newPokemon.name = pokeName;
        newPokemon.img = img;
        newPokemon.height = height;
        newPokemon.weight = weight;

    //push object into pokemon array in pokedex
    obj.pokemon.push(newPokemon);

    jsonfile.writeFile(FILE, obj, (err) => {
      console.error(err);
      console.log(obj);

      // now look inside your json file
      //render jsx file to go back to home page
      response.send('New Pokemon Added');
    });

  });

});


/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));
