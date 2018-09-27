const express = require('express');
const jsonfile = require('jsonfile');

const FILE = 'pokedex.json';

const app = express();



// this line below, sets a layout look to your express project
 const reactEngine = require('express-react-views').createEngine();
 app.engine('jsx', reactEngine);

 // this tells express where to look for the view files
 app.set('views', __dirname + '/views');

 // this line sets react to be the default view engine
 app.set('view engine', 'jsx');

 const methodOverride = require('method-override')
 app.use(methodOverride('_method'));


/**
 * ===================================
 * Routes
 * ===================================
 */


app.use(express.json());
 app.use(express.urlencoded({
   extended: true
 }));





// //GET from html form
//  app.get('/pokemon/new', (request, response) => {
//    let html = `<html>`;
//    html += "<body>";
//    html += '<form method="POST" action="/pokemon">';

//    html += '<p>';
//    html += "Pokemon id:";
//    html += '<input type="number" name=id>'
//    html += '</p>';

//    html += '<p>';
//    html += "Pokemon Num:";
//    html += '<input type="number" name="num">'
//    html += '</p>';

//    html += '<p>';
//    html += "Pokemon Name:";
//    html += '<input type="text" name="Name">';
//    html += '</p>';

//    html += '<p>';
//    html += "Pokemon Height:";
//    html += '<input type="number" name="Height">'
//    html += '</p>';

//    html += "Pokemon Weight:";
//    html += '<input type="number" name="Weight">'
//    html += '<input type="submit" value="Submit">';
//    html += "</form>";
//    html += "</body>";
//    html += "</html>";
//  response.send(html);
//  });



  //POST to pokedex.json
 app.post('/pokemon', function(request, response){

     console.log("Wow this works!");
     console.log(request.body);
     response.send(request.body);

   jsonfile.readFile(FILE, (err, obj) => {

     let allPokemon = obj['pokemon']
     let newPokemon = request.body
     allPokemon.push(newPokemon)
   jsonfile.writeFile(FILE, obj, (err) => {
     console.log(err)
   })
   });
 })





app.get('/:id', (request, response) => {

  // get json from specified file
  jsonfile.readFile(FILE, (err, obj) => {
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
      response.send("not found: BUT WHY?");
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
app.listen(3002, () => console.log('~~~ Tuning in to the waves of port 3002 ~~~'));
