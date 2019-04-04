const express = require('express');
const jsonfile = require('jsonfile');

const FILE = 'pokedex.json';

/**
 * ===================================
 * Configurations and set up
 * ===================================
 */

 // <select name="sortby">
 //            <option value="id" class="btn btn-primary">id</option>
 //            <option value="name" class="btn btn-primary">name</option>
 //            </select>

// Init express app
const app = express();

const methodOverride = require('method-override')
app.use(methodOverride('_method'));

//tell your app to use the module
app.use(express.json());

app.use(express.urlencoded({
  extended: true
}));

//use to serve static files using express, public folder created, any files within the folder will be accessed by express e.g style.css
app.use(express.static("public"))


// this line below, sets a layout look to your express project
const reactEngine = require('express-react-views').createEngine();
app.engine('jsx', reactEngine);

// this tells express where to look for the view files
app.set('views', __dirname + '/views');

// this line sets react to be the default view engine
app.set('view engine', 'jsx');


app.get('/hello', (request, response) => {

  response.render('hello');

});

/**
 * ===================================
 * Helper Functions
 * ===================================
 */

 var zeroPadding = function(input) {
    var inputString = input.toString();
    if(inputString.length == 1) {
        inputString = "00" + inputString;
        return inputString;
    } else if(inputString.length == 2) {
        inputString = "0" + inputString;
        return inputString;
    } else {
        return inputString;
    }
}

