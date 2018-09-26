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

//let app use module
app.use(express.json());
 app.use(express.urlencoded({
   extended: true
 }));
/**
 * ===================================
 * Routes
 * ===================================
 */

const pokemonStuff = () => {

    let execute = "<html>";
    execute += "<body>";
    execute += '<form method="POST" action="/pokemon">';
    execute += "Pokemon name:";
    execute += '<p>ID:<input type="text" name="id"><p>';
    execute += '<p>Num:<input type="text" name="num"><p>';
    execute += '<p>Name:<input type="text" name="name"><p>';
    execute += '<p>Img:<input type="text" name="img"><p>';
    execute += '<p>Height:<input type="text" name="height"><p>';
    execute += '<p>Weight:<input type="text" name="weight"><p>';
    execute += '<p>Input:<input type="submit" value="Submit"><p>';
    execute += "</form>";
    execute += "</body>";
    execute += "</html>";
      return execute;
};

  app.get('/pokemon/new', (request, response) => {
    response.send(pokemonStuff());
});

/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));
