const express = require('express');
const jsonfile = require('jsonfile');

const FILE = 'pokedex.json';

var style = "<style> body{text-align:center;background-color:yellow;font-family: Arial, Helvetica, sans-serif;font-size:1vw;} </style>"

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

/**
 * ===================================
 * Routes
 * ===================================
 */

//GET from html form
app.get('/pokemon/new', (request, response) => {
  let html = `<html>${style}`;
  html += "<body>";
  html += '<form method="POST" action="/pokemon">';
  html += "Pokemon id:";
  html += '<input type="number" name="id">'
  html += "Pokemon Num:";
  html += '<input type="number" name="num">'
  html += "Pokemon Name:";
  html += '<input type="text" name="Name">';
  html += "Pokemon Height:";
  html += '<input type="number" name="Height">'
  html += "Pokemon Weight:";
  html += '<input type="number" name="Weight">'
  html += '<input type="submit" value="Submit">';
  html += "</form>";
  html += "</body>";
  html += "</html>";
response.send(html);
});

 //POST to pokedex.json
app.post('/pokemon', function(request, response){

    console.log("working");
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

//ID route
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
      response.send("not found");
    } else {

      response.send(pokemon);
    }
  });
});

//home route
app.get('*',function(request,response) {
    jsonfile.readFile(FILE ,function(err,obj){

        let list = ''
        for(var i = 0 ; i<obj["pokemon"].length ; i++){
            list += `<li>${obj['pokemon'][i]["name"]}</li>`
        }
        let html = `<html>${style}<body><h1>Pokemon List</h1>${list}</body></html>`
        response.send(html)
    })
})

/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));
