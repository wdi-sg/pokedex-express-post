const express = require('express');
const methodOverride = require('method-override');
const handlebars = require('express-handlebars');
const path = require('path');
const jsonfile = require('jsonfile');

const helpers = require("./helpers.js");
// load the router module in the app
const pokemon = require('./routes/pokemon');

const FILE = 'pokedex.json';

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
app.set('views', path.join(__dirname, '/views'));

/** * ===================================
 * Routes
 * =================================== */

// use the pokemon router
app.use('/pokemon', pokemon);

// Root handler
app.get('/', (request, response) => {
    jsonfile.readFile(FILE, (err, objRead) => {
        let pokeinfo = objRead.pokemon.map( pokemon => { return { "name": pokemon.name, "id": pokemon.id, "num": pokemon.num, "img": pokemon.img }; })
        let context;
        if (request.query.sortby == "name") {
            pokeinfo = pokeinfo.sort(helpers.sortObject);
            context = { pokeinfo };
        } else {
            context = { pokeinfo };
        }
        response.render('home', context);
    })
});


/** * ===================================
 * Listen to requests on port 3000
 * =================================== */

app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));