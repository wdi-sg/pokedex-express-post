// WEI ZHENG WAS HERE!

//presetup: express//
const express = require('express');
const app = express();
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));


//presetup: method override to allow puts//
const methodOverride = require('method-override')
app.use(methodOverride('_method'));

//presetup: Express react views and set it to look into views folder//
const reactEngine = require('express-react-views').createEngine();
app.engine('jsx', reactEngine);
app.set('views', __dirname + '/views');
app.set('view engine', 'jsx');

//presetup: jsonfile and set file to data.json
const jsonfile = require('jsonfile');
const file = 'pokedex.json';

app.post('/pokemon', (request, response) => {
  console.log("POSASJHDBASJHDB")
  console.log(request.body);
})

app.get('/pokemon/new', (request,response)=> {
  console.log("LOADED")
  response.send(`<form method="POST" action="/pokemon">ID:<input type="text" name="id"><input type="submit" value="submit"></form>`);
});

app.get('/pokemon/:id', (request, response) => {
  jsonfile.readFile(FILE, (err, obj) => {
    if( err ){
      console.log("error with json read file:",err);
      response.status(503).send("error reading filee");
      return; 
    }
    let inputId = parseInt( request.params.id );
    var pokemon;
    for( let i=0; i<obj.pokemon.length; i++ ){
      let currentPokemon = obj.pokemon[i];
      if( currentPokemon.id === inputId ){
        pokemon = currentPokemon;
      }
    }
    if (pokemon === undefined) {
      response.status(404);
      response.send("not found");
    } else {
      response.send(pokemon);
    }
  });
});

app.get('/', (request, response) => {
  response.send("yay");
});

app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));
