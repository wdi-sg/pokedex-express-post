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

//function to add zeroes in front of 'num' input given by user
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

 //ignore this request handler, its for testing purposes
  app.get('/hello', function(request, response) {


    response.render('hello');

  });

//request handler for home url get request
 app.get('/', function(request, response) {

//if the url string is empty i.e (localhost:3000/), then render page "home.jsx"
    if(request.query.sortby === undefined) {
        jsonfile.readFile(FILE, (err, obj) => {

            let allPokemonData = obj

            // when you do this, the second argument is where you are setting the "props" field in home.jsx to contain allPokemonData i.e { key : value } - { pokeKey : allPokemonData }
            // response.render("home", { pokeKey: allPokemonData } );
            // response.render("home", { pokemon : [..] } );
            response.render("home", allPokemonData);



        });

//if the url string contains name in the sortby query, then render the "sortedname.jsx"
    } else if(request.query.sortby === "name") {
        jsonfile.readFile(FILE, (err, obj) => {

          //sort the pokemons by name in increasing order (a to z)
            obj.pokemon.sort(function(a,b) {
                return a.name.toLowerCase().localeCompare(b.name.toLowerCase());
            });

            //assign a variable to pass on to "sortedname.jsx"
            let sortedPokemonByName = obj;

                //render the "sortedname.jsx" page with data from the variable passed in
                response.render("sortedname", sortedPokemonByName);

        });

//if the url string contains id in the sortby query, then render the "sortedid.jsx"
    } else if(request.query.sortby === "id") {
        jsonfile.readFile(FILE, (err, obj) => {

         //sort the pokemons by id in increasing order (1,2,3...,151)
             obj.pokemon.sort(function(a, b) {
             return a.id - b.id;
         });

            //assign a variable to pass on to "sortedid.jsx"
            let sortedPokemonById = obj;

                //render the "sortedid.jsx" page with data from the variable passed in
                response.render("sortedid", sortedPokemonById);
        });

    }

});


//request handler for '/pokemon/new' url get request - new pokemon creation
 app.get('/pokemon/new', function(request, response) {

    //render the "new/jsx" page to user
    response.render("new");

});


//request handler for '/pokemon' url post request - route after creation of new pokemon
 app.post('/pokemon', function(request, response) {

    console.log(request.body);

//read the current content of the pokedex.json
    jsonfile.readFile(FILE, (err, obj) => {

        //create a variable to hold new pokemon to be created, assigned variable's fields with request.body (details entered in the new.jsx form)
       let newPokemon = request.body;

       //assigned certain variable's fields
       newPokemon.id = obj.pokemon.length + 1;
       newPokemon.num = zeroPadding(obj.pokemon.length + 1);
       newPokemon.candy = "None ";
       newPokemon.candy_count = 0;
       newPokemon.egg = "Not in Eggs";
       newPokemon.avg_spawns = 0;
       newPokemon.spawn_time = "N/A";

       console.log(newPokemon);

       //add new pokemon to the end of the array
       obj.pokemon.push(newPokemon);


       //write to the pokedex.json to add this new pokemon to the data file
       jsonfile.writeFile(FILE, obj, (err) => {

        //get the user's input for id from the form entered
        var pokemonId = request.body.id;

        //append the id value to the redirect url, this will redirect user to the newly created pokemon page after creation of the new pokemon
        response.redirect(`/pokemon/${pokemonId}`)

        console.log("JSON updated with new data!");
    });
   });

})

//request handler for '/pokemon/:id' get request - individual pokemon page
 app.get('/pokemon/:id', (request, response) => {

//read the current content of the pokedex.json
  jsonfile.readFile(FILE, (err, obj) => {

//create variable to hold the id value stated in the url
    let inputId = parseInt( request.params.id );

//variable to hold the current Pokemon to show user
    var pokemon;

    // find pokemon by id from the pokedex json file
    for( let i=0; i<obj.pokemon.length; i++ ){

      let currentPokemon = obj.pokemon[i];

      if( currentPokemon.id === inputId ){
        pokemon = currentPokemon;
    }
}

//if pokemon not found by id, then var pokemon would be undefined, send 404 and not found status
if (pokemon === undefined) {

      // send 404 back
      response.status(404);
      response.send("not found");
  } else {

    //when user arrive at /pokemon/:id, render them the view pokemon page which will show a pokemon details page which tallies with the input id in the url
      response.render("view", { pokemonKey: pokemon });
  }
});
});


