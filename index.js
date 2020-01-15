const express = require('express');
const jsonfile = require('jsonfile');
const file = 'pokedex.json';

/**
 * ===================================
 * Configurations and set up
 * ===================================
 */

// Init express app
const app = express();

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


// Init Method-Override for PUT and DELETE
const methodOverride = require('method-override')
app.use(methodOverride('_method'));
/**
 * ===================================
 * Routes
 * ===================================
 */

app.post('/pokemon', (request, response) => {
  const newPokemon = request.body
  //check for missing input
  for (let [key, value] of Object.entries(newPokemon)) {
    if (!value) {
      let data = {
        missingKey: key
      }
      return response.render('new', data)
    }
  }



  jsonfile.readFile(file, (err, obj) => {
    // check to make sure the file was properly read
    if (err) {
      console.log("error with json read file:", err);
      response.status(503).send("error reading filee");
      return;
    }

    for (let [key, value] of Object.entries(newPokemon)) {
      console.log(key, value)
      for (let [keyObj, valueObj] of Object.entries(obj.pokemon)) {
        console.log(valueObj)
        if (key === "id" && parseInt(value) === valueObj.id) {
          console.log(key, value, keyObj, valueObj)
          let data = {
            double: "ID Already exists!"
          }
          return response.render('new', data)
        }
      }

    }

    intId = newPokemon.id

    newPokemon.id = parseInt(intId)
    obj.pokemon.push(newPokemon)

    jsonfile.writeFile(file, obj, (err) => {
      if (err) {
        console.log("error with json read file:", err);
        response.status(503).send("error reading filee");
        return;
      }
    })

    const names = []

    for (const pokemon of obj.pokemon) {
      names.push(pokemon.name)
    }

    const data = {
      pokemon: names
    }

    response.render('pokemon', data)
  })
})

app.get('/pokemon', (request, response) => {

  const names = []
  jsonfile.readFile(file, (err, obj) => {
    if (err) {
      console.log("error with json read file:", err);
      response.status(503).send("error reading filee");
      return;
    }

    for (const pokemon of obj.pokemon) {
      names.push(pokemon.name)
    }

    const data = {
      pokemon: names
    }

    response.render('pokemon', data)
  })
})

app.get('/pokemon/new', (request, response) => {

  response.render('new')
})

app.get('/pokemon/:id', (request, response) => {

  // get json from specified file
  jsonfile.readFile(file, (err, obj) => {

    // check to make sure the file was properly read
    if (err) {
      console.log("error with json read file:", err);
      response.status(503).send("error reading filee");
      return;
    }

    // obj is the object from the pokedex json file
    // extract input data from request
    let inputId = parseInt(request.params.id);

    var pokemon;

    // find pokemon by id from the pokedex json file
    for (let i = 0; i < obj.pokemon.length; i++) {

      let currentPokemon = obj.pokemon[i];

      if (currentPokemon.id === inputId) {
        pokemon = currentPokemon;
      }
    }

    if (pokemon === undefined) {
      // send 404 back
      response.render('404')
      // response.status(404);
      // response.send("not found");
    } else {
      response.render('id', pokemon)
    }
  });
});

app.get('/pokemon/:id/edit', (request, response)=>{

  jsonfile.readFile(file, (err,obj)=>{
    let id = request.params.id
    let data = obj.pokemon[id]

    response.render('edit', data)
  })
})

app.put('/pokemon/:id', (request,response)=>{
  let newData = request.body
  jsonfile.readFile(file, (err,obj)=>{

    let id = request.params.id
    Object.assign(obj.pokemon[id], newData)
    
    jsonfile.writeFile(file, obj, (err)=>{
      if (err){
        return console.log(err)
      }

    })

   response.send('<a href="/pokemon">Show all Pokemon</a>')
  })
})

app.get('/', (request, response) => {

  if (request.query.sortby === "name") {
    const names = []

    jsonfile.readFile(file, (err, obj) => {

      for (const pokemon of obj.pokemon) {
        names.push(pokemon.name)
      }

      names.sort(
        function (a, b) {
          if (a.toLowerCase() < b.toLowerCase()) {
            return -1;
          } else if (a.toLowerCase() > b.toLowerCase()) {
            return 1;
          } else {
            return 0;
          }
        }
      );

      const data = {
        pokemon: names
      }

      response.render('sorted', data)
    })

  } else {
    response.send("yay")
  }



});

/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));