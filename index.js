const express = require('express');
const jsonfile = require('jsonfile');
const reactEngine = require('express-react-views');
const FILE = 'pokedex.json';


/**
 * ===================================
 * Configurations and set up
 * ===================================
 */

// Init express app
const app = express();

app.set('views', __dirname + '/views');
app.set('view engine', 'jsx');
app.engine('jsx', require('express-react-views').createEngine());
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

/**
 * ===================================
 * Routes
 * ===================================
 */

app.get('/pokemon/new', (request, response) => {
  response.render ('new');
  // response.send(`<form method="POST" action="/pokemon">
  // Pokemon details:<br><br>
  // id: <input type="text" name="id"><br><br>
  // num: <input type="text" name="num"><br><br>
  // name: <input type="text" name="name"><br><br>
  // img: <input type="text" name="img"><br><br>
  // height: <input type="text" name="height"><br><br>
  // weight: <input type="text" name="weight"><br><br>
  // <input type="submit" value="Submit">
  // /form>`);
});

app.get('/pokemon/:id', (request, response) => {

  // get json from specified file
  jsonfile.readFile(FILE, (err, obj) => {
    // obj is the object from the pokedex json file
    // extract input data from request
    let inputId = parseInt( request.params.id );

    var pokemon;

    // find pokemon by id from the pokedex json file
    for( let i=0; i<obj.pokemon.length; i++ ){

      let currentPokemon = obj.pokemon[i];

      if( currentPokemon.id == inputId ){

        pokemon = currentPokemon;
      }
    }

    if (pokemon === undefined) {

      // send 404 back
      response.status(404);
      response.send("not found");
    } else {

      response.send(pokemon);
    }
  });
});

app.post('/pokemon', (request, response) => {
  let keys = Object.keys(request.body);
  let body = request.body;
  const empty = [];
  keys.forEach((k) => {
    if (body[k] === "") {
      empty.push(k);
    }
  });
  if (empty.length > 0) {
    response.send(`${empty.join()} is/are required to be filled`);
  } else {
    response.send(request.body);

    //debug code (output request body)
    console.log(request.body);
    jsonfile.readFile(FILE, (err, obj) => {
    obj.pokemon.push(request.body);
      // save the request body
      jsonfile.writeFile(FILE, obj, {spaces:2}, (err) => {
        console.error(err)
        // response.render('home', FILE)
        // // now look inside your json file
        
      });
    });
  }
});
/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));
