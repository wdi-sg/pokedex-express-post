const express = require('express');
const jsonfile = require('jsonfile');

const file = 'pokedex.json';

/**
 * ===================================
 * Configurations and set up
 * ===================================
 */

// Init express app
const app = express();

/**
 * ===================================
 * Routes
 * ===================================
 */
// this line below, sets a layout look to your express project
const reactEngine = require('express-react-views').createEngine();
app.engine('jsx', reactEngine);

// this tells express where to look for the view files
app.set('views', __dirname + '/views');

// this line sets react to be the default view engine
app.set('view engine', 'jsx');


// tell your app to use the module
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

const methodOverride = require('method-override');
app.use(methodOverride('_method'));

app.get('/pokemon/:id/edit', (request, response) => {
  // get json from specified file
  jsonfile.readFile(file, (err, obj) => {

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
      let data = {
        "id": currentPokemon.id,
        "num": currentPokemon.num,
        "name": currentPokemon.name,
        "img": currentPokemon.img,
        "height": currentPokemon.height,
        "weight": currentPokemon.weight,
      }

      if( currentPokemon.id === inputId ){
        pokemon = currentPokemon;
        response.render('Edit', data);
      }
    }

    if (pokemon === undefined) {
      // send 404 back
      response.status(404);
      response.send("not found");
    } else {

      //response.send(pokemon);
    }
  });
});

app.put("/pokemon_edit/:id", (request, response) => {
 //read the file in and write out to it
 let data;
 let id = parseInt(request.params.id)-1;
 jsonfile.readFile(file, (err,obj)=>{
  obj.pokemon[id].id= request.body.id;
  obj.pokemon[id].name = request.body.name;
  obj.pokemon[id].img = request.body.img;
  obj.pokemon[id].height = request.body.height;
  obj.pokemon[id].weight = request.body.weight;
  console.log(obj.pokemon[id])

  jsonfile.writeFile(file, obj, function(err) {
      if (err) return console.log(err);      
      response.send("Successful!");
    });
 });

});

app.delete("/pokemon/:id/delete", (request, response) => {
  //read the file in and write out to it
  let data;
  let id = parseInt(request.params.id)-1;
  jsonfile.readFile(file, (err,obj)=>{
    delete obj.pokemon[i];
    for (let i = 0; i < obj.pokemon.length; i++) {
    if (obj.pokemon[i] == null) obj.pokemon.splice(i, 1);
    }
    jsonfile.writeFile(FILE, obj, err => {
    if (err) console.log(err);
    response.send("Deleted!");
    });
 
   jsonfile.writeFile(file, obj, function(err) {
       if (err) return console.log(err);      
       response.send("Successful!");
     });
  });
 
 });

app.get('/pokemon/:id', (request, response) => {

  // get json from specified file
  jsonfile.readFile(file, (err, obj) => {

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
      let data = {
        "id": currentPokemon.id,
        "num": currentPokemon.num,
        "name": currentPokemon.name,
        "img": currentPokemon.img,
        "height": currentPokemon.height,
        "weight": currentPokemon.weight,
      }

      if( currentPokemon.id === inputId ){
        pokemon = currentPokemon;
        response.render('display', data);
      }
    }

    if (pokemon === undefined) {
      // send 404 back
      response.status(404);
      response.send("not found");
    } else {
      //response.send(pokemon);
    }
  });
});




/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */

app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));
