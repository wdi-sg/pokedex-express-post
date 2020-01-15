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

/**
 * ===================================
 * Routes
 * ===================================
 */

app.post('/pokemon/', (request, response) => {
    console.log('Received POST');
    console.log(request.body);
    const newPokemon = {
        id: request.body.id,
        num: request.body.num,
        name: request.body.name,
        img: request.body.img,
        height: request.body.height,
        weight: request.body.weight
    }

    jsonfile.readFile(FILE, (err, obj) => {

        // check to make sure the file was properly read
        if (err) {

            console.log("There is an error :", err);
            response.status(503).send("error reading file");
            return;
        }

        obj.pokemon.push(newPokemon);

        jsonfile.writeFile(FILE, obj, (err) => {
            if (err) console.log(err);
            console.log('Manage to add ' + newPokemon);
            response.send('Hey you added new pokemon ' + newPokemon.name);
            return;
        })
    })
})

app.get('/pokemon/new', (request, response) => {

  let myForm = '<html><form method="POST" action="/pokemon">ID:<input type="text" name="id"><br>Number:<input type="text" name="num"><br>Name:<input type="text" name="name"><br>Image:<input type="text" name="img"><br>Height:<input type="text" name="height"><br>Weight:<input type="text" name="weight"><br><input type="submit" value="Submit"></form></html>';

  response.send(myForm);

});

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

// app.get('/', (request, response) => {
//   // render a template form here
//   response.send("hello world");
// });

/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));