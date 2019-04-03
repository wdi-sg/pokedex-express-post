console.log("about to require express");
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
console.log("done creating app");

// tell app to use the module
app.use(express.json());

app.use(express.urlencoded({
    extended: true
}));

/**
 * ===================================
 * Routes
 * ===================================
 */


app.get('/', (request, response) => {
  //response.send("Welcome to the online Pokdex!");
  const nameArray = [];

  jsonfile.readFile(FILE, (err, obj) => {
    for (i = 0; i < obj["pokemon"].length; i++) {
        // cannot print here cause can only get one response? so if for loop means it has to keep responding?
        nameArray.push(obj["pokemon"][i]["name"]);
    }

    const nameArrayJoin = nameArray.join(", ")

    //response.send(nameArray);
    response.send('<html><h1>Welcome to the online Pokdex!</h1><body>'+nameArrayJoin+'<br><form method="GET" action="/sortby=name"><input type="submit" value="Sort"></form></body></html>')
  })   // end of / readfile
});  // end of / request

    /// sortby using query

app.get("/sortby=name", (request, response) => {
    nameArray.sort();
    console.log(nameArray);
/*      console.log( "request QUERY", request.query);*/
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

app.get('/pokemon/new', (request, response) => {
    let respond = '<h1>New Pokemon</h1>' +
                  '<form method="POST" action="/newPokemon">' +
                  'ID: <input type="text" name="id"><br><br>' +
                  'Num: <input type="text" name="num"><br><br>' +
                  'Name: <input type="text" name="name"><br><br>' +
                  'Image: <input type="text" name="img"><br><br>' +
                  'Height: <input type="text" name="height"><br><br>' +
                  'Weight: <input type="text" name="weight"><br><br>' +
                  '<input type="submit" value="Submit"><br><br>' +
                  '</form>';

    response.send(respond)
})

app.post('/newPokemon', (request, response) => {
    // receiving the data
    console.log("this is the request body: ",request.body);

    response.send(request.body)
    jsonfile.readFile(FILE, (err, obj) => {
        const pokemonArray = obj["pokemon"];

        pokemonArray.push(request.body);


        // save request body
        jsonfile.writeFile(FILE, obj, (err) => {
            console.log(err);
            response.send(obj);
        });


    })

})

/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));