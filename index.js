const express = require('express');
const handlebars = require('express-handlebars');
const jsonfile = require('jsonfile');
const bodyParser = require("body-parser");

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

// tell your app to use the module
//PLEASE REMEMBER TO HOOK THIS IN!!!!!!!!
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

//tells app to initiate file service in folder "public" (used for css, etc)
app.use(express.static('public'))

/**
 * ===================================
 * Routes
 * ===================================
 */

//Solutions: trying out saving each action added to each request as a function, might prove to be easier to understand

//Save the current json file into a variable. Easier to manipulate
let currentJSON = {};

//Save current id count into a variable
var currentIdCount = 0;

function getCurrentJSON() {
  //read the json file
  jsonfile.readFile(FILE, (err, obj) => {
    //save the json file into a variable
    currentJSON = obj;
    //for each pokemon (each array in pokemon object), add to currentIdCount (to keep track of ID)
    obj.pokemon.forEach(() => {
      currentIdCount++;
    })
  })
}

//Write the currentJSON (after changes) into the pokedex.json file
function changeCurrentJSON() {
  jsonfile.writeFile(FILE, currentJSON, (err) => {
    console.log(err);
  })
}

//Starter
function listStatsById(request, response) {
  //for all listed pokemon
  for (let i = 0; i < currentJSON.pokemon.length; i++) {
    //if the id in the parameter matches the pokemon[i]
    if (currentJSON.pokemon[i].id == request.params.id) {
      //context is pokemon[i]
      let context = {
        pokemon: currentJSON.pokemon[i]
      };
      //render the pokemon.handlebars with this context
      response.render('pokemon', context);
      //if none of the id matches, return an error message
    };
  };
};


//Qn 1
//request, response parameters as per "complicated" style of writing
function returnFormPage(request, response) {

  let context = {
    idCount: currentIdCount,
    numCount: currentIdCount
  };
  //on calling this function, render the handlebars file "pokemonCreation"
  response.render("pokemonCreation", context);
};

//Qn 2 + 3
function submitFakeData(request, response) {
  //request.body refers to the data that was sent out. note this function is called on a post request
  //create a new object (easier to push into the array later)
  let newStats = {};
  //for all keys in the data that was sent out (it is always in key value pair)
  for (let stats in request.body) {
    //edit newStats to fit the format
    newStats[stats] = request.body[stats]
  }
  //push newStats into currentJSON
  currentJSON.pokemon.push(newStats)
  //call function to write newly changed JSON into the server
  changeCurrentJSON();
}


function goToHome(request, response) {
  //Qn 4 + 5
  //if parameter behind ?sortby = "name"
  if (request.query.sortby == "name") {
    //sort pokemon without changing json file
    let sortedPokemon = currentJSON.pokemon.sort(sortFunc);

    //context as an array of the objects
    let context = {
      nameList: sortedPokemon
    };
    //render the sorted page with the context
    response.render("sorted", context);

  } else {

    let context = {
      showPokemon: currentJSON.pokemon
    }
    //render the home page (to access the button)
    response.render("home", context);
  }
}

//creating a sorting function
function sortFunc(a, b) {

  const nameA = a["name"]
  const nameB = b["name"]

  let comparison = 0;

  if (nameA > nameB) {
    comparison = 1;
  } else if (nameA < nameB) {
    comparison = -1;
  }
  return comparison;
}


// //starter code, will rebuild in solution
// app.get('/:id', (request, response) => {
//   // get json from specified file
//   jsonfile.readFile(FILE, (err, obj) => {
//     // obj is the object from the pokedex json file
//     // extract input data from request
//     let inputId = request.params.id;

//     // find pokemon by id from the pokedex json file
//     // (note: find() is a built-in method of JavaScript arrays)
//     let pokemon = obj.pokemon.find((currentPokemon) => {
//       return currentPokemon.id === parseInt(inputId, 10);
//     });

//     if (pokemon === undefined) {
//       // send 404 back
//       response.render('404');
//     } else {
//       let context = {
//         pokemon: pokemon
//       };

//       // send html file back with pokemon's data
//       response.render('pokemon', context);
//     }
//   });
// });

getCurrentJSON();
//Situating the requests here makes it easier to sort by least specific to most specific.

app.get("/", goToHome);
// app.post("/", submitFakeData);
app.get("/new", returnFormPage);
app.get("/:id", listStatsById);

/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));