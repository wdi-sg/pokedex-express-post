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
app.use(express.urlencoded(
{
  extended: true
}));


/**
 * ===================================
 * Routes
 * ===================================
 */

// app.get('/:id', (request, response) => {

//   // get json from specified file
//   jsonfile.readFile(FILE, (err, obj) => {
//     // obj is the object from the pokedex json file
//     // extract input data from request
//     let inputId = parseInt( request.params.id );

//     var pokemon;

//     // find pokemon by id from the pokedex json file
//     for( let i=0; i<obj.pokemon.length; i++ ){

//       let currentPokemon = obj.pokemon[i];

//       if( currentPokemon.id === inputId ){
//         pokemon = currentPokemon;
//       }
//     }

//     if (pokemon === undefined) {

//       // send 404 back
//       response.status(404);
//       response.send("not found");
//     } else {

//       response.send(pokemon);
//     }
//   });
// });

app.get('/', (request, response) => {
  response.send("yay");
});

app.get('/pokemon/new', (request, response) => {

    
    let html = "<html>";
    html += "<body>";
    html += '<form method="POST" action="/pokemon">';
    html += '<b> Pokemon Input </b> <input type="submit" value="Submit">';
    html += '<br><br>';
    html += '<br> IdNos: <input type="text" name="id"> <br>';
    html += '<br> Nos: <input type="text" name="num"> <br>';
    html += '<br> Name: <input type="text" name="name"> <br>';
    html += '<br> Image: <input type="text" name="img"> <br>';
    html += '<br> Height: <input type="text" name="height"> <br>';
    html += '<br> Weight: <input type="text" name="weight"> <br>';
    //html += '<input type="submit" value="Submit">';
    html += "</form>";
    html += "</body>";
    html += "</html>";

    response.send( html );
})

app.post('/pokemon', function(request, response) {

  //debug code (output request body)
  console.log(request.body);

  let file = 'pokedex.json';

  const obj = request.body;

  obj['id'] = parseInt(obj['id']);

  // save the request body
  jsonfile.readFile(file, (err, object) => 
  {
      console.log(object);
      object["pokemon"].push(request.body);


      jsonfile.writeFile(file, object, (err) => 
      {
        console.log(err)
      });
  });

  // jsonfile.writeFile('pokedex.json', request.body, (err) => {
  //   console.error(err)

  //   // now look inside your json file
  //   response.send(request.body);
  // });
});


/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));
