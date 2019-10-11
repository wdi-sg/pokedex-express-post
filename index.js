NORRIS WAS HEREEEEE

const express = require('express');
const reactEngine = require('express-react-views');
const jsonfile = require('jsonfile');
const FILE = 'pokedex.json';
const methodOverride = require('method-override')


/**
 * ===================================
 * Configurations and set up
 * ===================================
 */

// Init express app
const app = express();

app.set('views', __dirname + '/views');
app.set('view engine', 'jsx');
app.engine('jsx', require('express-react-views').createEngine());
app.use(methodOverride('_method'));
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

/**
 * ===================================
 * Routes
 * ===================================
 */

app.get('/pokemon/new', (request, response) => {
  response.render ('new');
});

app.get('/pokemon/:id', (request, response) => {
  // get json from specified file
  jsonfile.readFile(FILE, (err, obj) => {
    let id = request.params.id;
    let pokemon;

    
    // obj is the object from the pokedex json file
    // extract input data from request
    // find pokemon by id from the pokedex json file
    for( let i=0; i<obj.pokemon.length; i++ ){

      let currentPokemon = obj.pokemon[i];

      if( currentPokemon.id == id ){

        pokemon = currentPokemon;
      }
    }

    const data = {
      pokemon: pokemon,
      id : id,
      pokedex: obj.pokemon[id]
    }
   
   
  
    if (pokemon === undefined) {
      // send 404 back
      response.status(404);
      response.send("not found");
    } else {
      console.log("found" + pokemon.name)
      response.render('show', data);
    
      
    }
  });
});

app.get('/pokemon', (request, response) => {
  jsonfile.readFile(FILE, (err, obj) => {
    data = {
      pokedex : obj.pokemon
    }
    response.render ('index', data);
  });
});

app.post('/pokemon', (request, response) => {
  // let keys = Object.keys(request.body);
  const body = request.body;
  let data = {
    body : body
  }
  // const empty = [];
  // keys.forEach((k) => {
  //   if (body[k] === "") {
  //     empty.push(k);
  //   }
  // });
  // if (empty.length > 0) {
  //   response.send(`${empty.join()} is/are required to be filled`);
  // } else {
  //   response.send(request.body);

    //debug code (output request body)
  console.log(body);
  jsonfile.readFile(FILE, (err, obj) => {
  obj.pokemon.push(request.body);
    // save the request body
    jsonfile.writeFile(FILE, obj, {spaces:2}, (err) => {
      console.error(err)
    });
  });
  response.render('create', data);
  // }
});

app.get('/pokemon/:id/edit', (request, response) => {
  let id = parseInt(request.params.id)-1;

  jsonfile.readFile(FILE, (err, obj) => {
    console.log(obj.pokemon[id]);
    const pokemon = obj.pokemon[id];

    const data = {
      id : id,
      pokemon : pokemon
    };
    response.render('edit', data);
  });
});

app.put('/pokemon/:id', (request, response) => {
  let id = parseInt(request.params.id)-1;
  let editedPokemon = request.body;
  console.log("wtf");
  jsonfile.readFile (FILE, (err, obj) => {
    obj.pokemon[id] = editedPokemon;
    jsonfile.writeFile(FILE, obj, {spaces:2}, (err) => {
      console.log(err);
    });
    // response.render(show);
    response.send("Pokemon edited");
  });
});

app.get('/pokemon/:id/delete', (request, response) => {
  let id = parseInt(request.params.id)-1;

  jsonfile.readFile(FILE, (err, obj) => {
    console.log(obj.pokemon[id]);
    const pokemon = obj.pokemon[id];

    const data = {
      id : id,
      pokemon : pokemon
    };
    response.render('delete', data);
  });
})

app.delete('/pokemon/:id', (request, response) => {
  let id = parseInt(request.params.id)-1;
  jsonfile.readFile (FILE, (err, obj) => {
    obj.pokemon.splice(id, 1);
    jsonfile.writeFile(FILE, obj, {space:2}, (err) => {
      console.log(err);
    });
    response.send("Pokemon deleted")
  })
})
/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));
