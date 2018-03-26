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

const app = express();

app.engine('handlebars', handlebars.create().engine);
app.set('view engine', 'handlebars');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
/**
 * ===================================
 * Routes
 * ===================================
 */
let requestId = '/:id'
let handleRequestId =(request, response) => {
  // get json from specified file
  jsonfile.readFile(FILE, (err, obj) => {
    // obj is the object from the pokedex json file
    // extract input data from request
    let inputId = request.params.id;
    // find pokemon by id from the pokedex json file
    // (note: find() is a built-in method of JavaScript arrays)
                                                                      //###THIS WOULD WORK TOO###
                                                                      // let wow = (currentPokemon) => {
                                                                      //   return currentPokemon.id === parseInt(inputId, 10);
                                                                      // }
                                                                      //###AND THIS TOO###
                                                                      // let pokemon = obj.pokemon.find((currentPokemon) => {
                                                                      //   return currentPokemon.id === parseInt(inputId, 10);
                                                                      // });
    let  wow = function(currentPokemon) {
      return currentPokemon.id === parseInt(inputId, 10);
    }
    let pokemon = obj.pokemon.find(wow);

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
}
app.get(requestId, handleRequestId);

/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));
