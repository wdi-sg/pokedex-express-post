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
        response.send(
                    `<html>
                        <body>
                            <p>His name is ` +pokemon.name+ `.</p>
                            <p>His ID is ` +pokemon.id+ `.</p>
                            <p>His number is ` +pokemon.num+ `.</p>
                            <p>Image: <img src = ` +pokemon.img+ `></p>
                            <p>His height is `+pokemon.height+ `.</p>
                            <p>He weighs ` +pokemon.weight+ `.</p>
                        </body>
                        </html>`
                    );
      }
    }

    if (pokemon === undefined) {

      // send 404 back
      response.status(404);
      response.send("not found");
    // } else {

    //   response.send(pokemon);
    }
  });
});

app.post('/pokemon', function(request, response) {

  //debug code (output request body)
  // console.log(request.body);
  // save the request body

    // console.error(err)
    // now look inside your json file
    response.send(pokedex);
      let newId = parseInt(request.body.id);
      let newNum = parseInt(request.body.num);
      let newName = request.body.name;
      let newImg = request.body.img;
      let newHeight = request.body.height;
      let newWeight = request.body.weight;

        newPokemon = {
          "id": newID,
          "num": newNum,
          "name": newName,
          "img": newImg,
          "height": newHeight,
          "weight": newWeight
        };

        obj.pokemon.push(newPokemon);
        jsonfile.writeFile(FILE, newPokemon, (err) => {
          if (err) { console.log(err) };
          console.log("New pokemon added!");
        });

})

app.get('/pokemon/new', (request, response) => {
  // render a template form here
  // response.send("hello world");
  let form = `<html>
                <body>
                    <form action="/pokemon" method="POST">
                        <input name="id" placeholder="New pokemon's ID"/><br>
                        <input name="num" placeholder="New pokemon's num"/><br>
                        <input name="name" placeholder="New pokemon's name"/><br>
                        <input name="img" placeholder="New pokemon's img"/><br>
                        <input name="height" placeholder="New Pokemon's height"/><br>
                        <input name="weight" placeholder="New pokemon's weight"/><br>
                        <input type="submit"/>
                    </form>
                </body>
                </html>`;
    response.send(form);
});

app.post(`/submit`, (request, response) => {
    submit
});

// app.get('/', (request, response) => {
//   response.send("yay");
// });

// app.post(`/pokemon`, (request, response) => {
//     submit
// });

/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));
