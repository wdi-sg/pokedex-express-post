// trying with handlebars


const express = require('express');
const handlebars = require('express-handlebars');
const jsonfile = require('jsonfile');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
// tried ejs but failed ask gabriel how he got the forms up
// trying handlebars, looks cool
// checkout jade

let sort = true;
let sortNum = false;

const file = 'pokedex.json';

/**
 * ===================================
 * Configurations and set up
 * ===================================
 */

// Init express app
const app = express();

// Set handlebars to be the default view engine
app.engine('handlebars', handlebars());
app.engine("handlebars", handlebars({ defaultLayout: "main" }));

app.set('view engine', 'handlebars');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

// app.use(express.static('public'));
// not using since handlebars
app.use(methodOverride('_method'));

// read json file into memory
// readfile has no callback

// Sync is synchronous and blocks execution until finished. These return their results as return values.

// The others are asynchronous and return immediately while they function in the background. You pass a callback function which get called when they finish.
const pokeData = jsonfile.readFileSync(file);


let updatedID = 0;
let updatedNum = 0;

for (i = 0; i < pokeData.pokemon.length; i++) {
  if (parseInt(pokeData.pokemon[i].id) > updatedID) {
    updatedID = parseInt(pokeData.pokemon[i].id)
  }
  if (parseInt(pokeData.pokemon[i].num) > updatedNum) {
    updatedNum = parseInt(pokeData.pokemon[i].num)
  }
};

// update id and  num
pokeData.updatedID = updatedID;
pokeData.updatedNum = updatedNum;

// jsonfile.writeFile(FILE, pokeData, {spaces: 2}, (err) => {
//   console.error(err)
// });

/**
 * ===================================
 * Routes
 * ===================================
 */

 // create new pokemon
 app.get('/new', (req, res) => {
   let content = {
     "updatedID": updatedID + 1,
     "updatedNum": updatedNum + 1
   };
   res.render('new', content);
   // res.send(pokeData);
 });

 app.get('/:id/edit', (req, res) => {
   let inputId = req.params.id;
   let pokemon = pokeData.pokemon.find((currentPokemon) => {
     return currentPokemon.id === parseInt(inputId, 10);
   })
   let context = {
     pokemon
   };
   // console.log(pokeData);
   // console.log(context);
   // res.send("it works!");
   res.render('edit', context);
 });

 app.get('/home', (req, res) => {
   // console.log("home");
   // default sort by id
   let sortBy = req.query.sortby || "";
   let object = pokeData.pokemon.slice();
   // console.log(req.query.sortby, sort);

   if (sortBy === "name") {
     object.sort((a, b) => {
       if (a.name.toLowerCase() < b.name.toLowerCase())
         return (sort ? -1 : 1);
       if (a.name.toLowerCase() > b.name.toLowerCase())
         return (sort ? 1 : -1);
       return 0;
     });
     sort = !sort
   } else if (sortBy === "id") {
     object.sort((a, b) => {
       if (a.id < b.id)
         return (sortNum ? -1 : 1);
       if (a.id > b.id)
         return (sortNum ? 1 : -1);
       return 0;
     });
       sortNum = !sortNum;
   };

   let content = { pokedex: object };
   res.render('home2', content);
 });

 app.put('/:id', (req, res) => {
   // console.log(req.params);
   // console.log(req.body);
   let id = req.params.id;
   // find the index position
   let pokemonPosition = pokeData.pokemon.findIndex((currentPokemon) => {
     return currentPokemon.id === parseInt(id);
   });

   console.log(pokemonPosition);
   // make id into an ineger
   req.body.id = parseInt(req.body.id);
   pokeData.pokemon[pokemonPosition] = req.body;

   jsonfile.writeFile(file, pokeData, {spaces: 2}, (err) => {
     console.error(err)
   });
   res.send("pokemon edited!");
 });

 app.delete('/:id', (req, res) => {
   let id = req.params.id;
   let pokemonPosition = pokeData.pokemon.findIndex((currentPokemon) => {
     return currentPokemon.id === parseInt(id);
   });
   console.log(pokemonPosition);

   pokeData.pokemon.splice(pokemonPosition, 1);

   jsonfile.writeFile(file, pokeData, {spaces: 2}, (err) => {
     console.error(err)
   });
   res.redirect('home');

 });

app.get('/:id', (req, res) => {
  // get json from specified file
  jsonfile.readFile(file, (err, obj) => {
    // obj is the object from the pokedex json file
    // get the input data from the request
    let inputId = req.params.id;

    // find pokemon by id from the pokedex json file
    // (note: find() is a built-in method of JavaScript arrays)

    let pokemon = obj.pokemon.find((currentPokemon) => {
      return currentPokemon.id === parseInt(inputId, 10);
    });

    if (pokemon === undefined) {
      // send 404 back
      res.render('404');
    } else {
      let context = {
        pokemon: pokemon
      };

      // send html file back with pokemon's data
      res.render('pokemon', context);
    }
  });
});

