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

app.use(express.json());
app.use(express.urlencoded({
  extended:true
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

// app.get('/', (request, response) => {
//   response.send("yay");
// });

app.get('/?sortby=name', (request, response) => {
  jsonfile.readFile(FILE, (err, obj) => {
    let sortBy = '<form>'+'<select name="sortby">'+'</select>'+'<input type="submit" value="Submit">'+'</form>';
    if (request.query.sortby === 'name') {
    obj.pokemon.sort(function(a,b) {
      return a.name.toLowerCase().localecomapre(b.name.toLowerCase());
    });
    response.send(obj.pokemon);
    }
  })
})

app.get('/pokemon/new', (request, response) => {
  jsonfile.readFile(FILE, (err, obj) => {
    let oldId = obj.pokemon[obj.pokemon.length -1].id;
    let newId = oldId + 1;
    let newPokemon = '<h1>New pokemon found!</h1>' + '<form method="POST" action="/pokemon/added">'+
                          'ID:<input type="text" name="id" value="'+newId+'"><br>'+
                          'Number:<input type="text" name="num" value="'+newId+'"><br>'+
                          'Pokemon Name:<input type="text" name="name"><br>'+
                          'Image:<input type="text" name="img"><br>'+
                          'Height:<input type="text" name="hight" value="0.00 m"><br>'+
                          'Weight:<input type="text" name="weight" value="0.0 kg"><br>' +
                          '<input type="submit" value="Submit">'
                          '</form>';
    response.send(newPokemon);
  });
});

app.post('/pokemon/added',(request, response) => {
  jsonfile.readFile(FILE, (err, obj) => {
    let newId = parseInt(request.body.id);
    request.body.id = newId;
    obj.pokemon.push(request.body);
    jsonfile.writeFile(FILE, obj, (err) => {
      console.log(err);
      response.send(request.body);
    });
  });
})

/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));
