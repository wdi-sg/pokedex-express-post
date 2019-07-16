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

var getPokemonByIdRequest = function(request,response){

  // get json from specified file
  jsonfile.readFile(FILE, (err, data) => {
    // obj is the object from the pokedex json file
    // extract input data from request
    let inputId = parseInt( request.params.id );

    var pokemon;

    // find pokemon by id from the pokedex json file
    for( let i=0; i<data.pokemon.length; i++ ){

      let currentPokemon = data.pokemon[i];

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

}

var addNewPokemonRequest = function(request,response){
  var newPokemon = request.body;
  // save in data file
  jsonfile.readFile(FILE, (err, data) => {
    if( err ){
      console.log("error reading file");
      console.log(err);
    }

    console.log(data.pokemon);

    // save data
    data.pokemon.push(newPokemon);
    // obj[key] = value;

    jsonfile.writeFile(FILE, data, (err) => {
      if( err ){
        console.log("error writing file");
        console.log(err)
      }else{
        response.send(data);
      }

    });

  });

}

var getNewPokemonRequest = function(request,response){
  jsonfile.readFile(FILE, function(err,data){
    //get the next index
    var lastIndex = data.pokemon.length + 1 ;

    var form = '<form method="POST" action="/pokemon">' +
                'Add new Pokemon:<br>' +
                '<input type="text" name="id" placeholder="id" value="' + lastIndex + '"><br>' +
                '<input type="text" name="num" placeholder="num" value="' + lastIndex + '"><br>' +
                '<input type="text" name="name" placeholder="name"><br>' +
                '<input type="text" name="img" placeholder="img"><br>' +
                '<input type="text" name="height" placeholder="height"><br>' +
                '<input type="text" name="weight" placeholder="weight"><br>' +
                '<input type="submit" value="Submit">' +
                '</form>';
    response.send(form);
  });
}

var getAllPokemonRequest = function(request,response){

  jsonfile.readFile(FILE, function(err,data){

    if(err){
      console.log("error reading file" + err);
    }

    //http://localhost:4000/?sortby=name
    var sortType = request.query.sortby;
    console.log(sortType);

    var pokemonDisplay = "";

    if (sortType === "name"){

      var array = data.pokemon;

      array.sort(function(a, b){
      var keyA = a.name,
          keyB = b.name;
      // Compare the 2 dates
      if(keyA < keyB) return -1;
      if(keyA > keyB) return 1;
      return 0;
      });

      array.forEach( function(item){
        var pokemonString = `<div class="pokemon">${item.id} - ${item.name}</div> `;
        pokemonDisplay = pokemonDisplay.concat(pokemonString);
      })


    } else if( sortType === "height"){

      var array = data.pokemon;

      array.sort(function(a, b){
      var keyA = a.height,
          keyB = b.height;
      // Compare the 2 dates
      if(keyA < keyB) return -1;
      if(keyA > keyB) return 1;
      return 0;
      });

      array.forEach( function(item){
        var pokemonString = `<div class="pokemon">${item.height} - ${item.name}</div> `;
        pokemonDisplay = pokemonDisplay.concat(pokemonString);
      })

    } else if( sortType === "weight"){

      var array = data.pokemon;

      array.sort(function(a, b){
      var keyA = a.weight,
          keyB = b.weight;
      // Compare the 2 dates
      if(keyA < keyB) return -1;
      if(keyA > keyB) return 1;
      return 0;
      });

      array.forEach( function(item){
        var pokemonString = `<div class="pokemon">${item.weight} - ${item.name}</div> `;
        pokemonDisplay = pokemonDisplay.concat(pokemonString);
      })

    } else {
      //default
      data.pokemon.forEach( function(item){
        var pokemonString = `<div class="pokemon">${item.id} - ${item.name}</div> `;
        pokemonDisplay = pokemonDisplay.concat(pokemonString);
      })
    }

    //
    var sortBySelect =  '<span>Sort By:</span>' +
                        '<select id="sortby" name="sortby" onchange="this.form.submit()">' +
                        // '<select id="sortby" name="sortby">' +
                        '<option value="">ID</option>' +
                        '<option value="name">Name</option>' +
                        '<option value="weight">Weight</option>' +
                        '<option value="height">Height</option>' +
                        '</select>' ;

    // var sortBySelectElement = document.getElementById('sortby');
    //
    // sortBySelectElement.addEventListener('change', getValuefromSelect);
    //
    // var getValuefromSelect = function(){
    //   console.log(sortBySelectElement.value);
    // }

    var idButton = '<input type="submit" name="sortby" value="">';
    var nameButton = '<input type="submit" name="sortby" value="name">';
    var heightButton = '<input type="submit" name="sortby" value="height">';
    var weightButton = '<input type="submit" name="sortby" value="weight">';
    // var submitButton = '<input type="submit" value="Submit">';


    var form = '<form method="get" action="/">'
               + sortBySelect
               // + idButton
               // + nameButton
               // + heightButton
               // + weightButton
               // + submitButton
               + '</form>';


    response.send(form + pokemonDisplay);

  });

}


/**
 * ===================================
 * Routes
 * ===================================
 */

app.get('/', getAllPokemonRequest);
app.get('/:id', getPokemonByIdRequest);
app.get('/pokemon/new', getNewPokemonRequest);
app.post('/pokemon', addNewPokemonRequest);


/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));
