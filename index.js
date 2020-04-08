const express = require('express');
const jsonfile = require('jsonfile');
const app = express();


// this line below, sets a layout look to your express project
const reactEngine = require('express-react-views').createEngine();
app.engine('jsx', reactEngine);

// this tells express where to look for the view files
app.set('views', __dirname + '/views');

// this line sets react to be the default view engine
app.set('view engine', 'jsx');


const FILE = 'pokedex.json';

app.get('/pokemon', (req, res) => {
  // running this will let express to run home.handlebars file in your views folder
      jsonfile.readFile(FILE, (err, obj) => {
      const data = {pokemon: obj.pokemon}
      res.render('index', data)
    });
});




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

// tell your app to use the module
 app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

app.post('/pokemon', function(request, response) {

  //debug code (output request body)
  console.log(request.body);


  // save the request body

    jsonfile.readFile(FILE, (err, obj) => {

    // check to make sure the file was properly read
    obj.pokemon.push(request.body)
        jsonfile.writeFile('pokedex.json',obj, (err) => {
        console.error(err)

    // now look inside your json file
        response.send(request.body);
    });
    });
});
//cannot get it to pokemon/new --> might be due to parsing of the :new.
// app.get('/pokemon/:new', (request, response)
//temporarily changed to pokeform
app.get('/pokemon/new', (request, response) => {
      response.send(`<form method="POST" action="/pokemon">
      Pokemon Name:
<div>
      <input type="text" placeholder= "ID" name=" id">
</div>
      <input type="text" placeholder= "Number" name=" num">
<div>
      <input type="text" placeholder= "Name" name=" name">
</div>
      <input type="text" placeholder= "Image" name=" img">
<div>
      <input type="text" placeholder= "Height" name=" height">
</div>
<div>
      <input type="text" placeholder= "Weight" name=" weight">
      <input type="submit" value="Submit New Pokemon">
</div>
  </form>`)
});

  // get json from specified file
  jsonfile.readFile(FILE, (err, obj) => {

    // check to make sure the file was properly read
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



app.get('/', (request, response) => {
  response.send("yay");
});

/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));
