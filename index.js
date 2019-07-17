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

var checkPokemon = function (request, response) {

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
};


 var makeForm = function (request, response) {

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
};


var submitData = function (request,response) {

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
                        response.send("New Pokemon added!");
                    }
                });
            }
            else {
                response.send("<h1>Pokemon already exists</h1>");
            }
        }
    });
};



var defaultHome = function (request, response){
    var fullNameList = [];

    jsonfile.readFile(file, (err, obj) => {
        if (err){
            console("ERRRORRR~~");
        }
        else {
            for (let i = 0; i < obj["pokemon"].length; i++) {
                fullNameList.push(`${obj["pokemon"][i]["name"]}`);
            }

            let displayList = ""
            if (request.query.sortby === "name") {
                var sort = fullNameList.sort();
                displayList = sort.join("<br>")
            }

            else if (request.query.sortby === undefined){
                var fullNameListJoin = fullNameList.join("<br>");
                displayList = fullNameListJoin;
            };

            let home = '';
            home = '<html>' +
            '<body>'+
            '<h1>Pokedex Home</h1>'+
            '<form method="GET">'+
            '<select name = "sortby">'+
            '<option value = "name">Sort by Name</option>'+
            '<option value = "weight">Sort by Weight</option>'+
            '<option value = "height">Sort by Height</option>'+
            '</select>'+
            '<button type="submit"/>Sort</button>'+
            '</form>'+
            `<p>${displayList}</p>`+
            '</body>'+
            '</html>';

            response.send(home);
        }
    });
}

app.get('/', defaultHome);
app.post('/pokemon', submitData);
app.get('/pokemon/new', makeForm);
app.get('/:id', checkPokemon);


/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));