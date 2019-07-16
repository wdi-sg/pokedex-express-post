const express = require('express');
const jsonfile = require('jsonfile');
const file = 'pokedex.json';
const app = express();
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));


// app.get('/:id', (request, response) => {

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

app.get('/', (request, response) => {
  response.send(" Welcome to Pokedex, discovered a new Pokemon? Type '/pokemon/new'. ");
});

app.get('/:pokemon', (request, response) => {
    let pokemonName = request.params.pokemon;
    let pokemonFound = false;
    jsonfile.readFile(file, (err, obj) => {
    if (err) {
        console.log('err');
    } else{
        console.log(pokemonName);
        for ( let i = 0; i < obj.pokemon.length; i++) {
            if (obj.pokemon[i].name.toLowerCase() === pokemonName.toLowerCase()){

                let target = obj.pokemon[i];
                let pokeName = obj.pokemon[i].name;
                let pokeWeight = obj.pokemon[i].weight;
                let pokeHeight = obj.pokemon[i].height;

                response.send( pokeName + " height is " + pokeWeight + " weight is " + pokeHeight);
                pokemonFound = true;
                break;
            }
        }
        if (!pokemonFound) {
            response.send( "No Pokemon" );
        }
    }
    })
});

app.get('/pokemon/new', (request, response) => {

    let form = '';

    form =
    '<form method="POST" action="/pokemon">' +
    'ID:' +
    '<input type="text" name="id">' +
    'Pokemon Name:' +
    '<input type="text" name="name">' +
    'Pokemon Image Link:' +
    '<input type="text" name="link">' +
    'Height:' +
    '<input type="text" name="height">' +
    'Weight:' +
    '<input type="text" name="weight">' +
    '<input type="submit" value="Submit">' +
    '</form>';

response.send(form);
console.log("form sent!");
});


app.post('/pokemon', (request,response) => {

  var formInfo = request.body;
  console.log( formInfo );

  // save in data file
  jsonfile.readFile(file, (err, obj) => {
    if( err ){
      console.log("error reading file");
      console.log(err)
    }

    console.log("what i currently have");
    console.log(obj.pokemon);

    // save data
    obj.pokemon.push(formInfo);
    // obj[key] = value;

    jsonfile.writeFile(file, obj, (err) => {
      if( err ){
        console.log("error writing file");
        console.log(err)
        response.status(503).send("no!");
      }else{
        console.log("~~~~~~~yay");

        console.log( "send response");
        response.send("New Pokemon is updated in Pokedex!");
      }

    });
  });

  // console.log( "send response");
  // response.send("yes!");
});

app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));