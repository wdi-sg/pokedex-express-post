const express = require('express');
const handlebars = require('express-handlebars');
const jsonfile = require('jsonfile');
const bodyParser = require('body-parser');

const FILE = 'pokedex.json';

/**
 * ===================================
 * Configurations and set up
 * ===================================
 */

// Init express app
const app = express();

// tell your app to use the body parser module
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
})); 

// Set handlebars to be the default view engine
app.engine('handlebars', handlebars.create().engine);
app.set('view engine', 'handlebars');

/**
 * ===================================
 * Routes
 * ===================================
 */

// Qns1: Expose a new endpoint that intercepts GET requests to /new, which responds with a HTML page with a form that has these fields: id, num, name, img, height, and weight
app.get('/new', (request, response) => {
  response.render('pokemon'); // i overwrite the given handlebar file
})

// Qns2: Point the form to submit data to the root route (/) using POST method (for the id and num fields, just input long, random numbers for now)
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

// online given solution to sorting
// objArray.sort(function(a, b) {
//     var textA = a.DepartmentName.toUpperCase();
//     var textB = b.DepartmentName.toUpperCase();
//     return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
// });

app.get('/', (request, response) => {
  var sortby = request.query.sortby // found this online, request.params.sortby don't work
  jsonfile.readFile(FILE, function(err,obj) {
    if (sortby !== undefined) {
      if (sortby === "name") {
        obj.pokemon.sort(function(a, b) {
          var nameA = a.name.toLowerCase();
          var nameB = b.name.toLowerCase();
          return (nameA < nameB) ? -1 : (nameA > nameB) ? 1:0;
        })
      }
        else if (sortby === "id") {
          obj.pokemon.sort(function (a, b) {
            return (a.id - b.id);
      })
    } 
    response.send(obj);
    }
    jsonfile.writeFile(FILE, obj, {spaces: 4}, function(error) {
      console.exception(err);  
    })
  })
  response.render('home');
}) 

   


/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));
