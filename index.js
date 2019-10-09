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



//================================================
//================================================
//================================================
// this line below, sets a layout look to your express project
const reactEngine = require('express-react-views').createEngine();
app.engine('jsx', reactEngine);

// this tells express where to look for the view files
app.set('views', __dirname + '/views');

// this line sets react to be the default view engine
app.set('view engine', 'jsx');
//================================================
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

  //debug code (output request body)
  console.log(request.body);


  jsonfile.readFile(FILE, (err, obj) => {
    obj.pokemon.push(request.body);
    let inputId = parseInt( request.body.id );
    var pokemon;
    // find pokemon by id from the pokedex json file
    for( let i=0; i<obj.pokemon.length; i++ ){
      let currentPokemon = obj.pokemon[i];
      currentPokemon.id = parseInt(currentPokemon.id);
      if( currentPokemon.id === inputId ){
        pokemon = currentPokemon;
        response.render("newPoke", pokemon);
      }
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
        console.log(obj.pokemon);
        response.send(obj.pokemon);
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











//===============Code ends here===========================
//==========================================================






app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));