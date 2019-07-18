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

app.use(express.static(__dirname + '/public'));

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



/**
 * ===================================
 * Routes
 * ===================================
 */

var displayAllPokemons = function(request, response){
  jsonfile.readFile(FILE, (err, dataObj)=>{

    console.log(dataObj.pokemon);
    const data = {
      pokemonsAll : dataObj.pokemon

    };


    response.render('home', data);

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
        response.send("success");
        // response.redirect('pokemon');

      }

    });

  });

}

var getNewPokemonRequest = function(request,response){
  jsonfile.readFile(FILE, function(err,data){
    //get the next index
    var lastIndex = data.pokemon.length + 1 ;

    var data = {
      lastIndex : lastIndex,
    }

    response.render('new',data);
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

    var head = `<head><link rel="stylesheet" type="text/css" href="style.css"></head>`
    var form = '<form method="get" action="/">'
               + sortBySelect
               // + idButton
               // + nameButton
               // + heightButton
               // + weightButton
               // + submitButton
               + '</form>';
    var body = `<body>${form}${pokemonDisplay}</body>`


    response.send(head+body);

  });

}



//part 2
var getPokemonByIdRequest = function(request,response){

  jsonfile.readFile(FILE, (error, obj) => {
    if( error ){
      console.log(error)
    }

    console.log(obj);
    var id = parseInt(request.params.id) - 1;

    var thisPokemon = obj.pokemon[id];

    var data = {
      pokemon : thisPokemon,
    }

    response.render('pokemon', data);
  });

}

var editPokemonById = function(request,response){

  var newPokemon = request.body;
  console.log( newPokemon );

  // save in data file
  jsonfile.readFile(FILE, (error, obj) => {
    if( error ){
      console.log(error)
    }

    // save data
    obj.pokemon[parseInt(request.params.id) - 1] = newPokemon;
    console.log(obj.pokemon[parseInt(request.params.id) - 1].name);

    var id = parseInt(request.params.id) - 1;
    var thisPokemon = obj.pokemon[id];

    var data = {
      pokemon : thisPokemon,
      updated : true
    }

    jsonfile.writeFile(FILE, obj, (error) => {
      if( error ){
        console.log(error)
      }

      // response.send(obj.pokemon[parseInt(request.params.id) - 1].name + ' updated!');

      response.render('pokemon', data);
    });


  });
}

var editPokemonByIdRequest = function(request,response){
  jsonfile.readFile(FILE, (error, obj) => {
    if( error ){
      console.log(error);
    }

    console.log(obj);
    var id = parseInt(request.params.id) - 1;

    var pokemon = obj.pokemon[id];

    var data = {
      pokemon : pokemon,
    }

    response.render('edit', data);
  });
}


/**
 * ===================================
 * Routes
 * ===================================
 */


// app.get('/', getAllPokemonRequest);

//old code part 1
// app.get('/pokemon:id', getPokemonByIdRequest);
app.get('/pokemon/new', getNewPokemonRequest);
app.post('/pokemon1', addNewPokemonRequest);


//after adding react
app.get('/pokemon', displayAllPokemons);
app.get('/pokemon/:id', getPokemonByIdRequest);
app.put('/pokemon/:id', editPokemonById);
app.get('/pokemon/:id/edit', editPokemonByIdRequest);



/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(4500, () => console.log('~~~ Tuning in to the waves of port 4500 ~~~'));
