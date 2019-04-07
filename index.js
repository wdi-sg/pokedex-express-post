//Swee Chin's work:
//https://github.com/wdi-sg/pokedex-express-post/blob/b5dd03d949531d682955e20ca927ba12c980a8d8/index.js
// http://expressjs.com/en/api.html#req.query

const express = require('express');
const jsonfile = require('jsonfile');
const methodOverride = require('method-override') //so that we can use 'PUT' and 'DELETE' in express, but the form button's method has to be 'POST'
const FILE = 'pokedex.json';

/**
 * ===================================
 * Configurations and set up
 * ===================================
 */

// Init express app
const app = express();
// tell your app to use the module
app.use(express.json());
app.use(express.urlencoded({ //use this so that we can do request.body later
  extended: true
}));
app.use(methodOverride('_method')); // from using methodOverride above

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

 //Expose a new endpoint that intercepts GET requests to /pokemon/new, which responds with a HTML page with a form that has these fields: id, num, name, img, height, and weight
 app.get('/pokemon/new', (request, response) => {//this 'pokemon/new' currently is directing towards ''/pokemon/:id'

   response.render('new');
 });

 //Expose a new endpoint that accepts POST requests to /pokemon, which parses the form data and saves the new pokemon data into pokedex.json
 app.post('/pokemon', (request, response)=>{
  //for testing purposes, I console log out stuff here...
   console.log("this is request body.id: "+request.body.id);
   console.log("this is request body.num: "+request.body.num);
   console.log("this is request body.name: "+request.body.name);
   let newPokemon = request.body;
   console.log("Printing out newPokemon.id: "+newPokemon.id);
   console.log("Printing out newPokemon.num: "+newPokemon.num);
   console.log("Printing out newPokemon.name: "+newPokemon.name);
   //read the data in the file first before pushing the new pokemon data
   jsonfile.readFile(FILE, (err, obj) => {
       if (err) console.error(err);
       obj.pokemon.push(newPokemon);


       // we dont need to reassign this, but lets be explicit about the change
       let changedObj = obj;
       //write file
       jsonfile.writeFile(FILE, changedObj, { spaces: 2 }, (err) => {
           if (err) console.error(err);
           console.log("Printing out changedObj.pokemon: "+changedObj.pokemon);
           let pokeList = changedObj.pokemon;
           console.log("Printing out pokeList: "+pokeList);
           response.render('home', {respondKey: pokeList});
       });
   });
 });

app.get('/pokemon/:id', (request, response) => {
  let pokemonId = parseInt( request.params.id);
  let selectedPokemonIndex;

  console.log("printing out pokemonId: "+pokemonId);
  // get json from specified file
  jsonfile.readFile(FILE, (err, obj) => {
    if (err) console.error(err);
    // obj is the object from the pokedex json file
    // extract input data from request
    for (let i = 0; i < obj.pokemon.length; i++) {
        if (pokemonId == obj.pokemon[i].id) {
            selectedPokemonIndex = i;
        }
    }
    console.log("printing out selected pokemon index: "+selectedPokemonIndex);
    let respond = obj.pokemon[selectedPokemonIndex];

      response.render('single', respond);
    });
  });



//Point the form to submit data to the (/pokemon) route using POST method;
// app.post('/pokemon', (request, response) => {
//   // we are recieving data
//   console.log("this is request body:",request.body);
//   // save the request body
//   jsonfile.writeFile('data.json', request.body, (err) => {
//     console.error(err)
//     console.log(request.body);
//     // now look inside your json file
//     response.send(request.body);
//   });
// });

//at the root route (GET request) / display a list of all the pokemons in the pokedex
//but this time we want to do a rendering with react engine to a home.jsx file.
app.get('/', (request, response)=>{
  jsonfile.readFile(FILE, (err, obj) => {
    console.log("Begin reading file");
    let pokeList = obj.pokemon;

    response.render('home', {respondKey: pokeList});
  })
})



// //this was the old version of creating a list of pokemon in the root pokedex directory...
// app.get('/', (request, response) => {
//   jsonfile.readFile(FILE, (err, obj) => {
//     console.log("Begin reading file");
//     let array = [];
//     let string = "";
//     for (let i =0; i<obj.pokemon.length; i++){
//       console.log(obj.pokemon[i].name);
//       array.push(obj.pokemon[i].name); ////ideally should try to put each pokemon id, num and name into an object with three pairs of key-values. Then each pokemon details will be an object element in the array.
//     }
//     console.error(err);
//     console.table(array);
//     for (i in array){
//       string = string + array[i] + '<br>'+ " ";
//     }
//     let respond = string;
//     console.log(respond);
//     response.send(`${respond}`);
//     console.log("End reading file");
//   });
// });


