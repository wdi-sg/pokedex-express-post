const express = require('express');
const bodyParser = require('body-parser');
const handlebars = require('express-handlebars');
const jsonfile = require('jsonfile');

const FILE = 'pokedex.json';

/**
 * ===================================
 * Configurations and set up
 * ===================================
 */

// Init express app
const app = express();

//tell app to use the module
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

//to use stylesheet / script
app.use(express.static('public'));


// Set handlebars to be the default view engine
app.engine('handlebars', handlebars.create().engine);
app.set('view engine', 'handlebars');

/**
 * ===================================
 * Routes
 * ===================================
 */

 let content = {pokemons:[]};

 app.post('/', (request,response) => {

  jsonfile.readFile(FILE, (err,obj) => {
  //console.log(obj);

    //this prints the JSON document received
    console.log(request.body);
    obj.pokemon.push(request.body);
     // save the request body
     jsonfile.writeFile(FILE, obj, (err) => {
      console.error(err);

      // now look inside your json file
      response.send(request.body);
    });
   });
});


 app.get('/new', (request,response) => {

  jsonfile.readFile(FILE, (err, obj) => {
    
    for (let i = 0; i < obj.pokemon.length; i++) {
      let pokemonList = {};
      pokemonList.img = obj.pokemon[i].img;
      pokemonList.num = obj.pokemon[i].num;
      pokemonList.name = obj.pokemon[i].name;
      content.pokemons.push(pokemonList);
    }
    
    response.render('home', content);
  });
});


 app.get('/', (request,response) => {
  jsonfile.readFile(FILE, (err,obj) => {
    let pokemonList = [];
    let rearranged = [];

    for(let i = 0; i < obj.pokemon.length; i++) {
      pokemonList.push(obj.pokemon[i].name);
    }

    rearranged = pokemonList.sort();
    //console.log(obj.pokemon.name);
    for (let i=0; i < rearranged.length; i++) {
      for (let index in obj.pokemon){
        let rearrangedPokeList = {};
        if (obj.pokemon[index].name === rearranged[i]){
          rearrangedPokeList.img = obj.pokemon[index].img;
          rearrangedPokeList.num = obj.pokemon[index].num;
          rearrangedPokeList.name = obj.pokemon[index].name;
          content.pokemons.push(rearrangedPokeList);
          //console.log(rearrangedPokeList);
        }
      }
      response.render('home', content);
    }
  });
});

  // jsonfile.readFile(FILE, (err,obj) => {
  //   //console.log(obj);

  //   jsonfile.writeFile(FILE, request.body, (err) => {

  //     //data written into the json file
  //     response.send(response.body);

  //   });


  // });


  app.get('/:id', (request, response) => {
  // get json from specified file
  jsonfile.readFile(FILE, (err, obj) => {
    // obj is the object from the pokedex json file
    // extract input data from request
    let inputId = request.params.id;

    // find pokemon by id from the pokedex json file
    // (note: find() is a built-in method of JavaScript arrays)
    let pokemon = obj.pokemon.find((currentPokemon) => {
      return currentPokemon.id === parseInt(inputId, 10);
    });

    if (pokemon === undefined) {
      // send 404 back
      response.render('404');
    } else {
      let context = {
        pokemon: pokemon
      };

      // send html file back with pokemon's data
      response.render('pokemon', context);
    }
  });
});

/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
 app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));
