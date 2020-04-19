const express = require('express');
const jsonfile = require('jsonfile');

const FILE = 'pokedex.json';
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
 * Configurations and set up
 * ===================================
 */



/**
 * ===================================
 * Routes
 * ===================================
 */

app.post('/pokemon', (request, response) =>{


  jsonfile.writeFile('pokedex.json', request.body, (err) =>{
    console.log(err);
    console.log(request.body);
    //response.send(request.body)
  })
})


app.get('/pokemon/new', (request, response) =>{
  response.render('forms');
})

app.get('/pokemon/:id', (request, response) => {

  // get json from specified file
  jsonfile.readFile(FILE, (err, obj) => {

    // check to make sure the file was properly read
    if( err ){

      console.log("error with json read file:",err);
      response.status(503).send("error reading file");
      return;
    }
    // //get new form
    // if (request.params.id === 'new'){
    // response.render('forms');
    //}
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
    }

    else {

      response.send(pokemon);
    }
  });
});

app.get('/', (request, response) => {
  response.send("yay");
});









/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));



//=====================================================//
//=====================================================//
//=====================================================//
//=====================================================//
//=====================================================//
//=====================================================//
//=====================================================//
//=====================================================//
//=====================================================//
//=====================================================//
//=====================================================//
//=====================================================//
//=====================================================//
//=====================================================//
//=====================================================//
//=====================================================//


