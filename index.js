const express = require('express');
const jsonfile = require('jsonfile');
const path = require('path');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const myModule = require('./my-module.js')

const FILE = 'pokedex.json';

/**
 * ===================================
 * Configurations and set up
 * ===================================
 */

// Init express app
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.set('view engine', 'ejs');

/**
 * ===================================
 * Routes
 * ===================================
 */

app.get('/', myModule.rootPath);
app.get('/pokemon/new', myModule.newPokemon);
app.post('/pokemon', myModule.savePokemon);
app.get('/:id', myModule.viewPokemon);
app.put('/:id/update', myModule.updatePokemon);
app.get('/:id/delete', myModule.deletePokemon);
app.delete('/:id/delete-confirm', myModule.confirmDeletePokemon);

/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));
