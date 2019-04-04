const express = require('express');
const jsonfile = require('jsonfile');
const file = 'pokedex.json';
const json = require('./pokedex.json');
const app = express();

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
app.use(express.static('public'));



const reactEngine = require('express-react-views').createEngine();
app.engine('jsx', reactEngine);

app.set('views', __dirname + '/views');

app.set('view engine', 'jsx');

app.get('/', (req, res) => {

    let pokemonList = JSON.stringify(json.pokemon, null, 2)
    res.render('homepage')
});

app.post('/pokemon/searchid', (req, res) => {
  let pokemonId = req.body.id;
  pokemonId = parseInt(pokemonId - 1);
  let pokestat = json.pokemon[pokemonId];
  res.render('pokestat', pokestat);

});

app.post('/pokemon/searchname', (req, res) => {
      console.log(req.body);
  let pokemonName = req.body.name.toLowerCase();
  console.log(pokemonName);
  for (i = 0; i < json.pokemon.length; i++) {
    if(json.pokemon[i].name.toLowerCase() === pokemonName) {
        let pokestat = json.pokemon[i];
           res.render('pokestat', pokestat);
    }
  }

});

app.post('/pokemon/new/creation', function(req, res) {
  //debug code (output request body)
    res.send("HARRO");
    console.log(req.body);
    let pokeStats = (req.body);
    console.log(pokeStats);
    json.pokemon.push(pokeStats);
    console.log(json.pokemon[json.pokemon.length-1]);

      jsonfile.readFile(file, (err, obj) => {

  jsonfile.writeFile(file, json, (err) => {
    console.log(err)
  });
});

// not working???
});

app.post('/pokemon/sort', function(request, response) {

//Comparer Function
function GetSortOrder(prop) {
    return function(a, b) {
        if (a[prop] > b[prop]) {
            return 1;
        } else if (a[prop] < b[prop]) {
            return -1;
        }
        return 0;
    }
}
    response.send(json.pokemon.sort(GetSortOrder("name")));

});



app.get('/pokemon/:id/edit', (req, res) => {
  // running this will let express to run home.handlebars file in your views folder
  let pokeId = req.params.id;
  pokeId--;
  let pokemonStats = json.pokemon[pokeId];
  res.render('home', pokemonStats);
})


app.post('/pokemon/:id', (req, res) => {
  // running this will let express to run home.handlebars file in your views folder
  let body = req.body.id;
  let pokeId = req.body.id[0];
  pokeId--;
  let pokemonStats = json.pokemon[pokeId]
  // res.send(boxdy)
  // res.render('test', body)
  json.pokemon[pokeId].name = body[2];
  json.pokemon[pokeId].img = body[3];
  json.pokemon[pokeId].height = body[4];
  json.pokemon[pokeId].weight = body[5];

  console.log(pokeId);
  console.log(body);
  console.log(json.pokemon[pokeId]);
  res.render('pokemon', pokemonStats);
})


            // <input type="text" name="id" value={this.props.id}/> <br/>
            // <input type="text" name="id" value={this.props.num}/> <br/>
            // <input type="text" name="id" value={this.props.name}/> <br/>
            // <input type="text" name="id" value={this.props.img}/> <br/>
            // <input type="text" name="id" value={this.props.height}/> <br/>
            // <input type="text" name="id" value={this.props.weight}/> <br/>

app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));

// console.log(json.pokemon[0]);


app.get('/:id', (request, response) => {

  let pokeId = request.params.id;
  pokeId--;
  let pokemonStats = json.pokemon[pokeId];
  response.send(pokemonStats);


  // get json from specified file
  // jsonfile.readFile(FILE, (err, obj) => {
  //   // obj is the object from the pokedex json file
  //   // extract input data from request
  //   let inputId = parseInt( request.params.id );

  //   var pokemon;

  //   // find pokemon by id from the pokedex json file
  //   for( let i=0; i<obj.pokemon.length; i++ ){

  //     let currentPokemon = obj.pokemon[i];

  //     if( currentPokemon.id === inputId ){
  //       pokemon = currentPokemon;
  //     }
  //   }

  //   if (pokemon === undefined) {

  //     // send 404 back
  //     response.status(404);
  //     response.send("not found");
  //   } else {

  //     response.send(pokemon);
  //   }
  // });
});