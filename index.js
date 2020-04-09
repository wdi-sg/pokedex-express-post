/**
 * ===================================
 * Configurations and set up
 * ===================================
 */

console.log("Poke express node is working..")
console.log("------------------------------")
// Importing modules
const jsonfile = require('jsonfile');
const express = require('express');
const reactEngine = require('express-react-views').createEngine();

// Init express app
const app = express();
// tell your app to use the module
app.engine('jsx', reactEngine);
// this line set views to view directory
app.set('views', __dirname + '/views');

// this line sets react to be the default view engine
app.set('view engine', 'jsx');
//
app.use(express.json());
app.use(express.urlencoded({
extended: true
}));


let pokedexData = "./pokedex.json";
let newDex = "./newpokedex.json";
let formPage = "./views/form.jsx";
/**
 * ===================================
 * Routes
 * ===================================
 */




app.get('/pokemon/index', (request, response) => {
    jsonfile.readFile(pokedexData, (err, obj) => {
        console.log("reading from pokedex....")
        let pokemon = obj.pokemon

    })
response.send(obj);
    // response.send("welcome to the index page");
})


app.get('/pokemon/new', (request, response) => {
    jsonfile.readFile(pokedexData, (err,obj) => {
        console.log("reading from pokedex....")
        let pokedex = obj.pokemon
        response.render('form.jsx', pokedex);
    })
})

const uploadpokedex = (request, response) =>{
  //your inputs
   console.log(request.body);
  jsonfile.writeFile(pokedexData, request.body, (err) => {
    console.error(err)
    response.send(request.body);
  });
}



app.post(newDex, uploadpokedex);



app.get('/pokemon/:id', (request, response) => {

  // get json from specified file
  jsonfile.readFile(pokedexData, (err, obj) => {

    // check to make sure the file was properly read
    if( err ){

      console.log("error with json read file:",err);
      response.status(503).send("error reading file");
      return;
    }
    // obj is the object from the pokedex json file
    // extract input data from request
    let inputId = parseInt( request.params.id );
    console.log("parsing input into integer...")

    var pokemon;
    console.log("setting empty variable pokemon...")

    // find pokemon by id from the pokedex json file
    for( let i=0; i<obj.pokemon.length; i++ ){

      let currentPokemon = obj.pokemon[i];

      if( currentPokemon.id === inputId ){
        pokemon = currentPokemon;
        console.log("Checking for right pokemon...")
      }
    }

    if (pokemon === undefined) {

      // send 404 back
      response.status(404);
      response.send("not found");
    } else {
      console.log("The pokemon : [" + pokemon.name + "] has been found");
      response.send(pokemon);

    }
  });
});



app.get('/', (request, response) => {
  response.send("yay");
  console.log(pokedexData)
});

/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */


app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));