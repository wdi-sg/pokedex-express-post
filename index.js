const express = require('express');
const handlebars = require('express-handlebars');
const jsonfile = require('jsonfile');
const bodyParser = require('body-parser');
let sorted = true;

const FILE = 'pokedex.json';

/**
 * ===================================
 * Configurations and set up
 * ===================================
 */

// Init express app
const app = express();

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
console.log("DONE");
// jsonfile.writeFile(FILE, pokedata, {spaces: 2}, (error) => {
//   console.error(error)
// });


// Set handlebars to be the default view engine
app.engine('handlebars', handlebars.create().engine);
app.set('view engine', 'handlebars');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static('public'))

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
  let pokemon = {
    id: pokedata.largestId + 1,
    num: pokedata.largestNum + 1,
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
  response.send("pokemon created");
});

app.get('/', (request, response) => {
  // sorting function
  function compare(a, b,) {
    if (a.name.toLowerCase() < b.name.toLowerCase())
      return (sorted ? -1 : 1);
    if (a.name.toLowerCase() > b.name.toLowerCase())
      return (sorted ? 1 : -1);
    return 0;
  }

  let objs = pokedata.pokemon.slice();
  console.log(request.query.sortby, sorted);

  if (request.query.sortby === "name") {
    objs.sort(compare);
    sorted = !sorted
  }

  let content = { pokedex: objs };
  response.render('home', content);
});


/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));
