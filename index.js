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

// built-in path module so that we can link to the file
var path = require('path');

//Allows access to files in public folder
app.use(express.static('public'));

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
      response.status(404);
      response.send("not found");
    } else {

      response.send(pokemon);
    }
  });
});

//GET request to link to form.html
app.get('/pokemon/new', (request, response) => {
  response.sendFile(path.join(__dirname, '/public', 'form.html'))
});


//when the form is submitted, the input is POSTed
app.post('/pokemon', function(request, response) {
  
  //debug code (output request body)
  console.log(request.body);

  //reads Json file
  jsonfile.readFile('pokedex.json', (err,obj) => {
    
    let newPoke = {
            "id": request.body.id,
            "num": request.body.num,
            "name": request.body.name,
            "img": request.body.img,
            "height": request.body.height,
            "weight": request.body.weight,
    }
    
    //adds new object into pokemon's array
    obj.pokemon.push(newPoke)
    
    //to make sure var pokemon does not get overwritten
    let updatedPokedex = obj;

    //Updates Json file
    jsonfile.writeFile('pokedex.json', updatedPokedex, (err) => {

      response.send('pokemon added to pokedex!');

      });

  })
  


});


app.get('/', (request, response) => {
  response.send("yay");
});

/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));
