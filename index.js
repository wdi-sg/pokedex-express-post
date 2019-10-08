//jshint esversion:6
const jsonfile = require('jsonfile');
const express = require('express');
const FILE = 'pokedex.json';
const newPokedex = 'newpokemon.json';
const app = express();
//react engine
const reactEngine = require('express-react-views').createEngine();
app.engine('jsx', reactEngine);

// this tells express where to look for the view files
app.set('views', __dirname + '/views');

// this line sets react to be the default view engine
app.set('view engine', 'jsx');

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

app.get('/pokemon/:id', (request, response) => {
  jsonfile.readFile(FILE, (err, obj) => {
    let inputId = parseInt( request.params.id );
    var pokemon;
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
//points user to form as homepage
app.get('/pokemon/new', (req, res) => {
  console.log("hi");
  res.render('form');

});

//adds new pokemon to newpokedex.json(wanted to test the function out so i created a sepereate file)
app.post('/pokemon',(request, response)=>{
    console.log("EVERYTHING in the form request", request.body );
    console.log(request.body);
  jsonfile.writeFile('newPokedex.json', request.body, (err) => {
    console.log(err);
    response.send(request.body);
  });
});

//function to capture form submisson

// app.get('/',(request,respond)=>{
//
//
// });
// ///ccess the photos in the array
// jsonfile.readFile(FILE, (err, obj) => {
// app.get('/photos', (req, res) => {
//   // loops through  obj
//   for( let i=0; i<obj.pokemon.length; i++ ){
//     let currentPokemon = obj.pokemon[i].img;
//     }
  // });
//
// });
///////////////////////////////////////////////////////////////////
// app.get('/photos', (req, res) => {
//   // loops through  obj
//   for( let i=0; i<obj.pokemon.length; i++ ){
//     let currentPokemon = obj.pokemon[i].img;
//     }
//
//   });
/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));
