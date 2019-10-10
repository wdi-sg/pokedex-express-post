const express = require('express');
const jsonfile = require('jsonfile');

//I am making some comments to check branching without messing your code :)



// Init express app
const app = express();

// tell your app to use the module
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

const methodOverride = require('method-override');

app.use(methodOverride('_method'));


const reactEngine = require('express-react-views').createEngine();
app.engine('jsx', reactEngine);

// this tells express where to look for the view files
app.set('views', __dirname + '/views');

// this line sets react to be the default view engine
app.set('view engine', 'jsx');


const FILE = 'pokedex.json';

/**
 * ===================================
 * Configurations and set up
 * ===================================
 */



/**
 * ===================================
 * Routes
 * ===================================
 */

//intro screen
app.get('/', (request, response) => {
    response.render("intro");
});



app.get('/pokemon/new',(request,response)=>{
    response.render('form');
});

 app.post('/pokemon',(request, response)=>{
  console.log("EVERYTHING in the form request", request.body );
  jsonfile.readFile(FILE,(err, obj) => {
    obj.pokemon.push(request.body);
    response.send(obj.pokemon);
    jsonfile.writeFile(FILE,obj,{spaces: 2},(err) => {
        console.error(err);
    });
});
})



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


app.get('/pokemon/:id/edit',(request, response)=> {

    jsonfile.readFile(FILE, (err,obj) => {

        let pokemonInputId = parseInt(request.params.id);
        console.log(pokemonInputId)
        let editPokemon = obj.pokemon[pokemonInputId-1];
        response.render("editForm", editPokemon)
    });
});


app.put('/pokemon/:id', (request,response) => {
    let inputId =  parseInt(request.params.id);
    let editedPokemon = request.body;

    jsonfile.readFile(FILE,(err,obj) => {
        let oldPokemon = obj.pokemon[inputId-1];

        oldPokemon.num = editedPokemon.num;
        oldPokemon.name = editedPokemon.name;
        oldPokemon.img = editedPokemon.img;
        oldPokemon.height = editedPokemon.height;
        oldPokemon.weight = editedPokemon.weight;

        jsonfile.writeFile(FILE, obj,{spaces: 2},(err) => {
            console.log(err)
            response.render("editedPokemon", oldPokemon);
        })
    })

})




/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(4000, () => console.log('~~~ Tuning in to the waves of port 4000 ~~~'));