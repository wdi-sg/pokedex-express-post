/**
 * ===================================
 * Configurations and set up START
 * ===================================
 */
const jsonfile = require('jsonfile');

const express = require('express');
const app = express();

const FILE = ('pokedex.json');

// Init express app
app.use(express.json());

app.use(express.urlencoded({
  extended: true
}));

// Set up method-override for PUT and DELETE forms
const methodOverride = require('method-override')
app.use(methodOverride('_method'));


// this line below, sets a layout look to your express project
const reactEngine = require('express-react-views').createEngine();
app.engine('jsx', reactEngine);

// this tells express where to look for the view files
app.set('views', __dirname + '/views');

// this line sets react to be the default view engine
app.set('view engine', 'jsx');
/**
 * ===================================
 * Configurations and set up END
 * ===================================
 */

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
            response.status(404);
            response.send("not found");
        } else {

            response.send(pokemon);
        }
    });
});
/**
 * ===================================
 * Create fields in form
 * ===================================
 */
// app.get('/pokemon/:id/edit', function(request, response) {
    //make text field
    // response.render('form.jsx');

    // response.send(
    //     '<form method="POST" action="/pokemon">' +

    //     '<h2>POKEMON INFORMATION</h2>' +
    //     '<br>' +
    //     'id:' +
    //     '<input type="text" name="id">' +
    //     '<br>' +
    //     'number:' +
    //     '<input type="text" name="num">' +
    //     '<br>' +
    //     'pokemon name:' +
    //     '<input type="text" name="name">' +
    //     '<br>' +
    //     'pokemon img:' +
    //     '<input type="text" name="img">' +
    //     '<br>' +
    //     'pokemon height:' +
    //     '<input type="text" name="height">' +
    //     '<br>' +
    //     'pokemon weight:' +
    //     '<input type="text" name="weight">' +
    //     '<br>' +
    //     '<input type="submit" value="Submit">' +
    //     '</form>'
    // );
// });

/**
 * ===================================
 * Generate existing data in field
 * ===================================
 */
app.get('/pokemon/:id/edit', (request, response)=>{

jsonfile.readFile('pokedex.json', (err, dataObj)=>{

    let pokemonIndex = parseInt(request.params.id)-1;
    const pokemon = dataObj.pokemon[pokemonIndex];

    const data = {
      index: pokemonIndex,
      pokemonData : pokemon
    };

    // console.log( data );

    response.render('editForm', data)
  });
});

app.put('/pokemon/:id/', (request, response)=>{

  jsonfile.readFile('pokedex.json', (err, dataObj)=>{

    let pokemonIndex = parseInt(request.params.id)-1;
    request.body.id = parseInt(request.body.id)
    dataObj.pokemon[pokemonIndex] = request.body;

    jsonfile.writeFile('pokedex.json', dataObj, (err)=>{
      // response.send("WOW WORKS");
      if(err) {
        console.log('err')
      } else {
          response.send('Your pokemon has successfully been edited');
      }

    });

  });

});
// app.post('/pokemon', function(request, response) {
//     jsonfile.readFile(FILE, (err, obj) => {
//         if (err) {
//             console.log(err)
//         }
//         let newPokemon = parseInt(request.body.id);
//         obj.pokemon.push(newPokemon);
//         jsonfile.writeFile(FILE, obj, (err) => {
//             console.log('done writing');
//             // now look inside your json file
//             response.send(newPokemon)
//         });
//     })
// });
/**
 * ===================================
 * If URL has no request, display list
 * ===================================
 */
app.get('/', (request, response) => {
    jsonfile.readFile(FILE, (err, obj) => {
        if(err){
            console.log(err)

        }
        else {
            let pokemonList = "";
            for (i = 0; i < obj.pokemon.length; i++) {
                pokemonList += `<p>${obj.pokemon[i].name}</p>`;
                // pokemonList += "<p>"+obj.pokemon[i].name+"</p>";
                //let name = "name: " + someone.name
            }

            response.send(pokemonList);
        }
    })
});


/**
 * ===================================
 * If URL has no request
 * ===================================
 */
app.get('/', (request, response) => {
    response.send("Don't give up!");
});

/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));