//request handler for "/pokemon/:id/edit" get request - edit pokemon
 app.get('/pokemon/:id/edit', (request, response) => {

    //create var pokemonId to hold the id stated in url
    let pokemonId = parseInt(request.params.id);
    //declare a pokemonIndex var
    let pokemonIndex;

//read the current content of the pokedex.json
  jsonfile.readFile(FILE, (err, obj) => {

    //if the user enters 0 in the url for the :id, send 404 and not found
    if(pokemonId === 0) {
        response.status(404);
        response.send("not found");
    } else {

        //else search through the pokedex.json for a pokemon's id that matches the user's input for :id, when found, use the "i" value as the pokemonIndex
        for(let i=0; i<obj.pokemon.length; i++) {
            if(pokemonId === obj.pokemon[i].id) {
                pokemonIndex = i;
            }
        }

        //use pokemonIndex as the index to extract out the correct pokemon from the json and assign it to var record, to be passed to "edit.jsx"
        const record = obj.pokemon[pokemonIndex];

        //render the "edit.jsx" page, pass in the record and pokemonId as data objects arguments which will be set as the props field values for edit.jsx
        response.render("edit",{ recordKey: record, idKey: pokemonId} );

    }

});
});

//request handler for "/pokemon/:id" put request - edit pokemon
 app.put('/pokemon/:id', (request, response) => {
    //test
    console.log("Hello");
    console.log( request.body );
    console.log( "this is request body:",request.body );

     //create var pokemonId to hold the id stated in url
    let pokemonId = parseInt(request.params.id);

    //declare a pokemonIndex var
    let pokemonIndex;

    //read the current content of the pokedex.json
    jsonfile.readFile(FILE, (err, obj) => {

        // search through the pokedex.json for a pokemon's id that matches the user's input for :id, when found, use the "i" value as the pokemonIndex
       for(let i=0; i<obj.pokemon.length; i++) {
        if(pokemonId === obj.pokemon[i].id) {
            pokemonIndex = i;
        }
    }

    pokemon = obj.pokemon[pokemonIndex];


    // individually edit each value in the pokemon object with the user's inputs from the form in the edit.jsx page
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

//A much cleaner way to update the key value pairs of the json data
// Object.keys(obj.pokemon[pokemonIndex]).forEach(key => {
//     obj.pokemon[pokemonIndex][key] = request.body[key]
// })

    //assign obj to a var changedObj, obj has been updated with new fields values
    const changedObj = obj;

    // if(request.body.length === 0) - this is for validation check further exercise
    jsonfile.writeFile(FILE, changedObj, (err) => {
      console.error(err)

      //render the view pokemon page where the pokemon is the one where the user has just edited
      response.render("view", { pokemonKey: pokemon });
  });

// else(wrong) { - this is for validation check further exercise
//     response.render()
//     render him to line 223, in line 223 function (/pokemon/:id/edit, pass in the error messages to edit.jsx, in edit.jsx write out the logic for checking the invalid input
// }
});

});

//request handler for "/pokemon/:id/delete" get request - delete pokemon
 app.get('/pokemon/:id/delete',(request, response) => {

    //create var pokemonId to hold the id stated in url
    let pokemonId = parseInt(request.params.id);

    //declare a pokemonIndex variable
    let pokemonIndex;

    //declare an empty array called idArray
    let idArray = [];

    //read the current content of the pokedex.json
    jsonfile.readFile(FILE, (err, obj) => {

    //loop through the pokedex.json data and push in each and every id of each pokemon into the idArray
    for(let i=0; i<obj.pokemon.length; i++) {
        idArray.push(obj.pokemon[i].id);
    }

    //check if idArray contains the input id from user (pokemonId). If it cannot find the input id from user, then send them 404 and not found, else assign the pokemonIndex to be the matching iteration i when the user input id is found
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

        //using the pokemonIndex which contains the matching iteration i, look for that particular pokemon and assign it to a var record
        const record = obj.pokemon[pokemonIndex];

        //pass the record and pokemonId which will be set as the props field value for delete.jsx
        response.render("delete",{ recordKey: record, idKey: pokemonId} );
    }

});


});

//request handler for "/pokemon/:id" delete request - delete pokemon
 app.delete('/pokemon/:id', (request, response) => {

//assign the var pokemonId which will hold the user input id value (:id)
  let pokemonId = parseInt( request.params.id );

  //declare a var pokemonIndex which will be use for reference in the data array
  let pokemonIndex;

//read the current content of the pokedex.json
  jsonfile.readFile(FILE, (err, obj) => {

//loop through the pokedex.json to find the matching iteration i when the user input id is found, pokemonIndex will hold the matching iteration i
   for(let i=0; i<obj.pokemon.length; i++) {
    if(pokemonId === obj.pokemon[i].id) {
        pokemonIndex = i;
    }
}

//extract the original name of the pokemon which will be use later for sending back a message to the user after deletion is completed. Refer to line 400
let originalPokemonName = obj.pokemon[pokemonIndex].name;

//use the splice method to remove the selected pokemon from the data file, referencing the pokemonIndex to find where in the data array to delete the element
obj.pokemon.splice( pokemonIndex, 1);

//assign var changedObj with obj (pokedex.json) which has been updated, the selected pokemon element has been deleted
const changedObj = obj;

//write to the pokedex.json to implement this change to the data file (the selected pokemon element will now be removed)
jsonfile.writeFile(FILE, changedObj, (err) => {
  console.error(err)

  //send user a message to indicate that the selected pokemon has been deleted
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