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

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

/**
 * ===================================
 * Routes
 * ===================================
 */

app.get('/:id', (request, response) => {

  // get json from specified file
  jsonfile.readFile(FILE, (err, obj) => {
    // obj is the object from the pokedex json file
    // extract input data from request
    let inputId = parseInt( request.params.id );

    var pokemon;

    // find pokemon by id from the pokedex json file
    console.log('INPUT ID:', inputId);

    for( let i=0; i<obj.pokemon.length; i++ ){

      let currentPokemon = obj.pokemon[i];
      console.log('CURRENT ID:', currentPokemon.id);

      if( currentPokemon.id === inputId ){
        console.log('HELOLLOLOLLLLLL');
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

app.get('/', (request, response) => {
  response.send("yay");
});

app.get('/pokemon/new', (request, response) => {
    let html = `<html>`;
    html += `<body>`;
    html += `<form method="POST" action="/pokemon">`;
    html += `<h1>Create a Pokemon</h1>`;
    html += `<p>ID: <input type="text" name="id"></p>`;
    html += `<p>Num: <input type="text" name="num"></p>`;
    html += `<p>Name: <input type="text" name="name"></p>`;
    html += `<p>Img: <input type="text" name="img"></p>`;
    html += `<p>Height: <input type="text" name="height"></p>`;
    html += `<p>Weight: <input type="text" name="weight"></p>`;
    html += `<p><input type="submit" value="Submit"></p>`;
    html += `</form>`;
    html += `</body>`;
    html += `</html>`;

  // render a template form here
  response.send(html);

});

app.post('/pokemon', function(request, response) {

  //debug code (output request body)
  // console.log(request.body);

  // let file = 'pokedex.json';

  const obj = request.body;

  obj['id'] = parseInt(obj['id']);

  console.log(obj['id']);

  jsonfile.readFile(FILE, (err, obj) => {

    // console.log(obj);

    obj["pokemon"].push(request.body);

    jsonfile.writeFile(FILE, obj, (err) => {

        console.log(err)

    });
});

  // // save the request body
  // jsonfile.writeFile('pokedex.json', request.body, (err) => {
  //   console.error(err)

    // now look inside your json file
    response.send(request.body);
  });
// });

/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));
