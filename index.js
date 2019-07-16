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

app.post('/pokemon', (request,response) => {

  console.log("YAY WOW");
  let pokemonNew = request.body;
  console.log("new pokemon");
  console.log( pokemonNew );

  // save in data file
  jsonfile.readFile(FILE, (err, obj) => {
    if( err ){
      console.log("error reading file");
      console.log(err)
    }

    // console.log("what i currently have");
    // console.log(obj.pokemon);


    // save data
    obj.pokemon.push(pokemonNew);
    // obj[key] = value;

    jsonfile.writeFile(FILE, obj, (err) => {
      if( err ){
        console.log("error writing file");
        console.log(err)
        response.status(503).send("no!");
      } else {
        console.log("~~~~~~~yay");
        //sends response after saving it in the file. for user to know if it was saved in the file.
        console.log( "send response");
        response.send("yes! New pokemon added!");
      }

    });
  });
});

app.get('/pokemon/new', (request, response) => {
    // render a template form here
    //response.send("hello world");
    console.log("getting form");
    let form = '';
    form = '<html>' + '<body>' +
    '<form method="POST" action="/pokemon">' +
    '<p>Pokemon Id</p>' +
    '<input type="number" name="id">' +
    '<p>Pokemon number</p>' +
    '<input type="number" name="num">' +
    '<p>Pokemon name</p>' +
    '<input type="text" name="name">' +
    '<p>Pokemon image</p>' +
    '<input type="number" name="img">' +
    '<p>Pokemon height</p>' +
    '<input type="number" name="height">' +
    '<p>Pokemon weight</p>' +
    '<input type="number " name="weight">' +
    '<input type="submit" value="Submit">' +
    '</form>' +
    '</body>' + '</html>';
    response.send(form);
});

/*app.get('/?sortby=name', (request, response) => {
    console.log("sorting names");
    jsonfile.readFile(FILE, (err, obj) => {
    if( err ){
      console.log("error reading file");
      console.log(err)
    } else {
        let pokemonArr = [];
        var sortedPokemon = [];
        var sortedPokemonList = '<ul>';
        for( let i=0; i<obj.pokemon.length; i++ ){
            pokemonArr.push(obj.pokemon[i].name);
        }
        sortedPokemon = pokemonArr.sort();
        console.log(sortedPokemon);
        pokemonArr.forEach(function(poke) {
            sortedPokemonList += '<li>'+ poke + '</li>'
        });
        sortedPokemonList += '</ul>';
        response.send(sortedPokemonList);
        }
    })
});*/

app.get('/', (request, response) => {
  //response.send("yay");
    console.log("getting form");
    let form = '';
    form = '<form method = "get" action = "/" >' +
    '<input type="submit" name="sortby" value="name">' +
    '</form>';

    if (request.query.sortby === 'name'){
        console.log("sorting names");
    jsonfile.readFile(FILE, (err, obj) => {
        if( err ){
            console.log("error reading file");
            console.log(err)
        } else {
            let pokemonArr = [];
            var sortedPokemon = [];
            var sortedPokemonList = '<ul>';
            for( let i=0; i<obj.pokemon.length; i++ ){
                pokemonArr.push(obj.pokemon[i].name);
            }
            sortedPokemon = pokemonArr.sort();
            console.log(sortedPokemon);
            pokemonArr.forEach(function(poke) {
                sortedPokemonList += '<li>'+ poke + '</li>'
            });
            sortedPokemonList += '</ul>';
            response.send(sortedPokemonList);
        }
    })
    } else {



  jsonfile.readFile(FILE, (err, obj) => {
    if( err ){
      console.log("error reading file");
      console.log(err)
    } else {
        let pokemonArr = [];
        var pokemonList = '<ul>';
        for( let i=0; i<obj.pokemon.length; i++ ){
            pokemonArr.push(obj.pokemon[i].name);
        }
        console.log(pokemonArr);
        pokemonArr.forEach(function(poke) {
            pokemonList += '<li>'+ poke + '</li>';
        });
        pokemonList += '</ul>';
        response.send(form + pokemonList);
    }
  })
  }
});



/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));