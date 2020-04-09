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

// this line below, sets a layout look to your express project
const reactEngine = require('express-react-views').createEngine();
app.engine('jsx', reactEngine);

// this tells express where to look for the view files
app.set('views', __dirname + '/views');

// this line sets react to be the default view engine
app.set('view engine', 'jsx');

// tell your app to use the module
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
/**
 * ===================================
 * Routes
 * ===================================
 */
app.post('/pokemon', function (request, response) {

  //debug code (output request body)
  console.log(request.body);
  // get json from specified file
  jsonfile.readFile(FILE, (err, obj) => {

    // check to make sure the file was properly read
    if (err) {

      console.log("error with json read file:", err);
      response.status(503).send("error reading filee");
      return;
    }
    var containsEmpty = false;
    for (let key in request.body) {
      if (request.body[key] == "") {
        containsEmpty = true;
      }
    }
    if (containsEmpty) {
      response.render('new');
    }
    else {
      obj.pokemon.push(request.body);

      // save the request body
      jsonfile.writeFile('pokedex.json', obj, (err) => {
        console.error(err)

        // now look inside your json file
        response.send(`${request.body.name} was added to Pokedex`);
      });
    }
  });

});
app.get('/', (req, res) => {
  // running this will let express to run home.handlebars file in your views folder
  res.render('home')
})
app.get('/pokemon/', (req, res) => {
  // running this will let express to run home.handlebars file in your views folder
  
  jsonfile.readFile(FILE, (err, obj) => {

    // check to make sure the file was properly read
    if (err) {

      console.log("error with json read file:", err);
      response.status(503).send("error reading filee");
      return;
    }
    var pokedex = obj;
    res.render('index',pokedex)
})
})
app.get('/pokemon/new', (req, res) => {
  // running this will let express to run home.handlebars file in your views folder
  res.render('new')
})

app.get('/pokemon/:id', (request, response) => {

  // get json from specified file
  jsonfile.readFile(FILE, (err, obj) => {

    // check to make sure the file was properly read
    if (err) {

      console.log("error with json read file:", err);
      response.status(503).send("error reading filee");
      return;
    }
    // obj is the object from the pokedex json file
    // extract input data from request
    
      let inputId = parseInt(request.params.id);

      var pokemon;

      // find pokemon by id from the pokedex json file
      for (let i = 0; i < obj.pokemon.length; i++) {

        let currentPokemon = obj.pokemon[i];

        if (currentPokemon.id === inputId) {
          pokemon = currentPokemon;
        }
      }

      if (pokemon === undefined) {

        // send 404 back
        response.status(404);
        response.render("not found");
      } else {

        response.render("entry",pokemon);
      }
    
  });
});

// app.get('/', (request, response) => {
//   response.send("yay");
// });


/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));

/**
 * ===================================
 * Functions
 * ===================================
 */
