const express = require('express');
const jsonfile = require('jsonfile');
const file = 'pokedex.json';
const json = require('./pokedex.json');
const app = express();

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));


const reactEngine = require('express-react-views').createEngine();
app.engine('jsx', reactEngine);

app.set('views', __dirname + '/views');

app.set('view engine', 'jsx');

app.get('/', (request, response) => {

    // response.render('home');
    let pokemonList = JSON.stringify(json.pokemon, null, 2)
    response.send('<h1>Pokemon</h1>'+
                  '<form method="post" action="/pokemon/new">'+
                  'Create New Pokemon'+
                  '<input type="submit" value="Submit">'+
                  '</form>' +
                  '<h2> Search Pokemon</h2>'+
                  '<form method="post" action="/pokemon/search">'+
                  'ID:<input type="text" name="id">' +
                  '<input type="submit" value="Submit">' +
                  '<br>' +
                  'Name:<input type="text" name="name">' +
                  '<input type="submit" value="Submit">' +
                  '</form>' +
                  '<br>' +
                  `<img src="https://pics.me.me/via-9gag-com-14050435.png">`+
                  '<h2> LIST OF CURRENT POKEMON </h2>'+
                  '<form method="post" action="/pokemon/sort">' +
                  'SORT THAT THANG BY NAME! <input type="submit" value="submit">'+
                  '</form>'+
                  pokemonList
                  );

    // response.send(json.pokemon);
});

app.post('/pokemon/search', (request, response) => {
      // console.log(request.body);
      // response.send(request.body.id);
  let pokemonId = request.body.id;
  pokemonId = parseInt(pokemonId - 1);
  let pokemonName = request.body.name.toLowerCase();
  let pokemon = 0;
  for (i = 0; i < json.pokemon.length; i++) {
    if(json['pokemon'][i]['name'].toLowerCase() === pokemonName) {
         response.send(json.pokemon[i]);
    }
  }

  response.send(json.pokemon[pokemonId]);

  // console.log(pokemonName);
  // console.log(json.pokemon[0].name.toLowerCase())
// response.send(json.pokemon[pokemonId]);
  // console.log(pokemonId);

    // response.send(json.pokemon);
});

app.post('/pokemon/new', function(req, response) {
  //debug code (output request body)
      response.send('<h1>Pokemon</h1>'+
                  '<form method="post" action="/pokemon/new/creation">'+
                  'ID:<input type="text" name="id">'+
                  'Num:<input type="text" name="num">'+
                  'Name:<input type="text" name="name">'+
                  'IMG:<input type="text" name="img">'+
                  'Height:<input type="text" name="height">'+
                  'Weight:<input type="text" name="weight">'+
                  '<input type="submit" value="Submit">'+
                  '</form>');

});

app.post('/pokemon/new/creation', function(request, response) {
  //debug code (output request body)
    // let pokeStats = JSON.stringify(request.body);
    //   response.send("HELLO" + '<br>' + pokeStats);
    //   console.log(json.pokemon[150]);
    let pokeStats = request.body;
    response.send(pokeStats);
    json.pokemon.push(pokeStats);
    console.log(json.pokemon[json.pokemon.length-1]);


  jsonfile.writeFile(file, json, (err) => {
    console.log(err)
  });


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
  // res.send(body)
  // res.render('test', body)
  json.pokemon[pokeId].name = body[2];
  json.pokemon[pokeId].img = body[3];
  json.pokemon[pokeId].height = body[4];
  json.pokemon[pokeId].weight = body[5];

  console.log(pokeId);
  console.log(body);
  console.log(json.pokemon[pokeId]);
  res.render('home', pokemonStats);
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