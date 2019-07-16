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

// To get request.body
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
  jsonfile.readFile(file, (err, obj) => {
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


app.get('/pokemon/new', (request, response) => {

  let form = '';
  form = '<html>' +
    '<body>'+
    '<h1>Create New Pokemon</h1>'+
    '<form method="POST" action="/pokemon">'+
    '<p>ID:</p><input name="id"/>'+
    '<p>Num:</p><input name="num"/>'+
    '<p>Name:</p><input name="name"/>'+
    '<p>Image:</p><input name="img"/>'+
    '<p>Height:</p><input name="height"/>'+
    '<p>Weight:</p><input name="weight"/>'+
    '<br><br><input type="submit"/>'+
    '</form>'+
    '</body>'+
    '</html>';

  response.send(form);
});


app.post('/pokemon', (request,response) => {

    var newEntry = request.body;
    let found = false;

    // //save in data file
    jsonfile.readFile(file, (err, obj) => {
        if( err ){
            console.log("error reading file");
            console.log(err)
        }
        else{
            if(newEntry.id > obj["pokemon"].length){
                let pokemonToAdd = {
                      "id": parseInt(newEntry.id),
                      "num": newEntry.num,
                      "name": newEntry.name,
                      "img": newEntry.img,
                      "height": newEntry.height,
                      "weight": newEntry.weight
                }
                obj.pokemon.push(pokemonToAdd);

                jsonfile.writeFile(file, obj, (err) => {
                    if( err ){
                        console.log("error writing file");
                        console.log(err)
                        response.status(503).send("no!");
                    }else{
                        console.log("~~~~~~~yay");
                        console.log( "send response");
                        response.send("new");
                        console.log(obj["pokemon"].length)
                    }
                });
            }
            else {
                response.send("<h1>Pokemon already exists</h1>");
            }
        }
    });
});

/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));