const express = require('express');
const handlebars = require('express-handlebars');
const jsonfile = require('jsonfile');
const bodyParser = require('body-parser')
const FILE = 'pokedex.json';

/**
 * ===================================
 * Configurations and set up
 * ===================================
 */

// Init express app
const app = express();

// Set handlebars to be the default view engine
app.engine('handlebars', handlebars.create().engine);
app.set('view engine', 'handlebars');
app.use(express.static('public'))
app.use(bodyParser.text());
app.use(bodyParser.urlencoded());

var newForm = (module, request, response, obj)=>{
  let context = {pokemons : obj.pokemon};
  response.render(module, context);
}


var homepage = (module, request, response, obj)=>{
  let context = {pokemons : obj.pokemon};
  if(!request.body){
    request.body.id = obj.pokemon[obj.pokemon.length-1].id +1
    request.body.num = request.body.id
    obj.pokemon.push(request.body);
    jsonfile.writeFileSync(FILE, obj, function (err) {
    })
    response.render(module, context);

  }
  else if(request.query.sortby == "name"){
    obj.pokemon.sort((a,b) =>{
      if (a.name < b.name)
        return -1;
      if (a.name > b.name)
        return 1;
      return 0;
    })
    response.render(module, context);

  }
  else{
    response.render(module, context);
  }
}

var names = (module, request, response, obj)=>{
  for(i=0;i<obj.pokemon.length;i++){
    if(obj.pokemon[i].name == request.params.data){
      var context = obj.pokemon[i];
    }
  }
  if(!context){
    var context = {notFound: true,
      request: request.params.data,
    };
  }
  response.render(module, context);
}

var pokemonTypes = (module, request, response, obj)=>{
  let listOfPokemons =[];
  for(i=0;i<obj.pokemon.length;i++){
    if(obj.pokemon[i].type.indexOf(request.params.data) !== -1 ){
      listOfPokemons.push(obj.pokemon[i]);
      var context = {listOfPokemons : listOfPokemons };
    }
  }
  if(!context){
    var context = {notFound: true,
      request: request.params.data,
    };
  }
  response.render(module, context);
}


var callFiles = (module, request, response)=>{
  jsonfile.readFile(FILE,(err, obj)=>{
    if(module == "home") { homepage(module, request, response, obj);  }
    else if(module == "names") { names(module, request, response, obj);  }
    else if(module == "type") { pokemonTypes(module, request, response, obj);  }
    else if(module == "new") { newForm(module, request, response, obj);  }
    else {  response.render("404");
  }
});
}

// var originalFunction = (request, response) => {
//   jsonfile.readFile(FILE, (err, obj) => {
//     // obj is the object from the pokedex json file
//     // extract input data from request
//     let inputId = request.params.id;

//     // find pokemon by id from the pokedex json file
//     // (note: find() is a built-in method of JavaScript arrays)
//     let pokemon = obj.pokemon.find((currentPokemon) => {
//       return currentPokemon.id === parseInt(inputId, 10);
//     });

//     if (pokemon === undefined) {
//       // send 404 back
//       response.render('404');
//     } else {
//       let context = {
//         pokemon: pokemon
//       };

//       // send html file back with pokemon's data
//       response.render('pokemon', context);
//     }
//   });
// }

/**
 * ===================================
 * Routes
 * ===================================
 */

// app.get('/:id', (request, response) => {
//   // get json from specified file
//   originalFunction(request, response);
// });

app.get('/:type', (request, response) => {
  // send response with some data (a string)
  callFiles(request.params.type, request, response);
});

app.get('/:type/:data', (request, response) => {
  // send response with some data (a string)
  callFiles(request.params.type, request, response);
});

app.get('/', (request, response) => {
  // send response with some data (a HTML file)
  callFiles("home", request, response);
});

app.post('/', (request, response) => {
  // send response with some data (a string)
  callFiles("home", request, response);

  // callFiles(request.params.type, request, response);
});
/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
 app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));
