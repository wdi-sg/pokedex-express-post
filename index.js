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

// tell your app to use the module
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));




app.get('/pokemon/new', (request, response) => {

    let html = `<html><head><title>New Pokemon</title></head><body><form method="POST" action="/pokemon">Enter a new pokemon<input type="number" name="id" placeholder="Enter Id"><input type="text" name="num" placeholder="Enter number"><input type="text" name="name" placeholder="Enter Name"><input type="text" name="img" placeholder="Enter an image URL"><input type="text" name="height" placeholder="Enter a height"><input type="text" name="weight" placeholder="Enter a weight"><input type="submit" value="Submit"></form></body></html>`;
    response.send(html);

})

app.post('/pokemon', (request, response) => {

    response.send(request.body);

    jsonfile.readFile(FILE, (err, obj) => {

        let allPokemon = obj['pokemon'];
        let newPokemon = request.body;
        newPokemon['height'] += ` m`;
        newPokemon['weight'] += ` kg`;
        allPokemon.push(newPokemon);

        jsonfile.writeFile(FILE, obj, (err) =>{

            console.log(err);
        })

    })



})

app.get('/search', (request, response) => {

    jsonfile.readFile(FILE, (err, obj) => {

        var pokemonArray = obj['pokemon'];


        if (request.query.sortby === 'name') {

            let nameArray = [];
            let list = '';

            for (let i = 0; i < pokemonArray.length; i++) {

               nameArray.push(pokemonArray[i]['name']);

            }

            let sortedArray = nameArray.sort();
            sortedArray.forEach((element) => {

                list += `<li>${element}</li>`;

            });

            let html = `<html><body><h1>Sort By Name:</h1><ul>${list}</ul></body></html>`;
            response.send(html);

        } else if (request.query.sortby === 'id') {

            let list = '';

            for(let i = 0; i < pokemonArray.length; i++) {

                list += `<li>${pokemonArray[i]['name']}</li>`;
            }

            let html = `<html><body><h1>Sort By Id:</h1><ul>${list}</ul></body></html>`;
            response.send(html);

        } else if (request.query.sortby === 'height') {

            let list = '';

            let heightArray = [];

            for(let i = 0; i < pokemonArray.length; i++) {

                heightArray.push(pokemonArray[i]['height']);
            }

            let sortedArray = heightArray.sort();

            sortedArray.forEach((element) => {


                for(let i = 0; i < pokemonArray.length; i++) {


                    for (let key in pokemonArray[i]) {
                        //console.log(element);

                        if (pokemonArray[i]['key'] === element) {

                            list += `<li>${pokemonArray[i]['name']}</li>`;
                        }
                    }
                }

            });

            let html = `<html><body><h1>Sort By Height:</h1><ul>${list}</ul></body></html>`;
            response.send(html);

        } else if (request.query.sortby === 'weight') {



        }

    })


})

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

  let html = `<html><body><form action="/search"><select name="sortby"><option value="id">Sort By Id</option><option value="name">Sort By Name</option><option value="height">Sort By Height</option><option value="weight">Sort By Weight</option></select><input type="submit" value="Submit"></form></body></html>`;
  response.send(html);

});


/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));
