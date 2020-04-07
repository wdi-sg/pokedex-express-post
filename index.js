const express = require('express');
const jsonfile = require('jsonfile');

const file = 'pokedex.json';
const file2 = 'pokedex-2.json';

/**
 * ===================================
 * Configurations and set up
 * ===================================
 */

// Init express app
const app = express();



//ReactViews

const reactEngine = require('express-react-views').createEngine();

app.use(express.urlencoded({
  extended: true
}));

app.engine('jsx', reactEngine);

app.set('views', __dirname + '/views');

app.set('view engine', 'jsx');

app.get('/pokemon/new', (req, res) => {
    res.render('pokemon-new-form');
});

/**
 * ===================================
 * Routes
 * ===================================
 */

app.get('/pokemon/:id', (request, response) => {

  // get json from specified file
  jsonfile.readFile(file, (err, obj) => {

    // check to make sure the file was properly read
    if( err ){

      console.log("error with json read file:",err);
      response.status(503).send("error reading filee");
      return;
    }
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

app.post('/pokemon', (req, res) => {
    jsonfile.readFile(file, (err, obj) => {
        console.log(req.body);
        const newPokemon = {
            id: parseInt(req.body.id),
            num: req.body.num,
            name: req.body.name,
            img: req.body.img,
            height: req.body.height,
            weight: req.body.weight
        }

        obj.pokemon.push(newPokemon);

        jsonfile.writeFile(file, obj, (err) => {
            if (err) console.log(err);
        });
    })

    res.redirect('/');
})

app.get('/reset', (req, res) => {
    jsonfile.readFile(file2, (err, obj) => {
        jsonfile.writeFile(file, obj, (err) => {
            if (err) console.log(err)
        })
    })

    res.send(
        `<h2>Pokedex Reset!</h2><br>
        <a href="/">Back to Home</a>`
        );
})

app.get('/', (request, response) => {
  response.send(`
    <h1>POKEDEX</h1><br>
    <a href='/pokemon/new'>Create a new Pokemon!</a><br><br>
    <a href='/reset'>Reset to original Pokedex</a>
    `);
});

/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));