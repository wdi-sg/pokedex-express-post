//Swee Chin's work:
//https://github.com/wdi-sg/pokedex-express-post/blob/b5dd03d949531d682955e20ca927ba12c980a8d8/index.js
// http://expressjs.com/en/api.html#req.query

const express = require('express');
const jsonfile = require('jsonfile');
const methodOverride = require('method-override') //so that we can use PUT and DELETE in express


const FILE = 'pokedex.json';

/**
 * ===================================
 * Configurations and set up
 * ===================================
 */

// Init express app
const app = express();
// tell your app to use the module
app.use(express.json());
app.use(express.urlencoded({ //use this so that we can do request.body later
  extended: true
}));
app.use(methodOverride('_method')); // from using methodOverride above

// this line below, sets a layout look to your express project
const reactEngine = require('express-react-views').createEngine();
app.engine('jsx', reactEngine);

// this tells express where to look for the view files
app.set('views', __dirname + '/views');

// this line sets react to be the default view engine
app.set('view engine', 'jsx');


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
//Expose a new endpoint that intercepts GET requests to /pokemon/new, which responds with a HTML page with a form that has these fields: id, num, name, img, height, and weight
app.get('/pokemon/new', (request, response) => {

  response.render('new');
});

//Point the form to submit data to the (/pokemon) route using POST method;
// app.post('/pokemon', (request, response) => {
//   // we are recieving data
//   console.log("this is request body:",request.body);
//   // save the request body
//   jsonfile.writeFile('data.json', request.body, (err) => {
//     console.error(err)
//     console.log(request.body);
//     // now look inside your json file
//     response.send(request.body);
//   });
// });

//Expose a new endpoint that accepts POST requests to /pokemon, which parses the form data and saves the new pokemon data into pokedex.json
app.post('/pokemon', (request, response) => {
  // we are recieving data
  console.log("this is request body:",request.body);
  // save the request body
jsonfile.readFile(FILE, (err, obj) => {

  console.log("reading file now");
  console.error(err);
  console.log(request.body);
  console.log("done reading file");
  obj.pokemon.push(request.body);

  jsonfile.writeFile(FILE, obj, { spaces: 2 }, (err) => {
    console.log("writing file now");
    console.error(err);
    // now look inside your json file
    response.send(obj);
    console.log("done writing file");
    console.log(obj);
    });
  });
});

//at the root route (GET request) / display a list of all the pokemons in the pokedex
app.get('/', (request, response) => {
  jsonfile.readFile(FILE, (err, obj) => {
    console.log("Begin reading file");
    let array = [];
    let string = "";
    for (let i =0; i<obj.pokemon.length; i++){
      console.log(obj.pokemon[i].name);
      array.push(obj.pokemon[i].name); ////ideally should try to put each pokemon id, num and name into an object with three pairs of key-values. Then each pokemon details will be an object element in the array.
    }
    console.error(err);
    console.table(array);
    for (i in array){
      string = string + array[i] + '<br>'+ " ";
    }
    let respond = string;
    console.log(respond);
    response.send(`${respond}`);
    console.log("End reading file");
  });
});

// app.get('/', (request, response) => {
//   response.send("yay");
// });

//technically, supposed to do the sort button, under the further sections...
//end of Pokedex-express-post Part 1

//beginning of Pokedex-express-post part 2
//this is just for testing, and it works...

// app.get('/pokemon/:id/edit', (request, response)=>{
//   let respond = '<form method="GET" action ="/animals">'+
//                 'Animal Name: <input type = "text" name ="animalname">'+
//                 '<input type ="submit" value ="Submit">'+
//                 '</form>';
//   response.send(respond);
// });

app.get('/pokemon/:id/edit', (request, response)=>{
  let pokemonId = parseInt(request.params.id);
  let arrayIndex = parseInt(request.params.id)-1; //because say Bulbasaur is id of 1, but index of zero in the array
  jsonfile.readFile('pokedex.json', (err, obj) => {

  let respond = obj.pokemon[arrayIndex];

  response.render('edit',{ respondKey: respond, idKey: pokemonId} );
  });
});

app.put('pokemon/:id', )

/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));
