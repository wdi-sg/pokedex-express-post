const express = require('express');
const methodOverride = require('method-override');
const handlebars = require('express-handlebars');
const path = require('path');
const controllers = require("./controllers.js");

/** * ===================================
 * Configurations and set up
 * =================================== */

// Init express app
const app = express();
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(methodOverride(function (req, res) {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    // look in urlencoded POST bodies and delete it
    var method = req.body._method
    delete req.body._method
    return method
  }
}));
// Set handlebars to be the default view engine
app.engine('handlebars', handlebars.create().engine);
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, '/public'));

/** * ===================================
 * Routes
 * =================================== */

// Root handler
app.get('/', controllers.showRoot);

// New Pokemon handler
app.get('/pokemon/new', controllers.showNewPokemonForm);

// Edit Pokemon handler
app.get('/pokemon/edit', controllers.showSelectPokemonForm)
    .post('/pokemon/edit', controllers.showEditPokemonForm);

// Delete Pokemon handler
app.get('/pokemon/delete', controllers.showDeletePokemonForm);

// Database handler (CRUD)
app.post('/pokemon', controllers.pokemonCreate);
app.get('/pokemon/:id', controllers.pokemonRead);
app.put('/pokemon/:id', controllers.pokemonUpdate);
app.delete('/pokemon/:id', controllers.pokemonDelete);

/** * ===================================
 * Listen to requests on port 3000
 * =================================== */

app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));