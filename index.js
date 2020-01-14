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


// This code below is needed so that express can deal with json objects
// Particularly too read request.body 
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



/**
 * ===================================
 * Routes
 * ===================================
 */

app.get('/pokemon/:id', (request, response) => {

  // get json from specified file
  jsonfile.readFile(FILE, (err, obj) => {
    
    // check to make sure the file was properly read
    if( err ){
      console.log("error with json read file:",err);
      response.status(503).send("error reading filee");
      return; 
    }
    
    // Below if-else statement checks if the request.params.id is "new",
    // If it is, render the input form 
    // If not, it should be a number, and the object containing the details of the pokemon should be rendered.
    if(request.params.id == "new"){
      
      response.render('form');

    } else {
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
    }
    
  });
});

app.get('/', (request, response) => {
  response.send("yay");
});

app.post('/pokemon', (request, response)=>{
  jsonfile.readFile(FILE,(err,obj) => {
    let currInput = request.body;
    // Setting other fields not avaiable in the form as "null"
    currInput["candy"] = null;
    currInput["candy_count"] = null;
    currInput["egg"] = null;
    currInput["avg_spawn"] = null;
    currInput["spawn_time"] = null;

    obj.pokemon.push(currInput)
    // Check result by looking at last 2 elements in the pokemon array
    let n = obj.pokemon.length;
    console.log(obj.pokemon.slice(n-2,n))
    response.send(obj.pokemon.slice(n-2,n));
  })
})

/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));