app.post('/', (req, res) => {

  pokeData.updatedID++;
  pokeData.updatedNum++;

  let pokeNum = pokeData.updatedNum.toString();
  while (pokeNum.length < 3) {
    pokeNum = "0" + pokeNum;
  }
  let pokemon = {
    id: pokeData.updatedID,
    num: pokeNum,
    name: req.body.name,
    img: req.body.img,
    height: req.body.height,
    weight: req.body.weight
  }
  pokeData.updatedID++;
  pokeData.updatedNum++;

  pokeData.pokemon.push(pokemon);

  jsonfile.writeFile(file, pokeData, {spaces: 2}, (err) => {
    console.error(err)
  });
  res.redirect("home");
});

app.get('/', (req, res) => {
// default by id
  let sortBy = req.query.sortby || "id";
  let object = pokeData.pokemon.slice();
  // console.log(req.query.sortby, sort);

  if (sortBy === "name") {
    object.sort((a, b) => {
      if (a.name.toLowerCase() < b.name.toLowerCase())
        return (sort ? -1 : 1);
      if (a.name.toLowerCase() > b.name.toLowerCase())
        return (sort ? 1 : -1);
      return 0;
    });
    sort = !sort
  } else if (sortBy === "id") {
    object.sort((a, b) => {
      if (a.id < b.id)
        return (sortNum ? -1 : 1);
      if (a.id > b.id)
        return (sortNum ? 1 : -1);
      return 0;
    });
      sortNum = !sortNum;
  };

  let content = { pokedex: object };
  res.render('home', content);
});

/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));


// without handlebars, help from jodi

// const express = require('express');
// const jsonfile = require('jsonfile');
// const methodOverride = require('method-override');
// const file = 'pokedex.json';

// const app = express();

// // middleware
// app.use(express.static('public'))
// app.use(express.json());
// app.use(express.urlencoded({extended:true}));
// app.use(methodOverride('_method'));

// // routes

// app.get('/pokemon/new', (req, res) => {
//   res.sendFile(__dirname + '/public/form.html');
// });

// app.get('/pokemon/edit', (req, res) => {
//   res.sendFile(__dirname + '/public/editform.html');
// });

// app.get('/pokemon/delete', (req, res) => {
//   res.sendFile(__dirname + '/public/deleteform.html');
// });

// app.get('/pokemon', (req, res) => {

//   jsonfile.readFile(file, (err, obj) => {

//     let pokemon = obj.pokemon;
  
//     if (req.query.sortby == "name") {

//       pokemon.sort( (a, b) => {
//         if (a.name < b.name)
//           return -1;
//         if (b.name < a.name)
//           return 1;
//         return 0;
//       });
//       res.send(obj);

//     } else {
//       res.send(obj)
//     }

//   })
// });

// //2nd attempt -------------------------------
// app.get('/:id/edit', (req, res) => {

//   let pokemonToEditId = request.params['id']; 

//   let html = '<h1>Edit Pokemon</h1>\
//   <form method="POST" action="/' + pokemonToEditId +'/edit?_method=PUT">\
//     Number: <input type="text" name="num"><br>\
//     Name: <input type="text" name="name"><br>\
//     Image: <input type="text" name="img"><br>\
//     Height: <input type="text" name="height"><br>\
//     Weight: <input type="text" name="weight"><br>\
//     <input type="submit" name="Confirm Edit"><br>\
//   </form>'
//   res.send(html)
// });

// app.get('/:id/delete', (req, res) => {

//   let pokemonToEditId = request.params['id']; 

//   let html = '<h1>Delete Pokemon</h1>\
//   <form method="POST" action="/' + pokemonToEditId +'/delete?_method=DELETE">\
//     Press "Confirm" to delete Pokemon ID: ' + pokemonToEditId + 
//     '<br><br><input type="submit" value="Confirm"> \
//   </form>'
//   res.send(html)
// });



// //-------------------------------------------
// app.get('/:id', (req, res) => {

//   // get json from specified file
//   jsonfile.readFile(file, (err, obj) => {
//     // obj is the object from the pokedex json file
//     // extract input data from request
//     let inputId = req.params.id;

//     // find pokemon by id from the pokedex json file
//     // (note: find() is a built-in method of JavaScript arrays)
//     let pokemon = obj.pokemon.find((currentPokemon) => {
//       return currentPokemon.id === parseInt(inputId, 10);
//     });

//     if (pokemon === undefined) {

//       // send 404 back
//       res.status(404);
//       res.send("not found");
//     } else {

//       res.send(pokemon);
//     }
//   });
// });

