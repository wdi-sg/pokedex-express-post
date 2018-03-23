/**
 * ===================================
 * Configurations and set up
 * ===================================
 */

const jsonfile = require('jsonfile');
const express = require('express');
const bodyParser = require('body-parser');
const handlebars = require('express-handlebars');

const FILE = 'pokedex.json';

// Init express app
const app = express();

// tell Express to look into the public/ folder for assets that should be publicly available (eg. CSS files, JavaScript files, images, etc.)
app.use(express.static('public'))

// Set handlebars to be the default view engine
app.engine('handlebars', handlebars.create().engine);
app.set('view engine', 'handlebars');

// tell your app to use the module
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

/**
 * ===================================
 * Routes
 * ===================================
 */

`Add a "Sort by name" button to the homepage (home.handlebars) that when clicked, sends a GET request with a query parameter specifying "?sortby=name"`

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
    }

    else {
      let context = {
        pokemon: pokemon
      };

      // send html file back with pokemon's data
      response.render('pokemon', context);
    }
  });
});

`Expose a new endpoint that intercepts GET requests to /new, which responds with a HTML page with a form that has these fields: id, num, name, img, height, and weight`
app.get('/', (request, response) => {
  // render a handlebars template form here
  var sortby = request.query.sortby;

  jsonfile.readFile('pokedex.json', function(err, obj) {

    if (sortby !== undefined) {

      // sortby name
      if (sortby === "name") {
        obj.pokemon.sort(function(a, b){
         var nameA=a.name.toLowerCase(), nameB=b.name.toLowerCase()
         if (nameA < nameB) //sort string ascending
             return -1
         if (nameA > nameB)
             return 1
         return 0 //default return value (no sorting)
       });
      }

      // sort by id
      else if (sortby === "id") {
        obj.pokemon.sort(function(a, b){
         return a.id - b.id;
       });
      }

    response.send(obj);
    }

    // rewrite pokedex.json
    jsonfile.writeFile('data.json', obj, {spaces: 4}, function(error) {
      console.error(err);
    });
  });

  response.render('home');
});

`Point the form to submit data to the root route (/) using POST method (for the id and num fields, just input long, random numbers for now)`
app.post('/new', function(request, response) {

  //debug code (output request body)
  console.log(request.body);
  var sortby = request.query;
  console.log(sortby);

  // save the request body
  // now look inside your json file

`  Expose a new endpoint that intercepts POST requests to /, which parses the form data and saves the new pokemon data into pokedex.json`
  jsonfile.readFile('pokedex.json', function(err, obj) {

    // update id according to lastId
    var lastId = obj.pokemon[obj.pokemon.length-1].id;
    request.body.id = lastId + 1;
    // add to pokedex.json
    request.body.num = request.body.id.toString();
    obj.pokemon.push(request.body);
    // rewrite pokedex.json
    jsonfile.writeFile('pokedex.json', obj, {spaces: 4}, function(error) {
      console.error(err);
      response.send(obj);
    });
  });

  // response.send(request.body);
});

/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));
