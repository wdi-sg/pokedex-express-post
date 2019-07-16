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

/**
 * ======================================================
 *             Route for default and search queries
 * ======================================================
 */
app.get('/', (request, response) => {

        jsonfile.readFile(FILE, (err, data) => {
            if( err ){
                console.log("error reading file");
                console.log(err);
            }
/**
 * ===================================
 * Global variables
 * ===================================
 */
            var pokemon = data.pokemon
            var pokemonCardList = "";
/**
 * ===================================
 * Functions
 * ===================================
 */
//Function to generate html page for response
            function generatePage(list) {
                var pokedexPage = `
                    <html>
                    <body style="text-align: center; background-color: black; color: yellow">
                    <img src="https://fontmeme.com/permalink/190715/f87c04db0b54e3b89caa3d1d3ee405fb.png">
                    <h1>Gotta catch'em all!</h1>

                    <form method="GET">

                    <p>Sort By:</p>
                    <select type="submit" name="sortby">
                        <option value="">Sort By</option>
                        <option value="name">Name</option>
                        <option value="weight">Weight</option>
                        <option value="height">Height</option>
                    </select>
                    <input type="submit" value="Sort">
                    </form>

                    <div class="pokemon-list">${list}</div>
                    </body>
                    </html>`;
                return pokedexPage;
            };

//Function to create pokemon card divs to display on page
            function createList(img,name,weight,height) {
                for (let i=0; i<pokemon.length; i++) {
                    console.log(pokemon[i].name)
                    pokemonCardList = `
                    ${pokemonCardList}
                    <div style="display:inline-block; text-align:center;">
                    <img style="display: block" src="${pokemon[i].img}">
                    <h3>${pokemon[i].name}</h3>
                    <p>Weight: ${pokemon[i].weight}</p>
                    <p>Height: ${pokemon[i].height}</p>
                    </div>`
                };

                return pokemonCardList;
            }
/**
 * ===================================
 * Search query results display
 * ===================================
 */
            if (request.query.sortby === "name") {
                pokemon.sort(function(a, b){
                    var nameA=a.name.toLowerCase(), nameB=b.name.toLowerCase()
                    if (nameA < nameB) //sort string ascending
                        return -1
                    if (nameA > nameB)
                        return 1
                    return 0 //default return value (no sorting)
                })
                createList();
                // console.log("yay sorting by name!");
                response.send(generatePage(pokemonCardList));
            }
            else if (request.query.sortby === "weight") {
                pokemon.sort(function(a, b) {
                    return parseFloat(a.weight)-parseFloat(b.weight);
                });
                createList();
                // console.log("yay sorting by weight!");
                response.send(generatePage(pokemonCardList));
            }
            else if (request.query.sortby === "height") {
                pokemon.sort(function(a, b) {
                    return parseFloat(a.height)-parseFloat(b.height);
                });
                createList();
                // console.log("yay sorting by height!");
                response.send(generatePage(pokemonCardList));
            }
            else {
                createList();
                // console.log("yay no sort!");
                response.send(generatePage(pokemonCardList));
            }
        });
})

/**
 * ======================================================
 *             Route for adding new pokemon
 * ======================================================
 */
app.get('/pokemon/new', (request, response) => {
    console.log("getting new pokemon form");

    jsonfile.readFile(FILE, (err, data) => {
    if( err ){
      console.log("error reading file");
      console.log(err)
    }

    let form = '';
    form = `
        <html>
        <body>
        <h1>New pokemon form</h1>
        <form method="POST" action="/pokemon">
        <p>id</p><input type="number" min="152" name="id" placeholder="id"/>
        <p>num</p><input name="num" placeholder="num"/>
        <p>name</p><input name="name" placeholder="name"/>
        <p>img</p><input name="img" placeholder="img href"/>
        <p>height</p><input name="height" placeholder="height"/>
        <p>weight</p><input name="weight" placeholder="weight"/>
        <input type="submit"/>
        </form>
        </body>
        </html>`;

    response.send(form);
    });
});


app.post('/pokemon', (request,response) => {

  console.log("posting pokemon");
  var newPokemon = request.body;
  console.log( newPokemon );

  // save in data file
  jsonfile.readFile(FILE, (err, data) => {
    if( err ){
      console.log("error reading file");
      console.log(err)
    }

    // console.log("what i currently have");
    // console.log(data.pokemon);

    // save data
    data.pokemon.push(newPokemon);
    // obj[key] = value;

    jsonfile.writeFile(FILE, data, (err) => {
      if( err ){
        console.log("error writing file");
        console.log(err)
        response.status(503).send("ERROR WRITING FILE");
      } else {
        console.log("write file successful");

        console.log( "send response");
        response.send("yes! new Pokemon added");
      }

    });
  });
  // console.log here will log before json write file thats why better // to put in write file function
  // console.log( "send response");
  // response.send("yes!");
});

// /**
//  * ======================================================
//  *             Route for getting by id
//  * ======================================================
//  */
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


/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));