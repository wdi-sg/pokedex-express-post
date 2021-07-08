// added a comment by David

const express = require('express');
const jsonfile = require('jsonfile');

// specify the file to read
const FILE = 'pokedex.json';

const app = express();


const methodOverride = require('method-override')
app.use(methodOverride('_method'));



// tell your app to use the module
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));


// this line below, sets a layout look to your express project
const reactEngine = require('express-react-views').createEngine();
app.engine('jsx', reactEngine);

// this tells express where to look for the view files
app.set('views', __dirname + '/views');

// this line sets react to be the default view engine
app.set('view engine', 'jsx');

app.get('/', (req, res) => {
  // running this will let express to run home.handlebars file in your views folder
  res.render('home')
})
/**
 * ===================================
 * Configurations and set up
 * ===================================
 */

// Init express app

/**
 * ===================================
 * Routes
 * ===================================
 */

 // get the form from the jsx to appear
app.get('/pokemon/new', (request, response) =>{
    response.render("form");
});


// put the user inputs into an object
app.post('/pokemon',(request, response) =>{
    console.log("SAVE MY WORLD", request.body);


// put the object into the array in pokedex.json
    jsonfile.readFile(FILE, (err, obj) => {
        console.log("ERROR, ERROR", err)

// pushes the request.body(object) into obj.pokemon(pokedex.json array)
        obj.pokemon.push(request.body);
// sends all the data in obj.pokemon to the html page
        response.send(obj.pokemon);

        jsonfile.writeFile(FILE, obj, {space: 2}, (err) =>  {
            console.log(err)
        });
    });
});


app.get('/pokemon/:id', (request, response) => {

  // get json from specified file
  jsonfile.readFile(FILE, (err, obj) => {
    
    // check to make sure the file was properly read
    if( err ){
      
      console.log("error with json read file:",err);
      response.status(503).send("error reading filee");
      return; 
    }
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

      // response.send(pokemon);
        response.render('output', pokemon);
    }
  });
});

app.get("/pokemon/:id/edit", (request, response) => {
    var id = request.params.id;

    jsonfile.readFile(FILE, (err, obj) => {
        console.log(obj.pokemon[id]);
        const person = obj.pokemon[id];

        const data = {
            id:id,
            person : person
        };

        response.render("edit", data);
    });
});


app.put("/pokemon/:id", (request, response) => {

    var pokeId = parseInt(request.params.id);
    var pokemonId = pokeId - 1;
    var edit = request.body;

    jsonfile.readFile(FILE, (err, obj) => {
        console.log("editing in progress", obj.pokemon[pokemonId]);

        obj.pokemon[pokemonId] = edit;

        jsonfile.writeFile(FILE, obj, (err) => {
            console.log(err)

            response.send("FINALLY");
        });
    });
});


app.get("/pokemon/:id/delete", (request, response) => {
    var id = request.params.id;

    jsonfile.readFile(FILE, (err, obj) => {
        console.log(obj.pokemon[id])
        const pokemon = obj.pokemon[id];

        response.render("delete", pokemon);

    })
})

app.get('/', (request, response) => {
  response.send("yay");
});

/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));