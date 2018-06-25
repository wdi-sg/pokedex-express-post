const express = require('express');
const jsonfile = require('jsonfile');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const path = require('path');

const FILE = 'pokedex.json';

/**
 * ===================================
 * Configurations and set up
 * ===================================
 */

// Init express app
const app = express();

// using installed packages
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(methodOverride("_method"));

// use static files in public folder
app.use(express.static("public"));

/**
 * ===================================
 * Routes
 * ===================================
 */

app.get('/:id', (request, response) => {


  // get json from specified file
  jsonfile.readFile(FILE, (err, obj) => {


    console.log(obj);

    // obj is the object from the pokedex json file
    // extract input data from request
    let inputId = request.params.id;


    // find pokemon by id from the pokedex json file
    // (note: find() is a built-in method of JavaScript arrays)
    let pokemon = obj.pokemon.find((currentPokemon) => {
      return currentPokemon.id === parseInt(inputId, 10);
    });

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
  // response.send("yay");
  response.sendFile(path.join(__dirname + '/public/index.html'));
});

/**
 * ===================================
 * Unfinished Business
 * ===================================
 */

// app.get('/?sortby=/:name', (req, res) => {
  
//   jsonfile.readFile(FILE, (err, obj) => {
    
//     let sortBy = req.query.sortby;
//     console.log(sortBy);

//     // get list of pokemon, push them into array and sort them by names
//     let pokemon = obj.pokemon;
//     let sorted = [];
//     pokemon.forEach(el => {
//       sorted.push(el.sortBy);
//     });
//     sorted.sort();

//     // create list items to be placed in html page
//     let ulContent = "";
//     sorted.forEach(el => {
//       let listItem = "<li>" + el + "</li>";
//     })

//     res.send("<html><body><h1>Pokemon List Sorted By Names</h1><ul>" + ulContent +
//     "</ul></body></html>");

//   });

// });

app.get('/pokemon/new', (req, res) => {

  // create and send html form to get input from user
  res.sendFile(path.join(__dirname + "/public/new.html"));

});

/**
 * ===================================
 * Post
 * ===================================
 */

// app.post('/pokemon/', (req, res) => {

//   jsonfile.readFile(FILE, (err, obj) => {
    
//     // assign all details to the new pokemon object
//     let id = req.body.id,
//     num = req.body.num,
//     name = req.body.name,
//     img = req.body.img,
//     ht = req.body.height,
//     wt = req.body.weight,
//     newPokemon = {
//       "id": parseInt(id, 10),
//       "num": num,
//       "name": name,
//       "img": img,
//       "height": ht,
//       "weight": wt
//     };

//     // push new pokemon object into pokedex.json pokemon array
//     obj.pokemon.push(newPokemon);
//     jsonfile.writeFile(FILE, obj, err => {
//       console.log(err);
//       res.send(newPokemon);
//     })

//   });
  
// });

/**
 * ===================================
 * Put
 * ===================================
 */

app.put('/pokemon/', (req, res) => {

  jsonfile.readFile(FILE, (err, obj) => {

    // assign all details to the new pokemon object
    let id = req.body.id,
    num = req.body.num,
    name = req.body.name,
    img = req.body.img,
    ht = req.body.height,
    wt = req.body.weight,
    newPokemon = {
      "id": parseInt(id, 10),
      "num": num,
      "name": name,
      "img": img,
      "height": ht,
      "weight": wt
    };

    // add in new pokemon
    obj.pokemon.push(newPokemon);

    jsonfile.writeFile(FILE, obj, err => {
      console.log(err);
      res.send(newPokemon);
    })
  });

});

app.delete('/pokemon/', (req, res) => {

  jsonfile.readFile(FILE, (err, obj) => {
    
    let name = req.body.delName,
    pokemon = obj.pokemon;
    pokemon.forEach(el => {
      if (el.name.toLowerCase() === name.toLowerCase()) {
        let index = parseInt(el.id, 10) - 1;
        obj.pokemon.splice(index, 1);
        return;
      }
    });

    jsonfile.writeFile(FILE, obj, err => {
      console.log(err);
      res.send(pokemon);
    });

  });

});

/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));
