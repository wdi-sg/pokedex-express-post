const express = require('express');
const jsonfile = require('jsonfile');
const methodOverride = require('method-override')
const FILE = 'pokedex.json';


// Init express app
const app = express();

app.use(methodOverride('_method'));
// this line below, sets a layout look to your express project
const reactEngine = require('express-react-views').createEngine();
app.engine('jsx', reactEngine);

// this tells express where to look for the view files
app.set('views', __dirname + '/views');

// this line sets handlebars to be the default view engine
app.set('view engine', 'jsx');

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

//Add new pokemon url, response will render react template
app.get('/pokemon/new', (request, response) => {
  response.render('newpokemon');
});

//Edit current pokemon url, response will render react template
app.get('/pokemon/:id/edit', (request, response) => {

  jsonfile.readFile(FILE, (err, obj) => {
      console.log( "err:",err );
      let foundPokemon;
      let requestedPokemonId = request.params.id
      for( let i=0; i< obj.pokemon.length; i++){
        if( obj.pokemon[i].id === parseInt( requestedPokemonId )){
            foundPokemon = obj.pokemon[i];
        }
      }
      if( foundPokemon ){
          console.log("FOUND:", foundPokemon );
          response.render('editpokemon', {pokemon: foundPokemon});
      }
      else{
          response.send("That's not a pokemon");
      }
  });
});

app.put('/pokemon/:id', (request, response) => {
console.log("edit:",request.body);
let foundPokemon;
  jsonfile.readFile(FILE, (err, obj) => {

      console.log( "err:",err );
      console.log(request.params.id);
      let requestedPokemonId = request.params.id
      for( let i=0; i< obj.pokemon.length; i++){
        if( obj.pokemon[i].id === parseInt( requestedPokemonId )){
            foundPokemon = obj.pokemon[i];
            var foundPokemonIndex = i;
        }
      }
      if( foundPokemon ){

          jsonfile.writeFile(FILE, obj, function (err) {
              if (err) console.log("err:",err)
              obj.pokemon[foundPokemonIndex] = request.body;
              obj.pokemon[foundPokemonIndex].id = parseInt( obj.pokemon[foundPokemonIndex].id )
          });
          response.send('found');// render another page
          // response.render("changepokemon", {pokemon: foundPokemon});
      }
      else{
          response.send("That's not a pokemon");
      }
  });
  // response.render("editpokemon", {pokemon: foundPokemon});
});

app.post('/pokemon', (request, response) => {
  console.log("test");

  const obj = request.body;

  jsonfile.readFile(FILE, (err, obj) => {
    if(err) console.log("error: ", err);

    console.log(request.body);
    obj['pokemon'].push(request.body);

    jsonfile.writeFile(FILE , obj, (err) => {
      if(err) console.log("error: ", err);
    });
  });
  response.send(request.body);
});


//FINDS AND MATCHES ID
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

//NO DIRECTORY
app.get('/', (request, response) => {
  let html = "<html>";
  html += "<body><h1>Welcome to the online pokedex!</h1>";
  html += '<button method="POST" action="?sortby=name">Sort by Name</button>'
  html += "</body>"
  html += "</html>";
  response.send(html);
});

app.listen(3001, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));
