const express = require('express');
const handlebars = require('express-handlebars');
const jsonfile = require('jsonfile');
const bodyParser = require('body-parser');

const FILE = 'pokedex.json';

/**
 * ===================================
 * Configurations and set up
 * ===================================
 */

// Init express app
const app = express();

// Set handlebars to be the default view engine
app.engine('handlebars', handlebars.create().engine);
app.set('view engine', 'handlebars');
app.use(express.static('public'))

//Add bodyparser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

/**
 * ===================================
 * Routes
 * ===================================
 */

/////// A GET request that displays a html form to add new pokemon//////
////////////////////////////////////////////////////////////////////////
 app.get('/new', (request, response) => {



   jsonfile.readFile(FILE, (err, obj) => {

    console.error(err)

    let pokemon = obj.pokemon;

    let newId = Number(obj.pokemon.length + 1);

    let newNum = Number(obj.pokemon.length + 1);

    let context = 
    {
      id: newId,
      num: newNum
    }

  response.render("home", context);

})
})
/////////////////A POST request to submit form data/////////////////////
////////////////////////////////////////////////////////////////////////
 app.post('/', function(request, response) {

  jsonfile.readFile(FILE, (err, obj) => {
    // obj is the object from the pokedex json file
    // extract input data from request
    obj.pokemon.push(request.body); 
    console.log(obj);
    
    jsonfile.writeFile(FILE, obj, (err) => {

      console.error(err)

        //This sends the request back to user

        response.send("posted");

      });

  })

})



 app.get('/:id', (request, response) => {
  // get json from specified file
  jsonfile.readFile(FILE, (err, obj) => {
    // obj is the object from the pokedex json file
    // extract input data from request
    let inputId = request.params.id;
    console.log("inputId", inputId);

    // find pokemon by id from the pokedex json file
    // (note: find() is a built-in method of JavaScript arrays)
    let pokemon = obj.pokemon.find((currentPokemon) => {
      return currentPokemon.id === parseInt(inputId, 10);
    });

    if (pokemon === undefined) {

      // send 404 back
      response.render('404');
    } else {
      let context = {
        pokemon: pokemon
      };

      // send html file back with pokemon's data
      response.render('pokemon', context);
    }
  });
});

////////////A GET request to add a sort by name button//////////////////
////////////////////////////////////////////////////////////////////////
 app.get('/', (request, response) => {

  jsonfile.readFile(FILE, (err, obj) => {

  let pokemon = obj.pokemon;

  if(request.query.sortby==="name"){
      pokemon.sort((a,b) => {
        if(a.name > b.name)
          return 1;
        else if (a.name < b.name)
          return -1;
        else return 0;
      });
    }

      if(request.query.sortby==="id"){
      pokemon.sort((a,b) => {
        if(a.id > b.id)
          return 1;
        else if (a.id < b.id)
          return -1;
        else return 0;
      });
    }

    response.render("pokemon", {pokemon: pokemon});

  })
//send the information to user

})

//  app.get('/', (request, response) => {

//   jsonfile.readFile(FILE, (err, obj) => {

//     let pokemon = obj.pokemon;
//     console.log(request.query);
//     if(request.query.sortby==="name"){
//       pokemon.sort((a,b) => {
//         if(a.name < b.name)
//           return 1;
//         else if (a.name < b.name)
//           return -1;
//         else return 0;
//       });
//     }

//   })
//   response.render("pokemon", {pokemon: pokemon});

// })


/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
 app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'))
