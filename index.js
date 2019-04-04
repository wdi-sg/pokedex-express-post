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

// Tell your app to use the module
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

// React
const reactEngine = require('express-react-views').createEngine();
app.engine('jsx', reactEngine);

// this tells express where to look for the view files
app.set('views', __dirname + '/views');

// this line sets react to be the default view engine
app.set('view engine', 'jsx');

// Method override

const methodOverride = require('method-override')
app.use(methodOverride('_method'));


/**
 * ===================================
 * Routes
 * ===================================
 */


app.get('/pokemon/:id/delete', function(request, response) {


    let index = parseInt(request.params.id);
    console.log(index);

    jsonfile.readFile(FILE, (err, obj) => {
    const pokemon = obj["pokemon"];
    //console.log(pokemon);

    let currMon = obj["pokemon"][index -1];

        response.render('delete', currMon);

  })

});

app.delete('/pokemon/:id', (request, response) => {
  response.send("thx for deleting");

  jsonfile.readFile(FILE, (err, obj) => {

        let index = parseInt(request.params.id -1);
        console.log(index);
        obj["pokemon"].splice([index], 1)

        jsonfile.writeFile(FILE, obj, (err) => {
        console.log(err)
         });
    });

});


app.get('/pokemon/:id/edit', function(request, response) {


    let index = parseInt(request.params.id);
    console.log(index);

    jsonfile.readFile(FILE, (err, obj) => {
    const pokemon = obj["pokemon"];
    //console.log(pokemon);

    let currMon = obj["pokemon"][index -1];

        response.render('edit', currMon);

  })

});

app.put('/pokemon/:id', (request, response) => {
    console.log(request.body);
    response.send("thx");


    jsonfile.readFile(FILE, (err, obj) => {

        let index = parseInt(request.params.id -1);
        console.log(index);
        obj["pokemon"][index]["id"] = parseInt(request.body.id);
        obj["pokemon"][index]["num"] = request.body.num;
        obj["pokemon"][index]["name"] = request.body.name;
        obj["pokemon"][index]["img"] = request.body.img;
        obj["pokemon"][index]["height"] = request.body.height;
        obj["pokemon"][index]["weight"] = request.body.weight;

        jsonfile.writeFile(FILE, obj, (err) => {
        console.log(err)
         });
    });
});

app.post('/pokemon', function(request, response) {

  //debug code (output request body)
  console.log(request.body);

  response.send("thx for ur submission");

  jsonfile.readFile(FILE, (err, obj) => {

        let idAndNum = {
            "id": obj["pokemon"].length +1,
            "num": (obj["pokemon"].length +1).toString()
        }

        Object.assign(idAndNum, request.body);
        console.log(idAndNum);
        obj["pokemon"].push(idAndNum);

     jsonfile.writeFile(FILE, obj, (err) => {
    console.log(err)
  });

  })

});

app.get('/pokemon', function(request, response) {


    jsonfile.readFile(FILE, (err, obj) => {


    response.render('home', obj);

    })
});



app.get('/pokemon/new', (request, response) => {


        response.render('newpokemon');

})


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

app.get('/', (request, response) => {


//at the root route (GET request) `/` display a list of all the pokemons in the pokedex


    var sort = `<form>
                <form method="GET" action="/?">
                <select name="sortby">
                    <option value="">--Please choose an option--</option>
                    <option value="name">Name</option>
                    <option value="id">Id</option>
                    <option value="num">Number</option>
                    <option value="weight">Weight</option>
                    <option value="height">Height</option>
                </select>
                <input type="submit" value="Submit">
            </form>`;

    var pokemonNames = [];

        jsonfile.readFile(FILE, (err, obj) => {

             for (var i = 0; i < obj["pokemon"].length; i++) {
            pokemonNames.push(obj["pokemon"][i]["name"]);

        }

        if (request.query.sortby === "name") {
            pokemonNames = pokemonNames.sort();
        }

        response.send(sort + pokemonNames.join(', '));

        });


    });


/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */

app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));