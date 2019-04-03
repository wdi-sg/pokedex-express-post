const pokemon = require('./pokedex.js')
const express = require('express');
const app = express();
const jsonfile = require('jsonfile');

// const FILE = 'pokedex.json';

/**
 * ===================================
 * Configurations and set up
 * ===================================
 */

// this line below, sets a layout look to your express project
const reactEngine = require('express-react-views').createEngine();
app.engine('jsx', reactEngine);

// this tells express where to look for the view files
app.set('views', __dirname + '/views');

// this line sets handlebars to be the default view engine
app.set('view engine', 'jsx');


// tell your app to use the module
// app.use(express.json());
// app.use(express.urlencoded({
//   extended: true
// }));



app.get('/pokemon/new', function(request, response) {
    let  newForm =`<h1>Input new pokemon</h1>
                  <form method="POST" action="/pokemon">
                  <label for="ID">ID</label>
                  <input type="number" name="ID" step="1">
                  <br>
                  <br>
                  <label for="Num">Num</label>
                  <input type="number" name="Num" step="1">
                  <br>
                  <br>
                  <label for="Name">Name</label>
                  <input type="text" name="name">
                  <br>
                  <br>
                  <label for="Img">Image</label>
                  <input type="text" name="img">
                  <br>
                  <br>
                  <label for="Height">Height</label>
                  <input type="text" name="height">
                  <br>
                  <br>
                  <label for="Weight">Weight</label>
                  <input type="text" name="weight">
                  <br>
                  <br>
                  <input type="submit" value="Submit">
                  </form>`;

    console.log(request.body);

  jsonfile.writeFile('data.json', request.body, (err) => {
    console.error(err)

    // console.log(request.body);
    response.send(newForm);
  });
});

// /**
//  * ===================================
//  * Routes
//  * ===================================
//  */

// app.post('/pokemon/new', function(request, response) {

//   //debug code (output request body)
//   console.log(request.body);


//   // save the request body
//   jsonfile.writeFile('data.json', request.body, (err) => {
//     console.error(err)

//     // now look inside your json file
//     response.send(request.body);
//   });
// });



app.get('/pokemon/:id', (req,res) => {
    console.log(req.params);
    let pokemonId = parseInt( req.params.id );
    let pokemon;
    for (let pokemonBlock of pokemon) {
        if (pokemonBlock.id === pokemonId) {
            pokemon = pokemonBlock
        }
    }
    // let user = users[userId-1];
    console.log(pokemon);
    res.render('SpecificPokemon', {name: pokemon.name, weight: pokemon.weight});
});

app.get('/pokemon', (req,res) => {
    let array = {"data": pokemon}
    res.render('pokemon', array);
});

app.get('/firstpokemon', (req,res) => {

    let firstPokemon = Pokemon[0];
    console.log(firstPokemon);
    res.render('SpecificPokemon', {name: firstPokemon.name, Weight: firstPokemon.Weight});
});

// app.get('pokemon/:id', (request, response) => {

//   // get json from specified file
//   jsonfile.readFile(FILE, (err, obj) => {
//     // obj is the object from the pokedex json file
//     // extract input data from request
//     let inputId = parseInt( request.params.id );

//     var pokemon;

//     // find pokemon by id from the pokedex json file
//     for( let i=0; i<obj.pokemon.length; i++ ){

//       let currentPokemon = obj.pokemon[i];

//       if( currentPokemon.id === inputId ){
//         pokemon = currentPokemon;
//       }
//     }

//     if (pokemon === undefined) {

//       // send 404 back
//       response.status(404);
//       response.send("not found");
//     } else {

//       response.send(pokemon);
//     }
//   });
// });

// app.get('/pokemon/:id/edit', )

// app.get('/', (request, response) => {
//   response.send("yay");
// });

/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000);