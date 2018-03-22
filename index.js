const express = require('express');
const handlebars = require('express-handlebars');
const jsonfile = require('jsonfile');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');

let sorted = true;
let sortedNum = false;

const FILE = 'pokedex.json';

/**
 * ===================================
 * Configurations and set up
 * ===================================
 */

// Init express app
const app = express();

// Set handlebars to be the default view engine
// app.engine('handlebars', handlebars.create().engine);
app.engine("handlebars", handlebars({ defaultLayout: "main" }));
app.set('view engine', 'handlebars');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static('public'));
app.use(methodOverride('_method'));

// read json file into memory
const pokedata = jsonfile.readFileSync(FILE);

// READ JSON file //hackish way, need to refactor

let largestID = 0;
let largestNum = 0;

for (i=0; i<pokedata.pokemon.length; i++) {
  if (parseInt(pokedata.pokemon[i].id) > largestID) {
    largestID = parseInt(pokedata.pokemon[i].id)
  }
  if (parseInt(pokedata.pokemon[i].num) > largestNum) {
    largestNum = parseInt(pokedata.pokemon[i].num)
  }
};

// update largest id and largest num
pokedata.largestId = largestID;
pokedata.largestNum = largestNum;

// jsonfile.writeFile(FILE, pokedata, {spaces: 2}, (error) => {
//   console.error(error)
// });

/**
 * ===================================
 * Routes
 * ===================================
 */

 // create new pokemon
 app.get('/new', (request, response) => {
   let content = {
     "largestID": largestID + 1,
     "largestNum": largestNum + 1
   };
   response.render('new', content);
   // response.send(pokedata);
 });

 app.get('/:id/edit', (request, response) => {
   let inputId = request.params.id;
   let pokemon = pokedata.pokemon.find((currentPokemon) => {
     return currentPokemon.id === parseInt(inputId, 10);
   })
   let context = {
     pokemon
   };
   // console.log(pokedata);
   // console.log(context);
   response.render('edit', context);
 });

 app.get('/home', (request, response) => {
   // console.log("home");
   // sort ID by defauly
   let sortBy = request.query.sortby || "";
   let objs = pokedata.pokemon.slice();
   // console.log(request.query.sortby, sorted);

   if (sortBy === "name") {
     objs.sort((a, b) => {
       if (a.name.toLowerCase() < b.name.toLowerCase())
         return (sorted ? -1 : 1);
       if (a.name.toLowerCase() > b.name.toLowerCase())
         return (sorted ? 1 : -1);
       return 0;
     });
     sorted = !sorted
   } else if (sortBy === "id") {
     objs.sort((a, b) => {
       if (a.id < b.id)
         return (sortedNum ? -1 : 1);
       if (a.id > b.id)
         return (sortedNum ? 1 : -1);
       return 0;
     });
       sortedNum = !sortedNum;
   };

   let content = { pokedex: objs };
   response.render('home2', content);
 });

 app.put('/:id', (request, response) => {
   // console.log(request.params);
   // console.log(request.body);
   let id = request.params.id;
   // findINDEX
   let pokemonPosition = pokedata.pokemon.findIndex((currentPokemon) => {
     return currentPokemon.id === parseInt(id);
   });

   console.log(pokemonPosition);
   // force id back to integer
   request.body.id = parseInt(request.body.id);
   pokedata.pokemon[pokemonPosition] = request.body;

   jsonfile.writeFile(FILE, pokedata, {spaces: 2}, (error) => {
     console.error(error)
   });
   response.send("pokemon edited!");
 });

 app.delete('/:id', (req, res) => {
   let id = req.params.id;
   let pokemonPosition = pokedata.pokemon.findIndex((currentPokemon) => {
     return currentPokemon.id === parseInt(id);
   });
   console.log(pokemonPosition);

   pokedata.pokemon.splice(pokemonPosition, 1);

   jsonfile.writeFile(FILE, pokedata, {spaces: 2}, (error) => {
     console.error(error)
   });
   res.redirect('home');

 });

app.get('/:id', (request, response) => {
  // get json from specified file
  jsonfile.readFile(FILE, (err, obj) => {
    // obj is the object from the pokedex json file
    // extract input data from request
    let inputId = request.params.id;

    // find pokemon by id from the pokedex json file
    // (note: find() is a built-in method of JavaScript arrays)
    let pokemon = obj.pokemon.find((currentPokemon) => {
      return currentPokemon.id === parseInt(inputId, 10);
    });

    if (pokemon === undefined) {
      // send 404 back
      response.render('404');
    } else {
      let context = {
        pokemon: pokemon
      };

      // send html file back with pokemon's data
      response.render('pokemon', context);
    }
  });
});

app.post('/', (request, response) => {

  pokedata.largestId++;
  pokedata.largestNum++;

  let pokeNum = pokedata.largestNum.toString();
  while (pokeNum.length < 3) {
    pokeNum = "0" + pokeNum;
  }
  let pokemon = {
    id: pokedata.largestId,
    num: pokeNum,
    name: request.body.name,
    img: request.body.img,
    height: request.body.height,
    weight: request.body.weight
  }
  pokedata.largestId++;
  pokedata.largestNum++;

  pokedata.pokemon.push(pokemon);

  jsonfile.writeFile(FILE, pokedata, {spaces: 2}, (error) => {
    console.error(error)
  });
  response.redirect("home");
});

app.get('/', (request, response) => {
  // sort ID by defauly
  let sortBy = request.query.sortby || "id";
  let objs = pokedata.pokemon.slice();
  // console.log(request.query.sortby, sorted);

  if (sortBy === "name") {
    objs.sort((a, b) => {
      if (a.name.toLowerCase() < b.name.toLowerCase())
        return (sorted ? -1 : 1);
      if (a.name.toLowerCase() > b.name.toLowerCase())
        return (sorted ? 1 : -1);
      return 0;
    });
    sorted = !sorted
  } else if (sortBy === "id") {
    objs.sort((a, b) => {
      if (a.id < b.id)
        return (sortedNum ? -1 : 1);
      if (a.id > b.id)
        return (sortedNum ? 1 : -1);
      return 0;
    });
      sortedNum = !sortedNum;
  };

  let content = { pokedex: objs };
  response.render('home', content);
});





/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));
