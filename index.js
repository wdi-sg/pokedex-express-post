const express = require('express');
const jsonfile = require('jsonfile');

const FILE = 'pokedex.json';
var pokemon;
var pokeIndex;
var pokemonArray;

jsonfile.readFile(FILE, (err, obj)=>{
  pokemonArray = obj['pokemon'];
})
/**
 * ===================================
 * Configurations and set up
 * ===================================
 */

// Init express app
const app = express();

// tell your app to use the module
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
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

app.get('/', (request, response) => {
  if(request.query.sortby === 'name'){
    sortBy(request, response);
  }
  else if (request.query.sortby == null){
    let html = "<html><body><h1>Select sorting criteria</h1><select name='sort' onchange='location=this.value'>";
    html+= "<option value=''>Sort by</option><option value='?sortby=name'>Name</option></select></body></html>";

    //html+= "<a href='?sortby=name'><button>Name</button></a></body></html>";
    response.send(html);
  }
})

function sortBy(request, response){
  var sortBy = request.query.sortby;
  console.log(request.query);
  var sortedArray;
  var pokemonNames = [];
  //sort by name
  if (sortBy === 'name'){
    for(let j=0;j<pokemonArray.length;j++){
      pokemonNames.push(pokemonArray[j].name);
    }
    //console.log(pokemonNames.sort());
    sortedArray = pokemonNames.sort();
  }
  let html = "<html><body><h1>Welcome to Pokedex!</h1><ul>";
  for(let i=0;i<sortedArray.length;i++){
    html+=`<li>${sortedArray[i]}</li>`;
  }
  response.send(html+"</body></html>");
}

app.get('/pokemon/new', (request, response) => {
  let html = "<html>";
  html += "<body>";
  html += '<form method="POST" action="/pokemon">';
  html += "Pokemon id:<br>";
  html += '<input type="text" name="id"><br>';
  html += 'num:<br>';
  html += '<input type="text" name="num"><br>';
  html += 'name:<br>';
  html += '<input type="text" name="name"><br>';
  html += 'img:<br>';
  html += '<input type="text" name="img"><br>';
  html += 'height:<br>';
  html += '<input type="text" name="height"><br>';  
  html += 'weight:<br>';
  html += '<input type="text" name="weight"><br>'; 
  html += '<input type="submit" value="Submit">';
  html += "</form>";
  html += "</body>";
  html += "</html>";

  response.send(html);
});

app.post('/pokemon', (request, response) => {
  //request.body will return an array of object from the form
  console.log(request.body);
  let file = 'pokedex.json';
  jsonfile.readFile(file, function(err, obj){
  
    pokemon = obj["pokemon"];
    var newPoke = request.body;
    //unique ID
    for(let i=0;i<pokemon.length;i++){
      if(pokemon[i].id==newPoke.id){
        newPoke.id = pokemon[pokemon.length-1].id+1;
        if(newPoke.id<10){
          newPoke.num = "00"+newPoke.id;
        }
        else if(newPoke.id>=10&&newPoke.id<100){
          newPoke.num="0"+newPoke.id;
        }
        else {
          newPoke.num = newPoke.id.toString();
        }
        break;
      }
    }
    pokemon.push(newPoke);
    //print out the last 5 items in pokemon
    console.log(pokemon.slice(Math.max(pokemon.length-5,1)));
    jsonfile.writeFile(file, obj, function(err){
      if (err) console.log("ERROR:",err);

      response.send(request.body);
    });

  })

})


/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));
