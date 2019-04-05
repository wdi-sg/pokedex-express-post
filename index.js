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

app.get('/', (request, response) => {
  response.send("yay");
});

 /**
 * ===================================
 * Create New Pokemon
 * ===================================
 */

 app.get('/pokemon/new', (request, response) => {
    let html = `<html>`;
    html += `<body>`;
    html += `<form method="POST" action="/pokemon">`;
    html += `<h1>Create a Pokemon</h1>`;
    html += `<p>ID: <input type="text" name="id"></p>`;
    html += `<p>Num: <input type="text" name="num"></p>`;
    html += `<p>Name: <input type="text" name="name"></p>`;
    html += `<p>Img: <input type="text" name="img"></p>`;
    html += `<p>Height: <input type="text" name="height"></p>`;
    html += `<p>Weight: <input type="text" name="weight"></p>`;
    html += `<p><input type="submit" value="Submit"></p>`;
    html += `</form>`;
    html += `</body>`;
    html += `</html>`;

  // render a template form here
  response.send(html);

});

/**
 * ===================================
 * Add Edits to JSON file
 * ===================================
 */

 app.put('/pokemon/:id', (request, response) => {

    console.log("REQ BODY:", request.body )

    // get what is currently in file

        //n change it with what's in the request

    jsonfile.readFile( FILE, (err, obj) => {
          // console.log( "obj:",obj );
          console.log( "err:",err );

          let requestedPokemonId = parseInt( request.params.id );

          for( let i=0; i< obj.pokemon.length; i++){

            if( obj.pokemon[i].id === requestedPokemonId){

                var foundPokemonIndex = i;

                var foundPokemon = obj.pokemon[i];
            }
          }

          if( foundPokemon ){

            console.log("FOUND:", foundPokemon );

            obj.pokemon[foundPokemonIndex] = request.body;

            obj.pokemon[foundPokemonIndex].id = parseInt( obj.pokemon[foundPokemonIndex].id )

            jsonfile.writeFile(FILE, obj, function (err) {
                if (err) console.log("ERROR:",err)

                response.send("FOUND, WORKS")
            })

          } else{
              response.send("Pokemon not found");
          }
      });

})

/**
 * ===================================
 * React
 * ===================================
 */

 app.get('/pokemon/:id/edit', (request, response) => {

    jsonfile.readFile(FILE, (err, obj) => {
    // obj is the object from the pokedex json file
    // extract input data from request
    let requestPokemonId = parseInt( request.params.id );

    for( let i=0; i < obj.pokemon.length; i++ ){

        if( obj.pokemon[i].id === requestPokemonId ){

            var foundPokemon = obj.pokemon[i];
        }
    }
    if(foundPokemon){
        console.log("FOUND:", foundPokemon );

        response.render('home', foundPokemon);

    } else {
        response.send("Pokemon not found");
    }

});

  // running this will let express to run home.handlebars file in your views folder

});

 /**
 * ===================================
 * ID
 * ===================================
 */

app.get('/pokemon/:id', (request, response) => {

  // get json from specified file
  jsonfile.readFile(FILE, (err, obj) => {
    // obj is the object from the pokedex json file
    // extract input data from request
    let inputId = parseInt( request.params.id );

    var pokemon;

    // find pokemon by id from the pokedex json file
    // console.log('INPUT ID:', inputId);

    for( let i=0; i<obj.pokemon.length; i++ ){

      let currentPokemon = obj.pokemon[i];
      // console.log('CURRENT ID:', currentPokemon.id);

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
 * Add to JSON file
 * ===================================
 */

app.post('/pokemon', function(request, response) {

  //debug code (output request body)
  // console.log(request.body);

  let file = 'pokedex.json';

  const obj = request.body;

  obj['id'] = parseInt(obj['id']);

  // console.log(obj['id']);

  jsonfile.readFile(FILE, (err, obj) => {

    // console.log(obj);

    obj["pokemon"].push(request.body);

    jsonfile.writeFile(FILE, obj, (err) => {

        console.log(err)

    });
});

  // // save the request body
  // jsonfile.writeFile('pokedex.json', request.body, (err) => {
  //   console.error(err)

    // now look inside your json file
    response.send(request.body);
  });
// });

/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));
