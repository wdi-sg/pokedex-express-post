
/**
 * ===================================
 * Configurations and set up
 * ===================================
 */

// Init express app
const express = require('express');
const app = express();

const jsonfile = require('jsonfile');
const FILE = 'pokedex.json';

// tell your app to use the module
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
 * Routes and Endpoints
 * ===================================
 */


app.get('/pokemon', (request, response) => {

    if (request.query.sortby === "name"){

        jsonfile.readFile(FILE, (err,obj) => {

            let pokemonArray = obj.pokemon;

            if (err) {
                console.log('there is an error');
                console.log(err);

            } else {

                let sortedArray = pokemonArray.sort((a,b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0));

                const pokemonData = {
                    pokemon : sortedArray,
                    status: "(Sorted By Name)"
                }

                response.render('index', pokemonData)
            }
        });

    } else if (request.query.sortby === "weight"){

        jsonfile.readFile(FILE, (err,obj) => {

            let pokemonArray = obj.pokemon;

            if (err) {
                console.log('there is an error');
                console.log(err);

            } else {

                let sortedArray = pokemonArray.sort( (a,b) => parseFloat(a.weight) - parseFloat(b.weight));

                const pokemonData = {
                    pokemon : sortedArray,
                    status : "(Sorted By Weight)"
                }

                response.render('index', pokemonData)
            }
        });

    } else if (request.query.sortby === "height"){

        jsonfile.readFile(FILE, (err,obj) => {

            let pokemonArray = obj.pokemon;

            if (err) {
                console.log('there is an error');
                console.log(err);

            } else {


                let sortedArray = pokemonArray.sort( (a,b) => parseFloat(a.height) - parseFloat(b.height));

                const pokemonData = {
                    pokemon : sortedArray,
                    status : "(Sorted By Height)"
                }

                response.render('index', pokemonData)
            }
        });

    } else {

        jsonfile.readFile(FILE, (err,obj) => {

            const pokemonData = obj;

            if (err){
              console.log("error reading file");
              console.log(err)
            }
            else {
                response.render('index', pokemonData)
            }
        });
    }
});


app.get('/pokemon/:id', (request, response) => {


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


// Expose a new endpoint that intercepts GET requests to /pokemon/new, which responds with a HTML page with a form that has these fields: id, num, name, img, height, and weight

app.get('/new', (request, response) => {

    jsonfile.readFile(FILE, (err,obj) => {

        const data = {
            arrayLength: obj.pokemon.length + 1
        }

        if (err){
          console.log("error reading file");
          console.log(err)
        }
        else {
            response.render('form', data)
        }

    });
});


app.post('/pokemon', (request,response) => {

    let pokemon = request.body;
    console.log(pokemon);
    pokemon.id = parseInt(pokemon.id);

    jsonfile.readFile(FILE, (err, obj) => {
        if( err ){
          console.log("error reading file");
          console.log(err)
        }

        // Save data to pokedex.json

        if (pokemon.id < obj.pokemon.length) {
            response.status(406).send(`Sorry but that ID is incorrect! Please use ID: ${obj.pokemon.length + 1}`);

        } else {

            obj.pokemon.push(pokemon);

            jsonfile.writeFile(FILE, obj, (err) => {

                if( err ) {
                    console.log("error writing file");
                    console.log(err)
                    response.status(503).send("no!");

                } else {
                    response.send(obj.pokemon);
                }
            });
        }
  });
});

app.get('/pokemon/:id/edit',(request, response)=>{

    jsonfile.readFile(FILE, (err,obj) => {

        let pokemonIndex = request.params.id
        const pokemon = obj.pokemon[pokemonIndex]

        const data = {
            index: pokemonIndex,
            pokemonData : pokemon
        }

        if (err){
          console.log("error reading file");
          console.log(err)
        }
        else {
            response.render('editForm', data)
        }

    });

});

app.put('/pokemon/:id', (request, response) =>{

    jsonfile.readFile(FILE, (err,obj) => {

        let pokemonIndex = request.params.id;
        let updatedObj = obj;
        updatedObj.pokemon[pokemonIndex] = request.body;
        updatedObj.pokemon[pokemonIndex].id = parseInt(updatedObj.pokemon[pokemonIndex].id);

        if (err){
          console.log("error reading file");
          console.log(err)
        }

        else {

            jsonfile.writeFile(FILE, updatedObj, (err) => {
                if (err) {
                    console.log('error reading file')
                    console.log(err)
                } else {
                    response.send('Pokemon updated!')
                    console.log(updatedObj.pokemon[pokemonIndex])
                }
            })
        }
    });
});




/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));

//