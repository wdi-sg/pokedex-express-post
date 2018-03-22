const express = require('express');
const handlebars = require('express-handlebars');

const jsonfile = require('jsonfile');
const FILE = 'pokedex.json';

const bodyParser = require('body-parser');

/**
 * ===================================
 * Configurations and set up
 * ===================================
 */

// Init express app
const app = express();

// Set handlebars to be the default view engine
app.engine('handlebars', handlebars.create().engine);
app.set('view engine', 'handlebars');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static('public'));

/**
 * ===================================
 * Routes
 * ===================================
 */

app.get('/', (request, response) => {
  // send response with some data (a HTML file)
  jsonfile.readFile(FILE, (err,obj) => {
    const pokeArray = obj.pokemon
    let param = request.query.sortby;
    if (param == undefined){
      param = 'id';
    }

    pokeArray.sort((first,second)=>{
      if(first[param] < second[param]) return -1;
      if(first[param] > second[param]) return 1;
      return 0;
    });

    let context = {
      pokedex : pokeArray
    }
    //have to pass in a object not an array for render
    response.render('home',context);
  });
});

app.post('/', (request,response) => {

  jsonfile.readFile(FILE, (err,obj) => {
    let pokeArray = obj.pokemon;
    request.body.id = (pokeArray.length-1) + 1;
    request.body.num = (pokeArray.length-1) + 1;
    console.log(request.body);
    pokeArray.push(request.body);

      jsonfile.writeFile(FILE,obj,{spaces: 2},(err) => {
        console.error(err);
      });
  });
});

app.get('/new', (request, response) => {
  response.render('addPoke');
});

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
