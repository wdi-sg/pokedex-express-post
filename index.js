const express = require('express');
const jsonfile = require('jsonfile');
const file = 'pokedex.json';
const json = require('./pokedex.json');
console.log(json.pokemon[0]);
const app = express();

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

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

app.get('/', (request, response) => {
    response.send('<h1>Pokemon</h1>'+
                  '<form method="post" action="/pokemon/new">'+
                  'Create New Pokemon'+
                  '<input type="submit" value="Submit">'+
                  '</form>' +
                  '<h2> Search Pokemon</h2>'+
                  '<form method="post" action="/pokemon/search">'+
                  'ID:<input type="text" name="id">' +
                  '<input type="submit" value="Submit">' +
                  '<br>' +
                  'Name:<input type="text" name="name">' +
                  '<input type="submit" value="Submit">' +
                  '</form>'
                  );

    // response.send(json.pokemon);
});

app.post('/pokemon/search', (request, response) => {
      // console.log(request.body);
      // response.send(request.body.id);
  let pokemonId = request.body.id;
  pokemonId = parseInt(pokemonId - 1);
  let pokemonName = request.body.name;
  for (i = 0; i < json.pokemon.length; i++) {
    if(json.pokemon[i].name === pokemonName) {
        response.send(json.pokemon[i])
    } else {
        response.send(json.pokemon[pokemonId]);
    }
  }
// response.send(json.pokemon[pokemonId]);
  // console.log(pokemonId);

    // response.send(json.pokemon);
});



app.post('/pokemon/new', function(req, response) {
  //debug code (output request body)
      response.send('<h1>Pokemon</h1>'+
                  '<form method="post" action="/pokemon/new/creation">'+
                  'ID:<input type="text" name="id">'+
                  'Num:<input type="text" name="num">'+
                  'Name:<input type="text" name="name">'+
                  'IMG:<input type="text" name="img">'+
                  'Height:<input type="text" name="height">'+
                  'Weight:<input type="text" name="weight">'+
                  '<input type="submit" value="Submit">'+
                  '</form>');

});

app.post('/pokemon/new/creation', function(request, response) {
  //debug code (output request body)
    // let pokeStats = JSON.stringify(request.body);
    //   response.send("HELLO" + '<br>' + pokeStats);
    //   console.log(json.pokemon[150]);
    let pokeStats = request.body;
    response.send(pokeStats);
    json.pokemon.push(pokeStats);
    console.log(json.pokemon[json.pokemon.length-1]);


  jsonfile.writeFile(file, json, (err) => {
    console.log(err)
  });

      // json.pokemon

});

// app.get('/get', (request, response) => {
//   // render a template form here
//   response.send('<h1>SAMBAL KANG KONG</h1>'+
//                   '<form method="GET" action="/plants">'+
//                   'PLANT Name:<input type="text" name="animalname">'+
//                   '<input type="text" name="weight">'+
//                   '<input type="submit" value="Submit">'+
//                   '</form>');
// });


/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));


console.log(json.pokemon[152])

  //     console.log(req.body.id);
  // let pokemonId = req.body.id;
  // pokemonId = parseInt(pokemonId - 1);
  // res.send(json.pokemon[pokemonId]);
  // console.log(pokemonId);