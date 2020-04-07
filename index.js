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

app.post('/newpokemon', function(request, response) {

  //debug code (output request body)
  console.log(request.body);
jsonfile.readFile(FILE,(err,obj)=>{

    console.log(typeof request.body);
        console.log(obj["pokemon"].length);
    obj["pokemon"].push(request.body);

    console.log(obj["pokemon"].length);
      jsonfile.writeFile(FILE, obj, (err) => {
    console.error(err)

    // now look inside your json file
    response.send(obj);
  });


});

  // save the request body

});

/**
 * ===================================
 * Routes
 * ===================================
 */

app.get('/pokemon/new', (request, response) => {
  // render a template form here
  response.send(`<form method="POST" action="/newpokemon">
  <span>Pokemon ID: </span>
  <input type="number" name="id">
  <span><br><br>Num: </span>
  <input type="text" name="num">
  <span><br><br>Name: </span>
  <input type="text" name="name">
    <span><br><br>Img: </span>
  <input type="text" name="img">
  <span><br><br>Height: </span>
  <input type="text" name="height">
  <span><br><br>Weight: </span>
  <input type="text" name="weight">
  <input type="submit" value="Submit">
</form>`);
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



app.get('/', (request, response) => {
  response.send("yay");
});
/**
 * ===================================
 * Creating a form
 * ===================================
 */




/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));