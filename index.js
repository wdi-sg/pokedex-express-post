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
const methodOverride = require('method-override');

app.use(methodOverride('_method'));
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

// // this line below, sets a layout look to your express project
// const reactEngine = require('express-react-views').createEngine();
// app.engine('jsx', reactEngine);
// // this tells express where to look for the view files
// app.set('views', __dirname + '/views');
// // this line sets react to be the default view engine
// app.set('view engine', 'jsx');


/**
 * ===================================
 * Routes
 * ===================================
 */

 // method: The HTTP method used to send the data: POST or GET.
// The POST method should always be used if the data is going to result in a change to the server's database, because this can be made more resistant to cross-site forgery request attacks.
// The GET method should only be used for forms that don't change user data (e.g. a search form). It is recommended for when you want to be able to bookmark or share the URL.

// The default method when submitting form data is GET.

// However, when GET is used, the submitted form data will be visible in the page address field.

// Always use POST if the form data contains sensitive or personal information. The POST method does not display the submitted form data in the page address field.

// Notes on POST:

// POST has no size limitations, and can be used to send large amounts of data.
// Form submissions with POST cannot be bookmarked

 //if user does not have input
app.get('/', (request, response) => {
  response.send("Welcome to the Pokedex!");
});

//gives basic data for user
app.get('/:id', (request, response) => {

  // get json from specified file
  jsonfile.readFile(FILE, (err, obj) => {
    // obj is the object from the pokedex json file
    // extract input data from request
    let inputId = parseInt( request.params.id );

    var pokemon;

    // find pokemon by id from the pokedex json file
    for( let i=0; i<obj.pokemon.length; i++ ){

      let currentPokemon = obj.pokemon[i];

      if( currentPokemon.id === inputId ){
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

// Expose a new endpoint that intercepts GET requests to `/pokemon/new`, which responds with a HTML page with a `form` that has these fields: `id`, `num`, `name`, `img`, `height`, and `weight`

// * (for the `id` and `num` fields, for now, the user will simply choose a number. Obviously if they happen to pick an id that already exists, they will have a bad time. We will have the tools to correct this soon)

// * Expose a new endpoint that accepts POST requests to `/pokemon`, which parses the form data and saves the new pokemon data into `pokedex.json`

app.get('/pokemon/new', (request, response) => {

// * Point the form to submit data to the (`/pokemon`) route using POST method
// action: The resource/URL where data is to be sent for processing when the form is submitted. If this is not set (or set to an empty string), then the form will be submitted back to the current page URL.

      let form =`<html>
                  <body>
                    <form action="/pokemon" method="post">
                      <input id="id" type="text" name="id" placeholder="Please enter ID Number.">
                      <input id="num" type="text" name="num" placeholder="Please enter a number.">
                      <input id="name" type="text" name="name" placeholder="Please enter a name.">
                      <input id="img" type="text" name="img" placeholder="What is the img src url?">
                      <input id="height" type="text" name="height" placeholder="What is the pokemon's height?">
                      <input id="weight" type="text" name="weight" placeholder="What is the pokemon's weight?">
                      <input type="submit">
                    </form>
                  </body>
                </html>`

    response.send(form);

});

app.post('/pokemon/', (request, response) => {

  //debug code (output request body)
  console.log(request.body);

  jsonfile.readFile(FILE, (err, obj) => {

    newPokemon = {
            "id":  request.body.id,
            "num": request.body.num,
            "name": request.body.name,
            "img": request.body.img,
            "height": request.body.height,
            "weight": request.body.weight,
            "candy": "",
            "candy_count": "",
            "egg": "",
            "avg_spawns": "",
            "spawn_time": ""
          };

          obj.pokemon.push(newPokemon);

  // save the request body
  jsonfile.writeFile(FILE, obj, (err) => {
    console.error(err)
    response.send("You have a new Pokemon!");
    // now look inside your json file
    });
  });
});

/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));
