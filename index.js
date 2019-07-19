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

const reactEngine = require('express-react-views').createEngine();
app.engine('jsx', reactEngine);
app.set('views', __dirname + '/views/');

app.set('view engine', 'jsx');

// Set up method-override for PUT and DELETE forms
const methodOverride = require('method-override')
app.use(methodOverride('_method'));

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
function createList(pokemon) {
    var pokemonCardList = "";
    for (let i=0; i<pokemon.length; i++) {
        // console.log(pokemon[i].name)
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
 * ==================================================
 *           To UPDATE TO REACT TEMPLATE
 * ==================================================
 */
app.get('/pokemon', (request, response) => {

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
            //var pokemonCardList =
/**
 * ===================================
 * Functions
 * ===================================
 */



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
                ;
                // console.log("yay sorting by name!");
                response.send(generatePage(createList(pokemon)));
            }
            else if (request.query.sortby === "weight") {
                pokemon.sort(function(a, b) {
                    return parseFloat(a.weight)-parseFloat(b.weight);
                });
                //createList();
                // console.log("yay sorting by weight!");
                response.send(generatePage(createList(pokemon)));
            }
            else if (request.query.sortby === "height") {
                pokemon.sort(function(a, b) {
                    return parseFloat(a.height)-parseFloat(b.height);
                });
                //createList();
                // console.log("yay sorting by height!");
                response.send(generatePage(createList(pokemon)));
            }
            else {
                 //var pokemonCardList = createList(pokemon);
                // console.log("yay no sort!");
                response.send(generatePage(createList(pokemon)));
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

    response.render('./pages/newPokemon')
    });
});


app.post('/pokemon', (request,response) => {

  // console.log("posting pokemon");
  var newPokemon = request.body;
  // console.log( newPokemon );

  // save in data file
  jsonfile.readFile(FILE, (err, data) => {
    if( err ){
      console.log("error reading file");
      console.log(err)
    }

    let pokemon = data.pokemon

    // save data
    pokemon.push(newPokemon);

    jsonfile.writeFile(FILE, data, (err) => {
      if( err ){
        console.log("error writing file");
        console.log(err)
        response.status(503).send("ERROR WRITING FILE");
      } else {
        // console.log("write file successful");
        // console.log( "send response");
        response.redirect('/pokemon');
      }

    });
  });
});



/**
 * ======================================================
 *         Route to show individual pokemon stats
 * ======================================================
 */

app.get('/pokemon/:id', (request, response)=>{
    // response.send(request.params.id);
    // return;

  jsonfile.readFile(FILE, (err, data)=>{

    let pokemonIndex = request.params.id;
    const pokemon = data.pokemon[pokemonIndex-1];

    const dataObj = {
      index: pokemonIndex,
      pokemonData : pokemon
    };

    response.render('./pages/pokemonStats', dataObj)
  });
});



// /**
//  * ======================================================
//  *             Route for adding new pokemon
//  * ======================================================
//  */
// app.get('/pokemon/new', (request, response) => {
//     console.log("getting new pokemon form");

//     jsonfile.readFile(FILE, (err, data) => {
//     if( err ){
//       console.log("error reading file");
//       console.log(err)
//     }

//     let pokemon = data.pokemon
//     let form = '';
//     form = `
//         <html>
//         <body style="text-align: center; background-color: black; color: yellow">
//         <img src="https://fontmeme.com/permalink/190715/f87c04db0b54e3b89caa3d1d3ee405fb.png">
//         <h1>Gotta catch'em all!</h1>
//         <h2>Add New Pokemon</h2>
//         <form method="POST" action="/pokemon">
//         <p>Pokemon ID</p><input type="number" value="${parseInt(pokemon[pokemon.length-1].id)+1}" name="id" placeholder="id"/>
//         <p>Pokemon Number</p><input type="number" value="${parseInt(pokemon[pokemon.length-1].id)+1}" name="num" placeholder="num"/>
//         <p>Pokemon Name</p><input name="name" placeholder="name"/>
//         <p>Pokemon Image Link</p><input name="img" placeholder="img href"/>
//         <p>Pokemon Height</p><input name="height" placeholder="height"/>
//         <p>Pokemon Weight</p><input name="weight" placeholder="weight"/><br><br>
//         <input type="submit" value="Add Pokemon"/>
//         </form>
//         </body>
//         </html>`;

