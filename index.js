const express = require('express');
const jsonfile = require('jsonfile');

const FILE = 'pokedex.json';
// Init express app
const app = express();

//=============================================
//======tell your app to use the module========
//=============================================
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
//=============================================
//=============================================



//=============================================
// Set up method-override for PUT and DELETE forms
//=============================================
const methodOverride = require('method-override')
app.use(methodOverride('_method'));
//=============================================
//=============================================



//================================================
//this line below, sets a layout look to your express project
//================================================
const reactEngine = require('express-react-views').createEngine();
app.engine('jsx', reactEngine);

// this tells express where to look for the view files
app.set('views', __dirname + '/views');

// this line sets react to be the default view engine
app.set('view engine', 'jsx');
//================================================
//================================================






//===============Code starts here===========================
//==========================================================

//////////////////////////////////////////////////////
app.get('/', (request, response) => {
    response.render("intro");
  // response.send("<h1>Welcome to Online Pokedex!</h1>");
});
//////////////////////////////////////////////////////


//////////////////////////////////////////////////////
app.get('/pokemon/new', (request, response) => {
  response.render("forms")
});
//////////////////////////////////////////////////////


//////////////////////////////////////////////////////
app.post('/pokemon', (request, response) => {

  let createdPoke = request.body;
  let currentPokemon;
  let oldID;
  createdPoke.id = parseInt(createdPoke.id);
  let newNum = parseInt(createdPoke.num);


  jsonfile.readFile(FILE, (err, obj) => {

    for( let i=0; i<obj.pokemon.length; i++ ){
        currentPokemon = obj.pokemon[i];
        oldID = parseInt(currentPokemon.id);
        console.log("new id is: " + createdPoke.id );
        console.log("old id is: " + oldID );
        if(oldID === createdPoke.id){
            response.render("alreadyGotPoke");
        }
    }

if( createdPoke.id === newNum ){
    obj.pokemon.push(request.body);
    response.render("newPoke", createdPoke);
} else{
    response.render("notSameNum");
}


    jsonfile.writeFile(FILE, obj, {spaces: 2}, (err) => {
                console.error(err)
          });
  });


});
//////////////////////////////////////////////////////


//////////////////////////////////////////////////////
app.get('/pokemon/', (request, response) => {

  //debug code (output request body)
    jsonfile.readFile(FILE, (err, obj) =>{
        console.log(obj);
        // response.send(obj.pokemon);
        response.render("allPoke", obj);
    });


});
//////////////////////////////////////////////////////


//////////////////////////////////////////////////////
app.get('/pokemon/:id', (request, response) => {

  // get json from specified file
  jsonfile.readFile(FILE, (err, obj) => {
    // obj is the object from the pokedex json file
    // extract input data from request
    let inputId = parseInt( request.params.id );
    console.log(inputId);

    var pokemon;
    var foundPoke = false;

    // find pokemon by id from the pokedex json file
    for( let i=0; i<obj.pokemon.length; i++ ){
      let currentPokemon = obj.pokemon[i];
      currentPokemon.id = parseInt(currentPokemon.id);

      if( currentPokemon.id === inputId ){
        foundPoke = true;
        pokemon = currentPokemon;
      }
    }

    if (foundPoke === false) {
      // send 404 back
      response.status(404);
      response.render("noPoke");
    } else {
      // response.send(pokemon);
      response.render("eachPokemon", pokemon)
    }
  });
});
//////////////////////////////////////////////////////


//////////////////////////////////////////////////////
app.get('/pokemon/:id/edit', (request, response) => {

var foundPoke = false;


  // get json from specified file
  jsonfile.readFile(FILE, (err, obj) => {

    let inputId = parseInt( request.params.id );
    let editingPokemon = obj.pokemon[inputId-1];

    for( let i=0; i<obj.pokemon.length; i++ ){
      let currentPokemon = obj.pokemon[i];
      currentPokemon.id = parseInt(currentPokemon.id);

        if( currentPokemon.id === inputId ){
            foundPoke = true;
            pokemon = currentPokemon;
          }
    }

    if (foundPoke === false) {
      // send 404 back
      response.status(404);
      response.render("noPoke");
    } else {
      // response.send(pokemon);
      response.render("editPokemon", editingPokemon)
    }

  });


});
//////////////////////////////////////////////////////



//////////////////////////////////////////////////////
app.put('/pokemon/:id', (request, response) => {

    let inputId = parseInt( request.params.id );
    let editedPokemon = request.body;


  // get json from specified file
  jsonfile.readFile(FILE, (err, obj) => {
    let oldPoke = obj.pokemon[inputId-1];
    oldPoke.name = editedPokemon.name;
    oldPoke.img = editedPokemon.img;
    oldPoke.weight = editedPokemon.weight;
    oldPoke.height = editedPokemon.height;

        jsonfile.writeFile(FILE, obj, {spaces: 2}, (err) => {
          console.log(err)
          // response.send("YAY EDITED");
          response.render("editedPokemon", oldPoke)
        });
  });


});
//////////////////////////////////////////////////////



//////////////////////////////////////////////////////
app.get('/pokemon/:id/delete', (request, response) => {

let foundPoke = false;
let pokemon;


  // get json from specified file
  jsonfile.readFile(FILE, (err, obj) => {

    let inputId = parseInt( request.params.id );

    for( let i=0; i<obj.pokemon.length; i++ ){
      let currentPokemon = obj.pokemon[i];
      currentPokemon.id = parseInt(currentPokemon.id);

        if( currentPokemon.id === inputId ){
            foundPoke = true;
            pokemon = currentPokemon;
          }
    }

    if (foundPoke === false) {
      // send 404 back
      response.status(404);
      response.render("noPoke");
    } else {
      // response.send(pokemon);
      response.render("deletePoke", pokemon)
    }

  });


});
//////////////////////////////////////////////////////



//////////////////////////////////////////////////////
app.delete('/pokemon/:id', (request, response) => {

    let inputId = parseInt( request.params.id );
    let editedPokemon = request.body;
    let pokemonID = inputId - 1;

  // get json from specified file
  jsonfile.readFile(FILE, (err, obj) => {
    let oldPoke = obj.pokemon[pokemonID];

    for( let i=0; i<obj.pokemon.length; i++ ){
      let currentPokemon = obj.pokemon[i];
      currentPokemon.id = parseInt(currentPokemon.id);

        if( currentPokemon.id === inputId ){
            obj.pokemon.splice(i, 1);
            pokemon = currentPokemon;
          }
    }

        jsonfile.writeFile(FILE, obj, {spaces: 2}, (err) => {
          console.log(err)
          // response.send("YAY EDITED");
          response.render("deletedPokemon", oldPoke)
        });
  });


});
//////////////////////////////////////////////////////




//===============Code ends here===========================
//==========================================================






app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));