// app.get('/', (req, res) => {
//   let html = 
//   '<form method="GET" action="/pokemon">\
//     <h1>Hi! Welcome to the online Pokèdex</h1>\
//     <input type="submit" value="Sort By Name">\
//     <input type="hidden" name="sortby" value="name">\
//   </form>'
//   // ask!! is input type=hidden etc, the right way...? Cannot add another input type, as it would append the query
//   res.send(html);
// });

// // ============================================================================================================================================================================================================================================

// // add new pokemon
// app.post('/pokemon', (req, res) => {

//   console.log('posted stuff')

//   let data = req.body;

//   // making id a number instead of string
//   let id = parseInt(data['id']);
//   data['id'] = id;

//   // adding the new pokemon data into the list of pokemon
//   jsonfile.readFile(file, (err, obj) => {

//     obj.pokemon.push(data);

//     res.send(obj);

//     // writes the obj with new data inside
//     jsonfile.writeFile(file, obj);

//   })
// });

// // edit pokemon, input existing ID to edit
// app.put('/pokemon', (req, res) => {

//   console.log('updated stuff');

//   // what is the id to edit
//   // find the object with that id in the database
//   // replace all information in that object

//   let editPokemon = req.body;

//   // making id a number instead of string
//   let id = parseInt(editPokemon['id']);
//   editPokemon['id'] = id;

//   jsonfile.readFile(file, (err, obj) => {

//     let pokemon = obj.pokemon;
    
//     // finds the pokemon with the matching id
//     let pokemonReplace = pokemon.find((currentPokemon) => {
//       return currentPokemon.id === editPokemon.id
//     });

//     // if id not found, request.body will be appended to the end of the array
//     // alternatively, I could add an if pokemonReplace === undefined condition to check for
//     // the validity of pokemonReplace.
//     // Case: if pokemonReplace === undefined, request.send(no pokemon, you should add pokemon instead)

//     // replace old object with new object
//     let indexToReplace = pokemon.indexOf(pokemonReplace);
//     pokemon.splice(indexToReplace, 1, editPokemon);

//     res.send(pokemon);
//   });
// });

// // delete pokemon, input existing ID to delete
// app.delete('/pokemon', (req, res) => {

//   console.log('deleted stuff');

//   // what is the id to delete
//   // find the object with that id in the database
//   // remove that object

//   let deletePokemon = req.body

//   // making id a number instead of string
//   let id = parseInt(deletePokemon['id']);
//   deletePokemon['id'] = id;

//   jsonfile.readFile(file, (err, obj) => {

//     let pokemon = obj.pokemon;

//     let pokemonRemove = pokemon.find((currentPokemon) => {
//       return currentPokemon.id === deletePokemon.id
//     });

//     if (pokemonRemove == undefined) {
//       res.send('ID not found');

//     } else {
//       let indexToRemove = pokemon.indexOf(pokemonRemove);
//       pokemon.splice(indexToRemove, 1);
//       res.send(pokemon);

//     }

//   });
// });

// //2nd attempt -------------------------------
// // update pokemon, does not remove id, checks for invalid id
// app.put('/:id/edit', (req, res) => {

//   let pokemonId = parseInt(req.params['id']);
//   let index = pokemonId - 1;

//   let updatedPokemon = req.body

//   jsonfile.readFile(file, (err, obj) => {
//     let pokemons = obj.pokemon;
//     let pokemon = pokemons[index]

//     if (pokemon === undefined) {
//       response.send('There are no Pokemons with an ID of ' + pokemonId + '. Add Pokemon instead.');
//       return;
//     };

//     // updating the values; individually
//     // pokemon.num = updatedPokemon.num;
//     // pokemon.name = updatedPokemon.name;
//     // pokemon.img = updatedPokemon.img;
//     // pokemon.height = updatedPokemon.height;
//     // pokemon.weight = updatedPokemon.weight;

//     // updating the values; using for loop
//     for (var key in updatedPokemon) {
//       // checks for empty input. If empty input then don't change anything
//       updatedPokemon[key] === "" ? updatedPokemon[key] = pokemon[key] : pokemon[key] = updatedPokemon[key];
//     };

//     response.send(pokemon);
//   });
// });

// app.delete('/:id/delete', (request, response) => {
 
//   let pokemonId = parseInt(request.params['id']);
//   let index =  pokemonId - 1;

//   jsonfile.readFile(FILE, (err, obj) => {
//     let pokemons = obj.pokemon;
//     let pokemon = pokemons[index]

//     if (pokemon === undefined) {
//       response.send('There are no Pokemons with an ID of ' + pokemonId + '.');
//       return;
//     };

//     pokemons.splice(index, 1);

//     response.send(pokemons);
//   });
// });


// app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));



