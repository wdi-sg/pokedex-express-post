const express = require('express');
const jsonfile = require('jsonfile');
const methodOverride = require('method-override')

const FILE = 'pokedex.json';
const test = 'test.json';

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

app.use(methodOverride('_method'));
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
 app.get('/pokemon/new', (request, response)=>{
response.render("new");
})

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
      response.redirect(301, '/pokemon/new');

    } else {

      response.send(pokemon);
    }
  });
});

app.get('/', (request, response) => {
  response.send("yay");
});


app.post('/pokemon', (request, response) => {
    // console.log(request)
        jsonfile.readFile(FILE, (err, obj) =>{
        var input = {
            id: request.body.id,
            num: request.body.num,
            name: request.body.name,
            img: request.body.img,
            height: request.body.height,
            weight: request.body.weight
        };
            // var errorArr = [];
            // var dataerror = {};
            //     for(var i in input){
            //         console.log(i); // alerts key
            //         console.log(input[i]); //alerts key's value
            //         if(input[i] === ''){
            //             errorArr.push(i);
            //         }
            //     }
            //     dataerror = {errorArr}
            //     console.log(dataerror)

      //debug code (output request body)
        console.error(err);
        obj["pokemon"].push(input);
        jsonfile.writeFile(FILE, obj, (err) => {

        });
    response.send(input);
    })
    // body...
})


app.get('/pokemon/id/edit', (request,response) =>{
    response.send("HELLO EDIT ME")
}
/*
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));