/**
 * ===================================
 * Routes
 * ===================================
 */

  app.get('/hello', function(request, response) {


    response.render('hello');

  });


 app.get('/', function(request, response) {

    if(request.query.sortby === undefined) {
        jsonfile.readFile(FILE, (err, obj) => {

            let allPokemonData = obj
            response.render("home", allPokemonData);

        });

        // <form>
        //     <select name="sortby">
        //     <option value="id">id</option>
        //     <option value="name">name</option>
        //     </select>
        //     <input type="submit" value="Sort">
        //     </form>


    } else if(request.query.sortby === "name") {
        jsonfile.readFile(FILE, (err, obj) => {
            let pokemonArray = [];
            let sortedPokemonArray = [];
            let pokemonString = "";

            for(let i=0; i<obj.pokemon.length; i++) {
                let pokemonObject = {};
                pokemonObject.id = obj.pokemon[i].id;
                pokemonObject.name = obj.pokemon[i].name;
                pokemonArray.push(pokemonObject);
            }
            pokemonArray.sort(function(a, b) {
             return a.name.toLowerCase().localeCompare(b.name.toLowerCase());
         });

            for(let i=0; i<pokemonArray.length; i++) {
                pokemonString = pokemonString + pokemonArray[i].id + ". " + pokemonArray[i].name + "<br>"
            }

            response.send(pokemonString);
        });

    } else if(request.query.sortby === "id") {
        jsonfile.readFile(FILE, (err, obj) => {
            let pokemonArray = [];
            let sortedPokemonArray = [];
            let pokemonString = "";

            for(let i=0; i<obj.pokemon.length; i++) {
                let pokemonObject = {};
                pokemonObject.id = obj.pokemon[i].id;
                pokemonObject.name = obj.pokemon[i].name;
                pokemonArray.push(pokemonObject);
            }
            pokemonArray.sort(function(a, b) {
             return a.id - b.id;
         });

            for(let i=0; i<pokemonArray.length; i++) {
                pokemonString = pokemonString + pokemonArray[i].id + ". " + pokemonArray[i].name + "<br>"
            }

            response.send(pokemonString);
        });

    }

});

 app.get('/pokemon/new', function(request, response) {

    response.render("new");

});


 app.post('/pokemon', function(request, response) {

    console.log(request.body);

    jsonfile.readFile(FILE, (err, obj) => {

       let newPokemon = request.body;

       newPokemon.id = obj.pokemon.length + 1;
       newPokemon.num = zeroPadding(obj.pokemon.length + 1);
       newPokemon.candy = "None ";
       newPokemon.candy_count = 0;
       newPokemon.egg = "Not in Eggs";
       newPokemon.avg_spawns = 0;
       newPokemon.spawn_time = "N/A";

       console.log(newPokemon);

       obj.pokemon.push(newPokemon);

       jsonfile.writeFile(FILE, obj, (err) => {

        var pokemonId = request.body.id;

        //refer to line 193-223
        response.redirect(`/pokemon/${pokemonId}`)

        console.log("JSON updated with new data!");
    });
   });

})

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



 app.get('/pokemon/:id/edit', (request, response) => {
    let pokemonId = parseInt(request.params.id);
    let pokemonIndex;

  // get json from specified file
  jsonfile.readFile(FILE, (err, obj) => {
    // obj is the object from the pokedex json file
    // extract input data from request

    if(pokemonIndex === -1) {
        response.status(404);
        response.send("not found");
    } else {

        for(let i=0; i<obj.pokemon.length; i++) {
            if(pokemonId === obj.pokemon[i].id) {
                pokemonIndex = i;
            }
        }
        const record = obj.pokemon[pokemonIndex];

        response.render("edit",{ recordKey: record, idKey: pokemonId} );

    }

});
});


 app.put('/pokemon/:id', (request, response) => {
    console.log("Hello");
    console.log( request.body );
    console.log( "this is request body:",request.body );

    let pokemonId = parseInt(request.params.id);
    let pokemonIndex;

    jsonfile.readFile(FILE, (err, obj) => {


       for(let i=0; i<obj.pokemon.length; i++) {
        if(pokemonId === obj.pokemon[i].id) {
            pokemonIndex = i;
        }
    }


    let originalPokemonName = obj.pokemon[pokemonIndex].name;

    // individually edit each value in the animal *object*
    obj.pokemon[pokemonIndex].num = request.body.num;
    obj.pokemon[pokemonIndex].name = request.body.name;
    obj.pokemon[pokemonIndex].img = request.body.img;
    obj.pokemon[pokemonIndex].height = request.body.height;
    obj.pokemon[pokemonIndex].weight = request.body.weight;
    obj.pokemon[pokemonIndex].candy = request.body.candy;
    obj.pokemon[pokemonIndex].candy_count = request.body.candy_count;
    obj.pokemon[pokemonIndex].egg = request.body.egg;
    obj.pokemon[pokemonIndex].avg_spawns = request.body.avg_spawns;
    obj.pokemon[pokemonIndex].spawn_time = request.body.spawn_time;


    // we dont need to reassign this, but lets be explicit about the change
    const changedObj = obj;

    jsonfile.writeFile(FILE, changedObj, (err) => {
      console.error(err)

      //refer to line 193-223
      response.redirect(`/pokemon/${pokemonId}`);
  });
});

});

 app.get('/pokemon/:id/delete',(request, response) => {

    let pokemonId = parseInt(request.params.id);
    let pokemonIndex;
    let idArray = [];

    jsonfile.readFile(FILE, (err, obj) => {
    // obj is the object from the pokedex json file
    // extract input data from request

    for(let i=0; i<obj.pokemon.length; i++) {
        idArray.push(obj.pokemon[i].id);
    }

    if(idArray.includes(pokemonId) === false) {
        response.status(404);
        response.send("not found");
        return;
    } else {

        for(let i=0; i<obj.pokemon.length; i++) {
            if(pokemonId === obj.pokemon[i].id) {
                pokemonIndex = i;
            }
        }

        const record = obj.pokemon[pokemonIndex];

        response.render("delete",{ recordKey: record, idKey: pokemonId} );
    }

});


});


 app.delete('/pokemon/:id', (request, response) => {

  let pokemonId = parseInt( request.params.id );
  let pokemonIndex;


  jsonfile.readFile(FILE, (err, obj) => {

   for(let i=0; i<obj.pokemon.length; i++) {
    if(pokemonId === obj.pokemon[i].id) {
        pokemonIndex = i;
    }
}

let originalPokemonName = obj.pokemon[pokemonIndex].name;

obj.pokemon.splice( pokemonIndex, 1);

const changedObj = obj;

jsonfile.writeFile(FILE, changedObj, (err) => {
  console.error(err)

  response.send("Pokemon " + originalPokemonName + " has been deleted!");
});
});


});

/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
 app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));