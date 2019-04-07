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

//==============Delete================//

app.get('/pokemon/:id/delete', function(request, response) {


    let index = parseInt(request.params.id);
    console.log(index);

    jsonfile.readFile(FILE, (err, obj) => {

    let currMon = obj["pokemon"][index -1];

        response.render('delete', currMon);

  })

});

app.delete('/pokemon/:id', (request, response) => {


  jsonfile.readFile(FILE, (err, obj) => {

        let index = parseInt(request.params.id -1);
        console.log(index);
        obj["pokemon"].splice([index], 1)

        jsonfile.writeFile(FILE, obj, (err) => {
        console.log(err)
         });

    });

    response.render('home', obj);

});

//===================================//

//===============Edit================//

app.get('/pokemon/:id/edit', function(request, response) {

    let index = parseInt(request.params.id);

    jsonfile.readFile(FILE, (err, obj) => {

        //🌟🌟🌟🌟🌟
        //identify pokemon using request.p.id in the json file
        //retrieve the pokemon's actual index
        //then edit

    let thisMon = obj["pokemon"][index -1];

        response.render('edit', thisMon);

  })

});

app.put('/pokemon/:id', (request, response) => {
    console.log(request.body);
    response.render("view for pokemon (edited pokemon) goes here");


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

  jsonfile.readFile(FILE, (err, obj) => {

        let idAndNum = {
            "id": obj["pokemon"].length +1,
            "num": (obj["pokemon"].length +1).toString()
        }

        Object.assign(idAndNum, request.body);
        console.log(idAndNum);
        obj["pokemon"].push(idAndNum);

        response.render('home', obj);

     jsonfile.writeFile(FILE, obj, (err) => {
    console.log(err)
  });

  })

});

//===================================//

//===============New=================//


app.get('/pokemon/new', (request, response) => {

        response.render('new');

})

//==================================//

// Pokémon's desc page

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
      response.send("Pokémon not found");
    } else {

      response.send(pokemon);
    }
  });
});

app.get('/', (request, response) => {

// at the root route (GET request) `/` display a list of all the pokemons in the pokedex

    if (request.query.sortby === "name") {
        response.send("hi");
    } else {
        jsonfile.readFile(FILE, (err, obj) => {
            response.render('home', obj)
        })
    }

});



/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */

app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));