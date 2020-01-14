/**
 * ===================================
 * Configurations and set up
 * ===================================
 */

const express = require('express');
const jsonfile = require('jsonfile');


// Init express app
const app = express();
const FILE = 'pokedex.json';

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

/**
 * ===================================
 * Routes
 * ===================================
 */

const display = (request, response) => {
    jsonfile.readFile('pokedex.json', (err,obj) => {
        obj.pokemon.push(request.body)
        response.send("worked!")
        jsonfile.writeFile('pokedex.json', obj, (err) => {
        });
    });
}

app.post('/pokemon', display)

const form = (request,response) => {
    response.send(`
        <form method="POST" action="/pokemon">
        ID: <br>
        <input type="text" name="id"><br>
        Num: <br>
        <input type="text" name="num"><br>
        Name: <br>
        <input type="text" name="name"><br>
        Img: <br>
        <input type="text" name="img"><br>
        Height: <br>
        <input type="text" name="height"><br>
        Weight: <br>
        <input type="text" name="weight"><br>
        <input type="submit" value="Submit">
        </form>
        `)
}

app.get('/pokemon/new', form)


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

app.get('/', (request, response) => {
  response.send("yay");
});

/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));