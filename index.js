console.log("about to require express");
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
console.log("done creating app");

// tell app to use the module
app.use(express.json());

app.use(express.urlencoded({
    extended: true
}));

// method-override
const methodOverride = require('method-override');
app.use(methodOverride('_method'));

// this line below, sets a layout look to your express project
const reactEngine = require('express-react-views').createEngine();
app.engine('jsx', reactEngine);

// this tells express where to look for the view files
app.set('views', __dirname + '/views');

// sets react to be the default view engine
app.set('view engine', 'jsx');


/**
 * ===================================
 * Routes
 * ===================================
 */


app.get('/', (request, response) => {
  //response.send("Welcome to the online Pokdex!");
  const nameArray = [];

  jsonfile.readFile(FILE, (err, obj) => {
    for (i = 0; i < obj["pokemon"].length; i++) {
        // cannot print here cause can only get one response? so if for loop means it has to keep responding?
        nameArray.push(obj["pokemon"][i]["name"]);
    }

    const nameArrayJoin = nameArray.join(", ")

    //response.send(nameArray);
    response.send('<html><h1>Welcome to the online Pokdex!</h1><body>'+nameArrayJoin+'<br><form method="GET" action="/sortby=name"><input type="submit" value="Sort"></form></body></html>')
  })   // end of / readfile
});  // end of / request

    /// sortby using query

app.get("/sortby=name", (request, response) => {
    nameArray.sort();
    console.log(nameArray);
/*      console.log( "request QUERY", request.query);*/
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

app.get('/pokemon/new', (request, response) => {
    let respond = '<h1>New Pokemon</h1>' +
                  '<form method="POST" action="/newPokemon">' +
                  'ID: <input type="text" name="id"><br><br>' +
                  'Num: <input type="text" name="num"><br><br>' +
                  'Name: <input type="text" name="name"><br><br>' +
                  'Image: <input type="text" name="img"><br><br>' +
                  'Height: <input type="text" name="height"><br><br>' +
                  'Weight: <input type="text" name="weight"><br><br>' +
                  '<input type="submit" value="Submit"><br><br>' +
                  '</form>';

    response.send(respond)
})

app.post('/newPokemon', (request, response) => {
    // receiving the data
    console.log("this is the request body: ",request.body);

    response.send(request.body)
    jsonfile.readFile(FILE, (err, obj) => {
        const pokemonArray = obj["pokemon"];

        pokemonArray.push(request.body);

        // save request body
        jsonfile.writeFile(FILE, obj, (err) => {
            console.log(err);
            response.send(obj);
        });


    })

})


app.get('/pokemon/:id/edit', (request, response) => {
    const pokemonId = parseInt(request.params.id);

    jsonfile.readFile(FILE, (err, obj) => {
        const pokemonName = obj["pokemon"][pokemonId-1]["name"]

        response.render('home', obj["pokemon"][pokemonId-1])


/*        let html = `<form method="POST" action="/putrequest?_method=put">
        <input name="id" type="text" value="${pokemonName}"/>
        <input type="submit" value="edit this" />
        </form>`;*/

       //response.send(pokemonName);

    }) // end of read file

})   // end of get pokemon id edit

app.put("/pokemon/:id", (request, response) => {
    console.log(request.body);

    jsonfile.readFile(FILE, (err, obj) => {
        let pokemonId = parseInt(request.params.id);

        let editedPokemon = obj["pokemon"][pokemonId-1];

        editedPokemon.name = request.body.name;
        editedPokemon.img = request.body.img;
        editedPokemon.height = request.body.height;
        editedPokemon.weight = request.body.weight;


        jsonfile.writeFile(FILE, editedPokemon, (err) => {
            console.error(err);

            response.send("Done editing");
        })

    }) // end of readfile
})  // end of put request


/*app.get("/pokemon/:id/delete", (request, response) => {
    let pokemonId = parseInt(request.params.id);

    let html = ``

})  // end of get delete*/
/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));