//     // response.send(form);
//     response.render('./pages/newPokemon')
//     });
// });


// app.post('/pokemon', (request,response) => {

//   // console.log("posting pokemon");
//   var newPokemon = request.body;
//   // console.log( newPokemon );

//   // save in data file
//   jsonfile.readFile(FILE, (err, data) => {
//     if( err ){
//       console.log("error reading file");
//       console.log(err)
//     }

//     let pokemon = data.pokemon
//     let pokemonAddedPage = '';
//     pokemonAddedPage = `
//         <html>
//         <body style="text-align: center; background-color: black; color: yellow">
//         <img src="https://fontmeme.com/permalink/190715/f87c04db0b54e3b89caa3d1d3ee405fb.png">
//         <h1>Gotta catch'em all!</h1>
//         <h2>New Pokemon Added!</h2>`

//     // save data
//     pokemon.push(newPokemon);

//     jsonfile.writeFile(FILE, data, (err) => {
//       if( err ){
//         console.log("error writing file");
//         console.log(err)
//         response.status(503).send("ERROR WRITING FILE");
//       } else {
//         // console.log("write file successful");
//         // console.log( "send response");
//         response.send(pokemonAddedPage);
//       }

//     });
//   });
// });

/**
 * ======================================================
 *             Route for editing pokemon data
 * ======================================================
 */
app.get('/pokemon/:id/edit', (request, response) => {
    console.log("request params " + request.params.id);

    jsonfile.readFile(FILE, (err, data)=>{

    let pokemonIndex = parseInt(request.params.id);
    const pokemon = data.pokemon[pokemonIndex-1];

    const dataObj = {
      index: pokemonIndex,
      pokemonData : pokemon
    };

    response.render('./pages/editPokemon', dataObj);

    });

});


app.put('/pokemon/:id', (request, response)=>{

  console.log("REQUEST BODY");
  console.log( request.body);

  jsonfile.readFile(FILE, (err, data)=>{

    let pokemonIndex = request.params.id;
    //save data
    data.pokemon[pokemonIndex-1] = request.body;

    jsonfile.writeFile(FILE, data, (err)=>{
      // response.send("POKEMON EDITED");
    });

  });

  response.redirect('/pokemon');
});


/**
 * ======================================================
 *             Route for deleting pokemon data
 * ======================================================
 */
 app.get('/pokemon/:id/delete', (request, response)=>{

    jsonfile.readFile(FILE, (err, data)=>{

        let pokemonIndex = parseInt(request.params.id);
        const pokemon = data.pokemon[pokemonIndex-1];

        const dataObj = {
          index: pokemonIndex,
          pokemonData : pokemon
        };

        response.render('./pages/deletePokemon', dataObj);

    });

})


app.delete('/pokemon/:id', (request, response)=>{

  console.log("REQUEST BODY");
  console.log( request.body);

  jsonfile.readFile(FILE, (err, data)=>{

    let pokemonIndex = request.params.id;
    // data.pokemon[pokemonIndex-1] = request.body;

    let pokemon = data.pokemon
    // save data
    pokemon.splice(pokemonIndex-1,1);
    let counter = 1;
    for (i=0; i<pokemon.length; i++) {
        pokemon[i].id = counter;
        counter ++;
    }


    jsonfile.writeFile(FILE, data, (err)=>{
      // response.send("POKEMON EDITED");
    });

  });

  response.redirect('/pokemon');
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