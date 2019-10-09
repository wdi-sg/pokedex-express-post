const FILE = 'pokedex.json';
const express = require('express');
const React = require('react');
// Init express app
const app = express();
const jsonfile = require('jsonfile');

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

// this line below, sets a layout look to your express project
const reactEngine = require('express-react-views').createEngine();

app.engine('jsx', reactEngine);

// this tells express where to look for the view files
app.set('views', __dirname + '/views');
// this line sets react to be the default view engine

// routes for
app.set('view engine', 'jsx');


// For adding new pokemon into JSON file
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

    let pokemon;
    // find pokemon by id from the pokedex json file
    for( let i=0; i<obj.pokemon.length; i++ ){
      let currentPokemon = obj.pokemon[i];
          if( currentPokemon.id === inputId ){
            pokemon = currentPokemon;

        //console.log(pokemon);
        //response.render('home', pokemon);
      }
    }
    if (pokemon === undefined) {

      // send 404 back
      response.status(404);
      response.send("not found");
    } else {
      //response.send(pokemon);
      console.log("End !")
    }
  });
});

//Expose a new endpoint that intercepts GET requests to /pokemon/new, which responds with a HTML page with a form that has these fields: id, num, name, img, height, and weight

//Point the form to submit data to the (/pokemon) route using POST method

app.get('/pokemon/new', (request, response) => {

      let form = "<html>"+
                    "<body>" +
                        '<form action="/pokemon" method="POST" method="">' + "Name" + '<input name="name" value = "" />' + "<p>" +
                    "ID" +  '<input name="Id" value = "" />' + "<p>" +
                    "Number" +   '<input name="number" value = "" />' +"<p>" + "Image" + '<input name="image" value = " " />' +"<p>" +
                    "Height" + '<input name="height" value = "" />' +"<p>" +
                    "Weight" + '<input name="weight" value = " " />' + '<input type="submit"/>'
    "</form>" +
    "</body>" +
    "</html>"

  response.send(form);
});


app.get('/pokemon/:id/edit', (request, response) => {

        //console.log(request.body.name);
        //let name = request.body.name;
        let id = parse(request.params.id);

        console.log(name);

        jsonfile.readFile(FILE, (err, obj) => {
    // obj is the object from the pokedex json file
    // extract input data from request
            let inputId = parseInt( request.params.id );
             let pokemon;
    // find pokemon by id from the pokedex json file
    for( let i=0; i<obj.pokemon.length; i++ ){

      let currentPokemon = obj.pokemon[i];

      if( currentPokemon.id === inputId ){
        pokemon = currentPokemon;
            jsonfile.readFile(FILE, function (err, obj) {

            if(err){
                console.log(err);
            }
            obj["pokemon"][id] = id;

            let searchedPokemonName = obj["pokemon"][id];

            jsonfile.writeFile(FILE, obj, (err) => {
                console.log(err);
                console.log("Done writing the file!");
            });
            response.render("home",searchedPokemonName);
            //response.send(form);
            console.log("Hello");
        });
    });
});






app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));