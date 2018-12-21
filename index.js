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

// this line below, sets a layout look to your express project
const reactEngine = require('express-react-views').createEngine();
app.engine('jsx', reactEngine);
// this tells express where to look for the view files
app.set('views', __dirname + '/views');
// this line sets react to be the default view engine
app.set('view engine', 'jsx');

app.use(methodOverride('_method'));
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));


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

    // Add a "Sort by name" button to the homepage (/ route) that when clicked, sends a GET request with a query parameter specifying "?sortby=name" ( this requests a whole new page )
  var sortButton = `<form action="/" name="sort" method="get">
                      <select name="sortby">
                        <option value="name">Name</option>
                        <option value="id">ID</option>
                        <option value="height">Height</option>
                        <option value="weight">Weight</option>
                      </select>
                      <input type="submit">
                    </form>`;

  jsonfile.readFile(FILE, (err, obj) => {
 // at the root route (GET request) / display a list of all the pokemons in the pokedex
    // var displayAll="";

    // for( let i=0; i<obj.pokemon.length; i++ ){

    //   // console.log(i);

    //     let displayPokemon =  
    //       `<p>${obj.pokemon[i].name}</p>
    //       <p>${obj.pokemon[i].id}</p>
    //       <img src="${obj.pokemon[i].img}">`;

    //     displayAll = displayAll + displayPokemon;

    // } 
    let pokemonList = obj.pokemon;
    var sortedPokemon = "";

    switch (request.query.sortby) {
              case "name":
                  pokemonList.sort((name1, name2) => {
                      if (name1.name > name2.name) return 1;
                      if (name1.name < name2.name) return -1;
                  });
                  break;

              case "id":
                  pokemonList.sort((num1, num2) => {
                      if (num1.id > num2.id) return 1;
                      if (num1.id < num2.id) return -1;
                  });
                  break;

              case "height":
                  pokemonList.sort((height1, height2) => {
                      if (parseFloat(height1.height) > parseFloat(height2.height)) return 1;
                      if (parseFloat(height1.height) < parseFloat(height2.height)) return -1;
                  });
                  break;

              case "weight":
                  pokemonList.sort((weight1, weight2) => {
                      if (parseFloat(weight1.weight) > parseFloat(weight2.weight)) return 1;
                      if (parseFloat(weight1.weight) < parseFloat(weight2.weight)) return -1;
                  });
                  break;
                  }

          for (let i = 0; i < obj.pokemon.length; i++) {
              let listPokemon =  
                  `<p>Name: ${pokemonList[i].name}</p>
                  <p>ID: ${pokemonList[i].id}</p>
                  <img src="${pokemonList[i].img}">
                  <p>Weight: ${pokemonList[i].weight}</p>
                  <p>Height: ${pokemonList[i].height}</p>`;
                sortedPokemon = sortedPokemon + listPokemon;
          };
    //can't set headers after they are sent!!
    response.send(`<html>
                    <body>
                      <p>Welcome to the Pokedex!</p>
                      <p>How do you want to sort your pokemon?</p>
                      ${sortButton}
                      ${sortedPokemon}
                    </body>
                  </html>`);
    // console.log(sortButton);
  })
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
      let showPokemon = `<p>Name: ${pokemon.name}</p>
                          <p>ID: ${pokemon.id}</p>
                          <img src="${pokemon.img}">
                          <p>Weight: ${pokemon.weight}</p>
                          <p>Height: ${pokemon.height}</p>
                          <p>What type is this pokemon?</p>
                          <form action="/pokemon/type/${pokemon.id}" name="type" method="post">
                            <select name="makeType">
                              <option value="your">your</option>
                              <option value="my">my</option>
                              <option value="best">best</option>
                              <option value="not-my">Not my</option>
                            </select>
                            <input type="submit">
                          </form>`;
      response.send(showPokemon);
    }
  });
});

app.post('/pokemon/type/:id', (request, response) => {

  //debug code (output request body)
  // console.log(request.body);

  jsonfile.readFile(FILE, (err, obj) => {

    let updatePokemon =  obj.pokemon[request.params.id -1];

    updatePokemon.type= request.body.makeType;

  // save the request body
  jsonfile.writeFile(FILE, obj, (err) => {
    console.error(err)
    let showPokemon = `<p>Name: ${updatePokemon.name}</p>
                          <p>ID: ${updatePokemon.id}</p>
                          <img src="${updatePokemon.img}">
                          <p>Weight: ${updatePokemon.weight}</p>
                          <p>Height: ${updatePokemon.height}</p>
                          <p>Type: : ${updatePokemon.type}</p>`
    response.send(showPokemon);
    // now look inside your json file
    });
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
                    <form action="/pokemon" method="post">`+
                      // <input id="id" type="text" name="id" placeholder="Please enter ID Number.">
                      // <input id="num" type="text" name="num" placeholder="Please enter a number.">
                      `<input id="name" type="text" name="name" placeholder="Please enter a name.">
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
            "id":  obj.pokemon.length+1,
            "num": obj.pokemon.length+1,
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

// add the ability to edit the data for a given pokemon
// install react templates for your app
// add a form at the path: /pokemon/:id/edit
// add each field as an input and pre-populate the current data for that pokemon
// the form should make a request ( the form action ) to the correct route ( a PUT request to /pokemon/:id )

app.get('/pokemon/edit/:id', (request, response) => {

  // get json from specified file
  jsonfile.readFile(FILE, (err, obj) => {


    // obj is the object from the pokedex json file
    // extract input data from request
    let inputId = parseInt(request.params.id);

    var pokemon;

    // find pokemon by id from the pokedex json file
    for( let i=0; i<obj.pokemon.length; i++ ){

          let currentPokemon = obj.pokemon[i];

          if( currentPokemon.id === inputId ){
            pokemon = currentPokemon;
            console.log(pokemon);
          };
        }

          if (pokemon === undefined) {
          // send 404 back
          response.status(404);
          response.send("not found");
          } else {
            console.log(pokemon.id);
            response.render('edit', pokemon);
          }  
    })
});

app.post('/pokemon/updated/:id', (request, response) => {

  //debug code (output request body)
  // console.log(request.body);

  jsonfile.readFile(FILE, (err, obj) => {

    let updatePokemon =  obj.pokemon[request.params.id-1];

    updatePokemon.name= request.body.name;
    updatePokemon.img= request.body.img;
    updatePokemon.height= request.body.height
    updatePokemon.weight= request.body.weight;
    updatePokemon.type= request.body.makeType;

  // save the request body
  jsonfile.writeFile(FILE, obj, (err) => {
    console.error(err)
    let showPokemon = `<p>Name: ${updatePokemon.name}</p>
                          <p>ID: ${updatePokemon.id}</p>
                          <img src="${updatePokemon.img}">
                          <p>Weight: ${updatePokemon.weight}</p>
                          <p>Height: ${updatePokemon.height}</p>
                          <p>Type: : ${updatePokemon.type}</p>`
    response.send(showPokemon);
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
