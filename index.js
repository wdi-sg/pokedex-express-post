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
  extended: true
}));
//What I did not do//
// app.get('/pokemon/new', (request, response)=>{


//   let  respond =  '<h1>Submit new Pokemon</h1>'+
//                   '<form method="POST" action="/pokemon">'+
//                   'Id:<input type="number" name="id" min="152" max="200">'+
//                   '<br>'+'<br>'+
//                   'Num:<input type="number" name="num" min="152" max="200">'+
//                   '<br>'+'<br>'+
//                   'Name:<input type="text" name="name">'+
//                   '<br>'+'<br>'+
//                   'Image:<input type="file" name="img" accept="image/*">'+
//                   '<br>'+'<br>'+
//                   'Height:<input type="text" name="height">'+
//                   '<br>'+'<br>'+
//                   'Weight:<input type="text" name="weight">'+
//                   '<br>'+'<br>'+
//                   '<input type="submit" value="Submit">'
//                   '</form>';

//   response.send(respond);
// })

app.post('/new/pokemon', function(request, response) {

  //debug code (output request body)
  console.log(request.body);


  // save the request body
  jsonfile.writeFile('data.json', request.body, (err) => {
    console.error(err)

    // now look inside your json file
    response.send(request.body);
  });
});




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

app.get('/', (request, response) => {
  response.send("yay");
// });

/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));

