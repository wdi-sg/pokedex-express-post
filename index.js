
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

//let app use module
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

const pokemonStuff = () => {

    let execute = "<html>";
    execute += "<body>";
    execute += '<form method="POST" action="/pokemon">';
    execute += "Poke Poke mon name:";
    execute += '<p>ID:<input type="text" name="id"><p>';
    execute += '<p>Num:<input type="text" name="num"><p>';
    execute += '<p>Name:<input type="text" name="name"><p>';
    execute += '<p>Img:<input type="text" name="img"><p>';
    execute += '<p>Height:<input type="text" name="height"><p>';
    execute += '<p>Weight:<input type="text" name="weight"><p>';
    execute += '<p>Input:<input type="submit" value="Submit"><p>';
    execute += "</form>";
    execute += "</body>";
    execute += "</html>";
      return execute;
};


//pre-load with s/edits


app.get('/pokemon/new', (request, response) => {
    response.send(pokemonStuff());
});

app.get('/:id', (request, response) => {
  // get json from specified file
  jsonfile.readFile(FILE, (err, obj) => {
    // obj is the object from the pokedex json file
    // extract input data from request
    let inputId = parseInt( request.params.id );
    let pokemon;

    // find pokemon by id from the pokedex json file
    for( let i=0; i<obj.pokemon.length; i++ ){
      let currentPokemon = obj.pokemon[i];
      if( currentPokemon.id === inputId){
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
  // };
  });
});


app.get('/', (request, response) => {
   response.send("yay");
 });


app.post('/pokemon', function (request, response)  {
console.log(request.body)

    jsonfile.readFile(FILE, (err,obj) => {
    if (err) {
      console.log("ERROR", err)
    }
  })

let file = 'pokedex.json'
const obj = request.body;

 let newPokemon = [];
    newPokemon.id = request.body.id;
    newPokemon.num = request.body.num;
    newPokemon.name = request.body.name;
    newPokemon.img = request.body.img;
    newPokemon.height = request.body.height;
    newPokemon.weight = request.body.weight;
//adding new pokemon
      // obj.pokemon.push(newPokemon);
      newPokemon.push(pokemonStuff.name)


//saving request.body
  jsonfile.writeFile(FILE, obj, function(err) {
    if (err) {
      console.log("ERROR", err)
    }
  })
  response.send(request.body);
})

//making edits to JSON File
 app.put('/pokemon/:id', (request, response) => {
     // console.log( request.body )

     jsonfile.readFile( FILE, (err, obj) => {
           // console.log( "obj:",obj );
           console.log( "err:",err );

           let requestedPokemonId = request.params.id;
           for( let i=0; i< obj.pokemon.length; i++){
             if( obj.pokemon[i].id === requestedPokemonId){
                 var foundPokemonIndex = i;
                 var foundPokemon = obj.pokemon[i];
             }
           }

           if( foundPokemon ){
             console.log("FOUND:", foundPokemon );
             obj.pokemon[foundPokemonIndex] = request.body;
             obj.pokemon[foundPokemonIndex].id = parseInt( obj.pokemon[foundPokemonIndex].id )

             jsonfile.writeFile(FILE, obj, function (err) {
                 if (err) console.log("ERROR:",err)

                 response.send("FOUND, WORKS")
             })

           } else{
               response.send("not a Pokemon");
           }
       });

 })


 // * ===================================
 // * Listen to requests on port 3000

app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));
