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
const reactEngine = require('express-react-views').createEngine();
app.engine('jsx', reactEngine);
app.set('views', __dirname + '/views');
app.set('view engine', 'jsx');
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

/**
 * ===================================
 * Routes
 * ===================================
 */
//THE INPUT FORM PAGE.
app.get(`/pokemon/new`, (req,res) => {
  res.render('form')
} )

//POSTING TO THE POKEMON ROUTE
app.post(`/pokemon`, (req,res) => {

  const newObj = req.body
  const inputKeys = Object.keys(newObj)

  for (let i=0; i < inputKeys.length; i++) {
    let currentKey = inputKeys[i]
    if (newObj[currentKey]==="") {
      const data = {
        error: `There was an error with your ${currentKey} input.`
      }
      return res.render('form', data)

    }
  }

  jsonfile.readFile(FILE, (err, obj) => {
    const array = obj.pokemon
    if( err ){
      console.log("error with json read file:",err);
      response.status(503).send("error reading filee");
      return;
    }
    array.push(req.body);
    jsonfile.writeFile( FILE, obj, (err) => {
      if (err) {
        console.log(`error. ${err}`);
      }
      res.send(array[array.length-1])
    })
  })
} )

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
