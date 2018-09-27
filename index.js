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

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));


/**
 * ===================================
 * Routes
 * ===================================
 */

app.get('/:id', (request, response) => {

  // get json from specified file
  jsonfile.readFile(FILE, (err, obj) => {
    // obj is the object from the pokedex json file
    // extract input data from request
    let inputId = parseInt( request.params.id );

    var pokemon;

    // find pokemon by id from the pokedex json file
    for( let i = 0; i < obj.pokemon.length; i++ ){

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

app.get('/pokemon/new', (request, response) => {

  let html = "<html>";
    html += "<body>";
    html += '<form method="POST" action="/pokemon">';
    html += "<h2>Create New Pokemon: </h2>";
    html += 'id: <input type = "text" name = "id"><br>';
    html += 'num: <input type = "text" name = "num"><br>';
    html += 'name: <input type = "text" name = "name"><br>';
    html += 'img: <input type = "text" name = "img"><br>';
    html += 'height: <input type = "text" name = "height"><br>';
    html += 'weight: <input type = "text" name = "weight"><br>';
    html += '<input type = "submit" value = "Submit">';
    html += "</form>";
    html += "</body>";
    html += "</html>";

  response.send(html);

});

app.post('/pokemon', function(request, response) {

  jsonfile.readFile('pokedex.json', (err, obj) => {

  		let newPokemon = {
              "id": request.body.id,
              "num": request.body.num,
              "name": request.body.name,
              "img": request.body.img,
              "height": request.body.height,
              "weight": request.body.weight,
              "candy": "",
              "candy_count": "",
              "egg": "",
              "avg_spawns": "",
              "spawn_time": ""
          }
          //add new pokemon
          obj.pokemon.push(newPokemon);

          let newobj = obj

          if(request.body.id <= obj.pokemon.length){
            response.send("This pokemon ID exists. Please try again.");
            // response.redirect('/pokemon/new');  
          }
  //debug code (output request body)
  // console.log(request.body);

  // save the request body
    jsonfile.writeFile('pokedex.json', newobj, (err) => {
      console.error(err);

    // now look inside your json file
      response.send("New Pokemon created!");
    });
  });
});

/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3002, () => console.log('~~~ Tuning in to the waves of port 3002 ~~~'));
