const express = require('express');
const jsonfile = require('jsonfile');
const app = express();
const FILE = 'pokedex.json';

//tell your app to use the module
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
/**
 * ===================================
 * Configurations and set up
 * ===================================
 */

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
 * Routes
 * ===================================
 */

// edit the data for a given pokemon
app.get('/pokemon/:id/edit', (request, response) => {
    let pokemonId = parseInt( request.params.id );
    let arrayIndex = (pokemonId - 1);

    jsonfile.readFile(FILE, (err, obj) => {
        const record = obj.pokemon[arrayIndex];
        // console.log(record);

        if (pokemonId === undefined) {
        // send 404 back
        response.status(404);
        response.send("not found");
        } else {
        // render form
        response.render('editpokemon', {action: `/pokemon/${pokemonId}?_method=PUT`, name: record.name, id: record.id, num: record.num, img: record.img, height: record.height, weight: record.weight, candy: record.candy, candy_count: record.candy_count, egg: record.egg, avg_spawns: record.avg_spawns, spawn_time: record.spawn_time});
        }
    });
});

app.put('/pokemon/:id', (request, response) => {
    console.log( "this is request body:",request.body );
    // get the current contents of the file
    jsonfile.readFile(FILE, (err, obj) => {

        // get the location in the array we are requesting
        let pokemonId = parseInt( request.params.id );
        let arrayIndex = (pokemonId - 1);

        // individually edit each value in the object
        obj.pokemon[arrayIndex].name = request.body.name;
        obj.pokemon[arrayIndex].img = request.body.img;
        obj.pokemon[arrayIndex].height = request.body.height;
        obj.pokemon[arrayIndex].weight = request.body.weight;
        obj.pokemon[arrayIndex].candy = request.body.candy;
        obj.pokemon[arrayIndex].candy_count = request.body.candy_count;
        obj.pokemon[arrayIndex].egg = request.body.egg;
        obj.pokemon[arrayIndex].avg_spawns = request.body.avg_spawns;
        obj.pokemon[arrayIndex].spawn_time = request.body.spawn_time;

        const changedObj = obj;

        jsonfile.writeFile(FILE, changedObj, (err) => {
            console.error(err)

            response.send(request.body);
        });
    });
});


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




 app.get('/pokemon/new', (request, response)=>{


  let respond =   '<form method="POST" action="/pokemon">'+
  'pokemon:<input type="text" name="name" placeholder="Pokemon name">'+
  '<input type="text" name="height" placeholder="Height">'+
  '<input type="text" name="weight" placeholder="Weight">'+
  '<input type="text" name="id" placeholder="id">'+ 
  '<input type="text" name="num" placeholder="Num">'+
  '<input type="text" name="img" placeholder="Img">'+
  '<input type="submit" value="Submit">'+
  '</form>';
  

  response.send(respond);
});

 app.post('/pokemon', function(request, response) {

  // we are recieving data
  console.log( "this is request body:", request.body );
  let newPokemon = request.body;
  newPokemon.id = parseInt(newPokemon.id, 10)

  jsonfile.readFile(FILE, (err, obj) => {
        // create new list item
        obj.pokemon.push(newPokemon);

        jsonfile.writeFile(FILE, obj, (err) => {
          if (err) { console.log(err) };
        });
      });
  response.send(newPokemon);
});
/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
 app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));
