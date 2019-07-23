const express = require('express');
const jsonfile = require('jsonfile');

/**
 * ===================================
 * Configurations and set up
 * ===================================
 */

// Init express app
const app = express();

const reactEngine = require('express-react-views').createEngine();
app.engine('jsx', reactEngine);
app.set('views', __dirname + '/views');
app.set('view engine', 'jsx');
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
const methodOverride = require('method-override')
app.use(methodOverride('_method'));

/**
 * ===================================
 * Global Variable
 * ===================================
 */
const FILE = 'pokedex.json';

/**
 * ===================================
 * Routes
 * ===================================
 */

 app.get('/new', (request, response) => {
    let form = `
    <form method="POST" action="/new">
        <p><input name = "id" value="id"></input></p>
        <p><input name = "num" value="num"></input></p>
        <p><input name = "name" value="name"></input></p>
        <p><input name = "img" value="img"></input></p>
        <p><input name = "height" value="height"></input></p>
        <p><input name = "weight" value="weight"></input></p>
        <p><button type="submit">Submit</button></p>
    </form>
    `
    response.send(form);
})

 app.post('/new', (request, response) => {
    var newPokemon = request.body;
    //save the request body
    jsonfile.readFile(FILE, (err, obj) => {
        if( err ){
            console.log("error reading file");
            console.log(err)
        }else{
            var pokemon = obj.pokemon;
            pokemon.push(newPokemon);
            jsonfile.writeFile(FILE, newPokemon, (err) => {
                if( err ){
                console.log("error writing file");
                console.log(err)
                response.status(503).send("ERROR WRITING FILE");
                } else {
                console.log("write file successful");
                }
            });
        }
    })
})

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
      response.send("no such pokemon");
    } else {

      response.send(pokemon);
    }
  });
});


app.get('/', (request, response) => {
  response.send("yay");
});


/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));