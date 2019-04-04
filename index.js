const express = require('express');
const jsonfile = require('jsonfile');

const file = 'pokedex.json';

let data;

jsonfile.readFile(file, (err, obj) => {
    console.log(err);
    data = obj.pokemon;
});

/**
 * ===================================
 * Configurations and set up
 * ===================================
 */

// Init express app
const app = express();

// tell your app to use the module

// for parsing application/json
app.use(express.json());

// for parsing application/x-www-form-urlencoded
app.use(express.urlencoded({
  extended: true
}));

const methodOverride = require('method-override');
app.use(methodOverride('_method'));

// this line below, sets a layout look to your express project
const reactEngine = require('express-react-views').createEngine();
app.engine('jsx', reactEngine);

// this tells express where to look for the view files
app.set('views', __dirname + '/views');

// this line sets react to be the default view engine
app.set('view engine', 'jsx');

/**
 * ===================================
 * Routes
 * ===================================
 */

app.get("/pokemon/:id/edit", (request, response) => {
    let id = parseInt( request.params.id );
    let pokemonRequested = {"pokemon": data.filter( pokemon => pokemon.id === id)[0]};
    response.render('home',pokemonRequested);
});


app.put('/pokemon/:id', (request, response)=>{

    let id = parseInt( request.params.id );
    let pokemonRequested = {"pokemon": data.filter( pokemon => pokemon.id === id)[0]};
    let editedPokemonObj = request.body;

    const objectKeysArray = Object.keys(pokemonRequested);

    objectKeysArray.forEach(item => {
        pokemonRequested.item = editedPokemonObj.item;
    });

    jsonfile.writeFile(file, pokemonRequested, (err) => {
        console.error(err);
        // response.send(request.body);
    });
    response.send("hello");
});



// app.get('/pokemon/new', (request, response) => {

//     jsonfile.readFile(file, (err, obj) => {
//         if (err) {
//             console.log('32: Error while reading!');
//             console.log(err);
//         } else {
//             let numberOfPokemonInPokedex = obj["pokemon"].length;
//             let idForNewPokemonId = numberOfPokemonInPokedex+1;
//             let numForNewPokemon = idForNewPokemonId;

//             let respond = '<h1>Add a new Pokemon to your Pokedex</h1>'+
//                 '<form method="POST" action="/pokemon">'+
//                 `Pokemon ID:<input type="number" name="id" value=${idForNewPokemonId} title="This field cannot be edited" readonly>`+
//                 `Number: <input type="text" name="num" value=${numForNewPokemon} title="This field cannot be edited" readonly>`+
//                 'Name: <input type="text" name="name" placeholder="Bulbasaur" title="This field is mandatory">'+
//                 'Image: <input type="text" name="img" placeholder="http://...png" title="This field is mandatory">'+
//                 'Weight: <input type="text" name="weight" placeholder="13.0 kg" title="This field is mandatory">'+
//                 'Height: <input type="text" name="height" placeholder="1.01 m" title="This field is mandatory">'+
//                 '<input type="submit" value="Submit">'+
//                 '</form>';

//     response.send(respond);

//         }
//     });
// });

// app.post('/pokemon',(request, response) => {
//     let newPokemonObject = request.body;
//     let newPokemonName = newPokemonObject["name"];

//     jsonfile.readFile(file, (err, obj) => {
//         if (err) {
//             console.log("62: Error while reading!");
//             console.log(err);
//         } else {
//             let duplicatePokemon = false;

//             for ( let i=0; i<obj.pokemon.length; i++ ) {
//                 let pokemonNameInPokedex = obj.pokemon[i]["name"];

//                 if (pokemonNameInPokedex.toLowerCase() === newPokemonName) {
//                     duplicatePokemon = true;
//                     response.send(404, "Pokemon already exists in Pokedex!<br>Please add a new pokemon!");
//                 }
//             }

//             if (duplicatePokemon===false) {
//                 obj.pokemon.push(newPokemonObject);

//                 jsonfile.writeFile(file, obj, (err) => {
//                     if (err) {
//                         console.log("83: Error while writing!");
//                         console.log(err);
//                     } else {
//                         response.send("Pokemon added to Pokedex!");
//                     }
//                 });
//             }
//         }
//     });
// });

// app.get('/?sortby=name', (request, response) => {

//     let respond = "yay";
//     console.log(respond);
//     let idArray = [];
//     let nameArray = [];

//     jsonfile.readFile(file, (err, obj) => {
//         if (err) {
//             console.log("151: Error while reading!");
//             console.log(err);
//         } else {

//             for ( i=0; i<obj.pokemon.length; i++ ) {
//                 let pokemonIdInPokedex = obj.pokemon[i]["id"];
//                 let pokemonNameInPokedex = obj.pokemon[i]["name"];
//                 idArray.push(pokemonIdInPokedex);
//                 nameArray.push(pokemonNameInPokedex);

//                 // listAllPokemonString += `${pokemonIdInPokedex}: ${pokemonNameInPokedex}<br>`;
//             }
//         }
//     });
//     response.send(respond);
// });


// app.get('/:id', (request, response) => {

//     // get json from specified file
//     jsonfile.readFile(file, (err, obj) => {
//         // obj is the object from the pokedex json file
//         // extract input data from request
//         let inputId = parseInt( request.params.id );
//         let pokemon;

//         // find pokemon by id from the pokedex json file
//         for ( let i=0; i<obj.pokemon.length; i++ ) {
//           let currentPokemon = obj.pokemon[i];

//           if( currentPokemon.id === inputId ){
//             pokemon = currentPokemon;
//           }
//         }

//         if (pokemon === undefined) {
//           // send 404 back
//           response.status(404);
//           response.send("not found");
//         } else {
//           response.send(pokemon);
//         }
//     });
// });


// app.get('/', (request, response) => {

//     let respond = `<form method="GET" action="sortby">
//                         <select name="select">
//                             <option value="name">
//                             <option value="id">
//                         <input type="submit" value="Sort by Name">
//                     </form>`;

//     let listAllPokemonString = "";

//     jsonfile.readFile(file, (err, obj) => {
//         if (err) {
//             console.log("127: Error while reading!");
//             console.log(err);
//         } else {

//             for ( i=0; i<obj.pokemon.length; i++ ) {
//                 let pokemonIdInPokedex = obj.pokemon[i]["id"];
//                 let pokemonNameInPokedex = obj.pokemon[i]["name"];

//                 listAllPokemonString += `${pokemonIdInPokedex}: ${pokemonNameInPokedex}<br>`;
//             }
//         }
//     response.send(`${respond}<br>${listAllPokemonString}`);
//     })
// });



/*
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
const port = 3000;
app.listen(port, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));