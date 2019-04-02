const express = require('express');
const jsonfile = require('jsonfile');

const FILE = 'pokedex.json';

/**
 * ===================================
 * Configurations and set up
 * ===================================
 */


const app = express();

// tell your app to use the module
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

app.get('/pokemon/new', function(request, response) {
    let  newForm =`<h1>Input new pokemon</h1>
                  <form method="POST" action="/pokemon">
                  <label for="ID">ID</label>
                  <input type="number" name="ID" step="1">
                  <br>
                  <br>
                  <label for="Num">Num</label>
                  <input type="number" name="Num" step="1">
                  <br>
                  <br>
                  <label for="Name">Name</label>
                  <input type="text" name="name">
                  <br>
                  <br>
                  <label for="Img">Image</label>
                  <input type="text" name="img">
                  <br>
                  <br>
                  <label for="Height">Height</label>
                  <input type="text" name="height">
                  <br>
                  <br>
                  <label for="Weight">Weight</label>
                  <input type="text" name="weight">
                  <br>
                  <br>
                  <input type="submit" value="Submit">
                  </form>`;

    console.log(request.body);

  jsonfile.writeFile('data.json', request.body, (err) => {
    console.error(err)

    // console.log(request.body);
    response.send(newForm);
  });
});

// /**
//  * ===================================
//  * Routes
//  * ===================================
//  */

// app.post('/pokemon/new', function(request, response) {

//   //debug code (output request body)
//   console.log(request.body);


//   // save the request body
//   jsonfile.writeFile('data.json', request.body, (err) => {
//     console.error(err)

//     // now look inside your json file
//     response.send(request.body);
//   });
// });




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

// app.post('/pokemon/new', function(request, response) {

//   //debug code (output request body)
//   console.log(request.body);
//     jsonfile.readFile('data.json', (err, obj) => {
//         obj.pokemon.push(request.body);

//   // save the request body
//   jsonfile.writeFile('data.json', obj, (err) => {
//     console.error(err)

//     // now look inside your json file
//     response.send(request.body);
//   });
// });

app.get('/', (request, response) => {
  response.send("yay");
});

/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));