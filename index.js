console.log("starting express at pokedex express post part");

const jsonfile = require('jsonfile');
const express = require('express');
const app = express();
const FILE = 'pokedex.json';

app.use(express.json());

app.use(express.urlencoded({
  extended: true
}));

// Set up method-override for PUT and DELETE forms
const methodOverride = require('method-override')
app.use(methodOverride('_method'));

// this line below, sets a layout look to your express project
const reactEngine = require('express-react-views').createEngine();
app.engine('jsx', reactEngine);

// this tells express where to look for the view files
app.set('views', __dirname + '/views');

// this line sets react to be the default view engine
app.set('view engine', 'jsx');

///////////////////////////////////////////////////////////
//////////////////YOU CAN EDIT THE CODE BELOW /////////////
///////////////////////////////////////////////////////////

//Put function to edit the current of pokemon
app.put('/pokemon/:id', (request, response)=>{

  jsonfile.readFile('pokedex.json', (err, dataObj)=>{

    let pokeIndex = parseInt(request.params.id);

    dataObj.pokemon[pokeIndex] = request.body;

    jsonfile.writeFile('pokedex.json', dataObj, (err)=>{
      // response.send("WOW WORKS");
    });

  });

  response.send('Your pokemon has successfully been edited');
});

//Form to create new pokemon
app.get('/pokemon/new', (request, response) =>{
  response.render('form');
});

app.get('/pokemon/:id/', (request, response)=>{

  jsonfile.readFile('pokedex.json', (err, dataObj)=>{

    let pokeIndex = parseInt(request.params.id)-1;
    const pokemon = dataObj.pokemon[pokeIndex];

    const data = {
      index : pokeIndex,
      pokemonName : pokemon
    };

    response.render('pokePage', data)
  });
});

//Form to edit the current list of  pokemon
app.get('/pokemon/:id/edit', (request, response)=>{

  jsonfile.readFile('pokedex.json', (err, dataObj)=>{

    let pokeIndex = parseInt(request.params.id)-1;
    const pokemon = dataObj.pokemon[pokeIndex];

    const data = {
      index : pokeIndex,
      pokemonName : pokemon
    };

    response.render('editForm', data)
  });
});

//Form to edit the current list of  pokemon
app.get('/pokemon/:id/edit', (request, response)=>{

  jsonfile.readFile('pokedex.json', (err, dataObj)=>{

    let pokeIndex = parseInt(request.params.id)-1;
    const pokemon = dataObj.pokemon[pokeIndex];

    const data = {
      index : pokeIndex,
      pokemonName : pokemon
    };

    response.render('editForm', data)
  });
});

// //Posting function to push the new "Pokemon" to pokedex.json
// app.post('/pokemon/new/', (request,response) => {
//   console.log("posting inside form");
//   var newPokemon = request.body;
//   console.log( newPokemon );

//   // save in data file
//   jsonfile.readFile(FILE, (err, obj) => {
//     if( err ){
//       console.log("error reading file");
//       console.log(err)
//     }

//     // console.log("what i currently have");
//     // console.log(obj.pokemon);

//     // save data
//     obj.pokemon.push(newPokemon);
//     // obj[key] = value;

//     jsonfile.writeFile(FILE, obj, (err) => {
//       if( err ){
//         console.log("error writing file");
//         console.log(err)
//       }

//       console.log( "Send response");
//       response.send("Your Pokemon has been received");
//     });
//   });
// });

// Displays all the pokemon/ Button to sort all the pokemon.
// app.get('/pokemon', (request, response) => {

//     let form = '';
//     form = '<html>' +
//     '<body>'+
//     '<h1>Pokedex Sorter</h1>'+
//     '<form method="POST" action="new">'+
//     '<input type="submit"/>'+
//     '</form>'+
//     '</body>'+
//     '</html>';

//   // get data from the file
//     jsonfile.readFile(FILE, ( err, obj ) => {

//         var array = [];
//         var str = '<ul>';

//         for (let i = 0; i < obj['pokemon'].length; i++) {

//             array.push(obj['pokemon'][i].name);

//         }

//             array.forEach(function(poke) {

//                 str += '<li>'+ poke + '</li>';

//                 // console.log(array);
//                 // console.log(str);
//             });

//             str += '</ul>';
//             // console.log(array);

//         // console.log(str);
//       response.send("Here are all the pokemon" + str);
//     })
// });

/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));