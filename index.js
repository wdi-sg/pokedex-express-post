const express = require('express');
const jsonfile = require('jsonfile');
// Init express app
const app = express();
const FILE = 'pokedex.json';

/**
 * ===================================
 * Configurations and set up
 * ===================================
 */
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

/**
 * ===================================
 * Routes
 * ===================================
 */

//Expose a new endpoint that accepts POST requests to /pokemon, which parses the form data and saves the new pokemon data into pokedex.json


// read the json file
// store the obj into new  array
// push the user object request obj into new array
// write  file to the new array

 app.post('/pokemon', function(request,response) {
            //console.log(request.body);
            //let addedPokemon = request.body;

    jsonfile.readFile(FILE, (err,obj) => {
        // store the object into existingPokedex obj
        let existingPokedex = obj.pokemon;
        // create variable to store user input
        let addedPokemon = request.body
        //push user input into new obj
        existingPokedex.push(addedPokemon);
        //write file is to display the newly added pokemon
       jsonfile.writeFile(FILE,obj, (err) => {
            response.send(obj);
        });
    });

});

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

//Expose a new endpoint that intercepts GET requests to /pokemon/new, which responds with a HTML page with a form that has these fields: id, num, name, img, height, and weight

//Point the form to submit data to the (/pokemon) route using POST method

app.get('/pokemon/new', (request, response) => {

      let form = "<html>"+
    "<body>" +
    '<form action="/pokemon" method="POST">' + "Name" + '<input name="name" value = "" />' + "<p>" +
        "ID" +  '<input name="Id" value = "" />' + "<p>" +
        "Number" +   '<input name="number" value = "" />' +"<p>" + "Image" + '<input name="image" value = " " />' +"<p>" +
        "Height" + '<input name="height" value = "" />' +"<p>" +
        "Weight" + '<input name="weight" value = " " />' + '<input type="submit"/>';
    "</form>" +
    "</body>" +
    "</html>";

  response.send(form);
});

app.get('/', (request, response) => {


    jsonfile.readFile(FILE, (err,obj) => {
        let pokemonImg = obj.pokemon[0].img;
        console.log(pokemonImg);

        let displayPokemon = "<html>"+
                "<body>" +
                    "<a>" +pokemonImg+ "</a>" +
                "</body>" +
                "</html>";

                response.send(displayPokemon);
    });


});

/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));
