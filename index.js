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
//   jsonfile.readFile(FILE, (err, obj) => {
//     if (err) { console.log(err) };
    
//     let pokedex = `
//     <!DOCTYPE html>
//     <html lang="en">
//     <head><title>Pokedex</title></head>
//     <body>
//     </body>
//     </html>
//     `;
    
//     placeholder = [];

//     for(let i = 0; i < obj.pokemon.length; ++i){
//       let div = `<div>
//       ${obj.pokemon[i].img}
//       </div>`
//       placeholder.push(div);
//     }

//     console.log(placeholder)


//     jsonfile.writeFile(FILE, obj, (err) => {
//       response.send(pokedex)
//     });
//   });
//   response.send("yay");
// });

app.get('/pokemon/new', (request, response) => {
  let form = `
  <html>
  <body>
  <form action="/pokemon" method="POST">
    <label>ID</label><br>
    <input name="id"/><br>
    <label>Number</label><br>
    <input name="num"/><br>
    <label>Pokemon</label><br>
    <input name="name"/><br>
    <label>Image</label><br>
    <input name="img"/><br>
    <label>Height</label><br>
    <input name="height"/><br>
    <label>Weight</label><br>
    <input name="weight"/><br>
    <input type="submit"/>
  </form>
  </body>
  </html>
  `;
  response.send(form);
});

app.post('/pokemon', (request, response) => { 
  //request.body.id
  //request.body.num
  //request.body.name
  //request.body.img
  //request.body.height
  //request.body.weight
  
  jsonfile.readFile(FILE, (err, obj) => {
    if (err) { console.err(err) };

    let placeholder = {
      "id": request.body.id,
      "num": request.body.num,
      "name": request.body.name,
      "img": request.body.img,
      "height": request.body.height,
      "weight": request.body.weight,
    };

    obj.pokemon.push(placeholder)
    
    jsonfile.writeFile(FILE, obj, (err) => {
      response.send(request.body)
    });
  })
});

/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));
