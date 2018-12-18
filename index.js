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

app.get("/", (request, response) => {
    response.send("Welcome to the online Pokedex!");
});

app.post('/pokemon', function(request, response) {
    // get json from specified file
    jsonfile.readFile(FILE, (err, obj) => {
        // obj is the object from the pokedex json file
        // extract input data from request
        let x = true;
        let newPoke = request.body;
        let inputId = request.body.id;

        // find pokemon by id from the pokedex json file
        for(let i = 0; i < obj.pokemon.length; i++){

          let currentPokemon = obj.pokemon[i];

          if(currentPokemon.id === inputId){
            x = false
          }
        }

        if(x === true){
            obj.pokemon.push(newPoke);
        }
        else if(x === false){
            // throw error if id already exist in pokedex
            response.status(404).send("Error in creating new pokemon");
        }
        else if(newPoke === undefined){
          // send 404 back
          response.status(404).send("Error");
        }
        else{
          response.send(newPoke);
        }

        jsonfile.writeFile(FILE, obj, (err) => {
                    console.log(err);
                });
    });
    // jsonfile.readFile(FILE, (err, obj) => {
    //     response.send(obj);
    // });
});

app.get('/pokemon/new', (request, response) => {
    response.send('<form method="POST" action="/pokemon">' +
    'Create a new Pokemon: ' + '<br><br>' +
    'Pokemon Id: ' +
    '<input type="text" name="id"> ' + '<br>' +
    'Pokemon Num: ' +
    '<input type="text" name="num"> ' + '<br>' +
    'Pokemon Name: ' +
    '<input type="text" name="name"> ' + '<br>' +
    'Pokemon Img: ' +
    '<input type="text" name="img"> ' + '<br>' +
    'Pokemon Height: ' +
    '<input type="text" name="height"> ' + '<br>' +
    'Pokemon Weight: ' +
    '<input type="text" name="weight"> ' + '<br><br>' +
    '<input type="submit" value="Submit"> ' +
    '</form>');
});


// app.post('/pokemon', function(request, response) {
//     // console.log(request.body.name);
//     // get json from specified file
//     jsonfile.readFile(FILE, (err, obj) => {
//         // obj is the object from the pokedex json file
//         // extract input data from request
//         let inputId = parseInt(request.body.name);

//         var pokemon;

//         // find pokemon by id from the pokedex json file
//         for(let i = 0; i < obj.pokemon.length; i++){

//           let currentPokemon = obj.pokemon[i];

//           if(currentPokemon.id === inputId){
//             pokemon = currentPokemon;
//           }
//         }

//         if(pokemon === undefined) {

//           // send 404 back
//           response.status(404).send("not found");
//         } else {

//           response.send(pokemon);
//         }
//       });
// });

/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));