// app.get('/', (request, response) => {
//   response.send("yay");
// });

//technically, supposed to do the sort button, under the further sections...
//end of Pokedex-express-post Part 1

//beginning of Pokedex-express-post part 2
//this is just for testing, and it works...

// app.get('/pokemon/:id/edit', (request, response)=>{
//   let respond = '<form method="GET" action ="/animals">'+
//                 'Animal Name: <input type = "text" name ="animalname">'+
//                 '<input type ="submit" value ="Submit">'+
//                 '</form>';
//   response.send(respond);
// });

app.get('/pokemon/:id/edit', (request, response)=>{
  let pokemonId = parseInt(request.params.id);
  // let arrayIndex = parseInt(request.params.id)-1; //because say Bulbasaur is id of 1, but index of zero in the array
  let selectedPokemonIndex;
  jsonfile.readFile(FILE, (err, obj) => {

    for (let i = 0; i < obj.pokemon.length; i++) {
        if (pokemonId == obj.pokemon[i].id) {
            selectedPokemonIndex = i;
        };
    };

  let respond = obj.pokemon[selectedPokemonIndex];

  response.render('edit',{respondKey: respond, idKey: pokemonId});
  });
});

app.put('/pokemon/:id', (request, response)=>{
  // we are recieving data
  //the request.body.num; THIS 'num' must match the property name that you assigned in the edit.jsx
  console.log("this is request body:",request.body);
  let pokemonId = parseInt(request.params.id);
  let selectedPokemonIndex;
  console.log("printing out the idKey: "+pokemonId)
  jsonfile.readFile(FILE, (err, obj) => {
      if (err) console.error(err);
      for (let i = 0; i < obj.pokemon.length; i++) {
          if (pokemonId == parseInt(obj.pokemon[i].id)){
              selectedPokemonIndex = parseInt(i);
          }
        }
      console.log("printing out selectedPokemonIndex: "+selectedPokemonIndex);
      console.log("Printing out obj.pokemon: "+obj.pokemon);
      console.log("Printing out selectedPokemonIndex: "+obj.pokemon[selectedPokemonIndex]);
      console.log("Printing out selectedPokemonIndex.num: "+obj.pokemon[selectedPokemonIndex].num);
      console.log("printing out request.body.num: "+request.body.num);
      obj.pokemon[selectedPokemonIndex].num = request.body.num;
      obj.pokemon[selectedPokemonIndex].name = request.body.name;
      obj.pokemon[selectedPokemonIndex].img = request.body.img;
      obj.pokemon[selectedPokemonIndex].height = request.body.height;
      obj.pokemon[selectedPokemonIndex].weight = request.body.weight;
      obj.pokemon[selectedPokemonIndex].candy = request.body.candy;
      obj.pokemon[selectedPokemonIndex].candy_count = request.body.candy_count;
      obj.pokemon[selectedPokemonIndex].egg = request.body.egg;
      obj.pokemon[selectedPokemonIndex].avg_spawns = request.body.avg_spawns;
      obj.pokemon[selectedPokemonIndex].spawn_time = request.body.spawn_time;
      // we dont need to reassign this, but lets be explicit about the change
      const changedObj = obj;

      jsonfile.writeFile(FILE, changedObj, { spaces: 2 }, (err) => {
          if (err) console.error(err);
          response.render('single',changedObj.pokemon[selectedPokemonIndex]);
        });
    })
})

app.get('/pokemon/:id/delete', (request, response)=>{
  let pokemonId = parseInt(request.params.id);
  let selectedPokemonIndex;

  jsonfile.readFile(FILE, (err,obj)=>{
    for (let i=0; i<obj.pokemon.length; i++){
      if (pokemonId == obj.pokemon[i].id){
        selectedPokemonIndex = i;
      };
    };
    let respond = obj.pokemon[selectedPokemonIndex];
    response.render('delete', {respondKey: respond, idKey: pokemonId});
  });
});

app.delete('/pokemon/:id', (request, response)=>{
  console.log("this is request body:",request.body);
})


/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));
