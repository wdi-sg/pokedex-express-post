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
app.use(express.urlencoded({ //use this so that we can do request.body later
  extended: true
}));

/**
 * ===================================
 * Routes
 * ===================================
 */

app.get('/:id', (request, response) => {

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
//Expose a new endpoint that intercepts GET requests to /pokemon/new, which responds with a HTML page with a form that has these fields: id, num, name, img, height, and weight
app.get('/pokemon/new', (request, response) => {
  let  respond =  '<h1>New Pokemon</h1>'+
                  '<form method="POST" action="/pokemon">'+ //this action ideally will point to another app.get or app.post function that has
                  'Pokemon ID: <input type= "number" name = "id">'+
                  'Pokemon Num: <input type= "text" name = "num">'+
                  'Pokemon Name: <input type= "text" name = "name">'+
                  'Pokemon Image: <input type= "image" name = "img">'+
                  'Height: <input type= "number" name = "height">'+
                  'Weight: <input type= "number" name = "weight">'+
                  '<input type= "submit" value= "Submit">'+
                  '</form>';
  response.send(respond);
});

//Point the form to submit data to the (/pokemon) route using POST method;
// app.post('/pokemon', (request, response) => {
//   // we are recieving data
//   console.log("this is request body:",request.body);
//   // save the request body
//   jsonfile.writeFile('data.json', request.body, (err) => {
//     console.error(err)
//     console.log(request.body);
//     // now look inside your json file
//     response.send(request.body);
//   });
// });

//Expose a new endpoint that accepts POST requests to /pokemon, which parses the form data and saves the new pokemon data into pokedex.json
app.post('/pokemon', (request, response) => {
  // we are recieving data
  console.log("this is request body:",request.body);
  // save the request body
jsonfile.readFile(FILE, (err, obj) => {

  console.log("reading file now");
  console.error(err);
  console.log(request.body);
  console.log("done reading file");
  obj.pokemon.push(request.body);

  jsonfile.writeFile(FILE, obj, { spaces: 2 }, (err) => {
    console.log("writing file now");
    console.error(err);
    // now look inside your json file
    response.send(obj);
    console.log("done writing file");
    console.log(obj);
    });
  });
});



// app.get('/', (request, response) => {
//   response.send("yay");
// });

/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));
