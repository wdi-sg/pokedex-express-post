const express = require('express');
const jsonfile = require('jsonfile');

const file = 'pokedex.json';

let data;

jsonfile.readFile(file, (err, obj) => {
    console.error(err);
    data = obj.pokemon;
});

/**
 * ===================================
 * Configurations and set up
 * ===================================
 */

const app = express();
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

const methodOverride = require('method-override');
app.use(methodOverride('_method'));

const reactEngine = require('express-react-views').createEngine();
app.engine('jsx', reactEngine);
app.set('views', __dirname + '/views');
app.set('view engine', 'jsx');

/**
 * ===================================
 * Routes
 * ===================================
 */

app.get("/pokemon/:id/edit", (request, response) => {
    let id = parseInt( request.params.id );

    if (id>data.length) {
        response.send(404, `No Pokemon found! </br>Please enter a number from 1 to ${data.length}`)
    } else {
        let pokemonRequested = {"pokemon": data.filter( pokemon => pokemon.id === id)[0]};
        response.render('edit',pokemonRequested);
    }
});


app.put('/pokemon/:id', (request, response)=>{

    let id = parseInt( request.params.id );
    let num;
    if (id.length < 2) {
        num = "00"+id;
    } else if (id.length < 3) {
        num = "0"+id;
    } else if (id.length < 4) {
        num = id;
    }

    let editedPokemonObj = request.body;
    const objectKeysArray = Object.keys(data[id]);

    data.forEach(obj => {
        if (obj[id] === id) {
            objectKeysArray.map(key => {
                obj[key] = editedPokemonObj[key];
            });
        }
    });

    response.send(data[id-1]);
});



app.get("/pokemon/:id/delete", (request, response) => {
    let id = parseInt( request.params.id );

    if (id>data.length) {
        response.send(404, `No Pokemon found! </br>Please enter a number from 1 to ${data.length}`)
    } else {
        let pokemonRequested = {"pokemon": data.filter( pokemon => pokemon.id === id)[0]};
        response.render('delete', pokemonRequested);
    }
});


app.delete('/pokemon/:id', (request, response)=>{

    let id = parseInt( request.params.id );
    let index = data.findIndex(pokemon => pokemon.id === id);
    data.splice(index,1);
    for (i=0; i<data.length; i++) {
        id = i+1;
        data[i].id = id;
        if (id < 10) {
                data[i].num = "00"+id;
            } else if (id < 100) {
                data[i].num = "0"+id;
            } else {
                data[i].num = `${id}`;
            }
    }
    response.send("Pokemon removed from Pokedex!");
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


app.get('/', (request, response) => {

    const pokemonArraySortedByName = data.map(pokemon => {
        return `${pokemon["name"]} ${pokemon["id"]}`;
    }).sort();

    pokemonObjSortedByName = {"pokemon" :pokemonArraySortedByName};
    console.log("237");
    // console.log(pokemonArraySortedByName);
  //  console.log(data);

    const pokemonArraySortedById = data.map(pokemon => {
        return `${pokemon["id"]} ${pokemon["name"]}`;
    }).sort((a,b) => parseInt(a)-(parseInt(b)));

    console.log("245");
    console.log(pokemonArraySortedById);

    pokemonObjSortedById = {"pokemon" :pokemonArraySortedById};

    // if (request.query === "" || request.query === "sortById") {
    // response.render('home', pokemonObjSortedById);
    // } else if (request.query === "sortByName") {
        response.render('home', pokemonObjSortedByName);
    // }
});


/*
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
const port = 3000;
app.listen(port, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));