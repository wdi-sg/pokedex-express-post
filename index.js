const express = require('express');
const jsonfile = require('jsonfile');

//file name
const FILE = 'pokedex.json';

/**
 * ===================================
 * Configurations and set up
 * ===================================
 */

// Init express app
const app = express();

//Views code
const reactEngine = require('express-react-views').createEngine();
app.engine('jsx', reactEngine);
app.set('views', __dirname + '/views');
app.set('view engine', 'jsx');

// tell your app to use the module
//need this for request.body
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

/**
 * ===================================
 * Routes
 * ===================================
 */


app.get('/', (request, response) => {
  response.render('home');
});


app.get('/pokemon/new',(request, response)=>{
    response.render('form');
})

const savePokemon = (request, response) =>{
    //your inputs
    let newPokemon = {};
    newPokemon['id'] = parseInt(request.body.id);
    newPokemon['num'] = request.body.num;
    newPokemon['name'] = request.body.name;
    newPokemon['img'] = request.body.img;
    newPokemon['height'] = request.body.height;
    newPokemon['weight'] = request.body.weight;
    newPokemon['candy'] = request.body.candy;
    newPokemon['candy_count'] = parseInt(request.body.candy_count);
    newPokemon['egg'] = request.body.egg;
    newPokemon['avg_spawns'] = parseInt(request.body.avg_spawns);
    newPokemon['spawn_time'] = request.body.spawn_time;

    jsonfile.readFile(FILE, (err, obj) => {
        response.send(newPokemon);
        obj.pokemon.push(newPokemon);

        jsonfile.writeFile(FILE, obj,  { spaces: 2 }, (err) => {
            console.log("err");
            // obj.pokemon.push(request.body);
        });
    });
};
app.post('/pokemon', savePokemon);

app.get('/pokemon/:id', (request, response) => {
  // get json from specified file
  jsonfile.readFile(FILE, (err, obj) => {
    // check to make sure the file was properly read
    if( err ){
      console.log("error with json read file:",err);
      response.status(503).send("error reading file");
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


app.get('/pokemon/:id/edit',(request, response) => {
    response.render('editform');
})

app.post('/pokemon/:id', (request, response) => {
    let newPokemon = {};
    newPokemon['id'] = parseInt(request.body.id);
    newPokemon['num'] = request.body.num;
    newPokemon['name'] = request.body.name;
    newPokemon['img'] = request.body.img;
    newPokemon['height'] = request.body.height;
    newPokemon['weight'] = request.body.weight;
    newPokemon['candy'] = request.body.candy;
    newPokemon['candy_count'] = parseInt(request.body.candy_count);
    newPokemon['egg'] = request.body.egg;
    newPokemon['avg_spawns'] = parseInt(request.body.avg_spawns);
    newPokemon['spawn_time'] = request.body.spawn_time;

    console.log(request.body.id);
    response.send(request.body);
    jsonfile.readFile(FILE, (err, obj) => {
        obj.pokemon.splice([request.body.id-1], 1, newPokemon);

        jsonfile.writeFile(FILE, obj, { spaces: 2 }, (err) => {
            console.log("err");
            // obj.pokemon.push(request.body);
        });
    });
});

app.get('/pokemon/:id/delete', (request, response) => {
    jsonfile.readFile(FILE, (err, obj) => {
        obj.pokemon.splice([request.body.id-1], 1);
        response.send(obj.pokemon);
        response.render('deletePokemon');

        jsonfile.writeFile(FILE, obj, { spaces: 2 }, (err) => {
            console.log("err");
            // obj.pokemon.push(request.body);
        });
    });
});

// app.post('/pokemon/:id', (request, response) => {


// });



/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));