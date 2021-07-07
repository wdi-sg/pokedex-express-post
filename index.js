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

const methodOverride = require('method-override')
app.use(methodOverride('_method'));

/**
 * ===================================
 * Routes
 * ===================================
 */

//////////RENDERS NEW POKEMON FORM/////////////
app.get('/pokemon/new', (request, response) => {
    response.render('Form');
});

//////////PAGE SHOWS NEW POKEMON CREATED//////////
app.post('/pokemon', (request, response) => {
    console.log(request.body);
    let newPokemon = request.body

    jsonfile.readFile(FILE, (err, obj) => {
        obj.pokemon.push(newPokemon);

    jsonfile.writeFile('pokedex.json', obj, (err) => {
        console.error(err)

        // now look inside your json file
        response.send(request.body);
    });
    });
});

////////SHOWS POKEMON ID PAGE////////////////
app.get('/pokemon/:id', (request, response) => {
  // get json from specified file
  jsonfile.readFile(FILE, (err, obj) => {
    
    // check to make sure the file was properly read
    if( err ){
      
      console.log("error with json read file:",err);
      response.status(503).send("error reading filee");
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

//////////SHOWS FORM TO EDIT POKEMON////////////
app.get('/pokemon/:id/edit', (request, response) => {

    let inputId = parseInt( request.params.id );
  // get json from specified file
    jsonfile.readFile(FILE, (err, obj) => {
        var pokemon;

    // find pokemon by id from the pokedex json file
        for( let i=0; i<obj.pokemon.length; i++ ){
         let currentPokemon = obj.pokemon[i];
         if( currentPokemon.id === inputId ){
         pokemon = currentPokemon;
      }
    }

      const pokemonData = pokemon;
      response.render('Edit', pokemonData);
    });
});

///////////PAGE SHOWS EDITED POKEMON PAGE//////////
app.put("/pokemon/:id", (request, response) => {
  //read the file in and write out to it
    let identity = request.params.id;
    let index = identity - 1;
    let edit = request.body;

    jsonfile.readFile(FILE, (err, obj) => {
        edit.id = parseInt(edit.id);
        obj.pokemon[index] = edit;
        let currentPokemon = obj.pokemon[index];

    const data = {
        pokedex: obj.pokemon,
        individual: obj.pokemon[index],
        id: obj.pokemon[index].id
        };

    response.send(currentPokemon);

    jsonfile.writeFile(FILE, obj, { spaces: 2 }, (err) => {
            console.error(err)
        });
    });
});

/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));