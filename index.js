const express = require('express');
const jsonfile = require('jsonfile');


// Init express app
const app = express();

// tell your app to use the module
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

const reactEngine = require('express-react-views').createEngine();
app.engine('jsx', reactEngine);

// this tells express where to look for the view files
app.set('views', __dirname + '/views');

// this line sets react to be the default view engine
app.set('view engine', 'jsx');


const FILE = 'pokedex.json';

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



app.get('/pokemon/new',(request,response)=>{
    response.render('form');
});

 app.post('/pokemon',(request, response)=>{
  console.log("EVERYTHING in the form request", request.body );
  jsonfile.readFile(FILE,(err, obj) => {
    obj.pokemon.push(request.body);
    response.send(obj.pokemon);
    jsonfile.writeFile(FILE,obj,{spaces: 2},(err) => {
        console.error(err);
    });
});
})



app.get('/pokemon/:id', (request, response) => {

  // get json from specified file
  jsonfile.readFile(FILE, (err, obj) => {
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





/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));