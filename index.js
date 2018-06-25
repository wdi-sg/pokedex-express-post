const express = require('express');
const jsonfile = require('jsonfile');
const methodOverride = require('method-override');
var path = require('path');

const FILE = 'pokedex.json';

// Init express app
const app = express();

// Middleware
app.use(express.static('public'))
app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use(methodOverride('_method'));

// app.get('/:id', (request, response) => {
//   let inputId = request.params.id;
//   // get json from specified file
//   jsonfile.readFile(FILE, (err, obj) => {
//     // obj is the object from the pokedex json file
//     // extract input data from request
//     let pokemonId=obj.pokemon;

//     // find pokemon by id from the pokedex json file
//     let pokemon = pokemonId.find((currentPokemon) => {
//       return currentPokemon.id === parseInt(inputId, 10);
//     });
//     if (pokemon === undefined) {

//       // send 404 back
//       response.status(404);
//       response.send("not found");
//     } else {

//       response.send(pokemon);
//     }
//   });
// });

//HOME PAGE
// app.get('/', (req, res) => {
//   jsonfile.readFile(FILE, (err, obj) => {
//     let pokemon = obj.pokemon;
//     let content;
//     if(pokemon.name===req.query.name){
//       content = pokemon.name.sort()
//     }else{
//       content = pokemon.name
//     }
//     res.send(content)
//   });
// });


//UPDATING A POKEMON DETAIL

app.get('/pokemon/edit', (req, res) => {
  res.sendfile('./public/editPokemon.html');
})

app.post('/pokemon/edit', (req, res) => {
  jsonfile.readFile(FILE, (err, obj) => {
    let pokemon=obj.pokemon;
    let matchingPokemon;
    obj.pokemon.forEach((poky)=>{
      if(String(poky.id) === req.body.id){
        matchingPokemon = poky;
        console.log('matched');
      }
    });

    if (matchingPokemon) {
      let htmlForm = 
        `<form method="POST" action="/pokemon/edit">' + 
         '<input type="text" name="${matchingPokemon.id}" placeholder="id"/>' +
         '<input type="text" name="${matchingPokemon.num}" placeholder="num"/>' +
         '<input type="text" name="${matchingPokemon.name}" placeholder="name"/>' +
         '<input type="text" name="${matchingPokemon.img}" placeholder="img"/>' +
         '<input type="text" name="${matchingPokemon.height}" placeholder="height"/>' +
         '<input type="text" name="${matchingPokemon.weight}" placeholder="weight"/>' +
         '<input type="submit" value="Create">' +
         '</form>`;
         
         res.send(htmlForm);
      }
    
  });
});

app.put('/pokemon', (req, res) => {
  jsonfile.readFile(FILE, (err, obj) => {
    let pokemon=obj.pokemon;
    pokemon.forEach((poky)=>{
      if(poky.id===req.body.id){

      }
    })
  })
})


//ID OF POKEMON
app.get('/:id', (req, res) => {
  jsonfile.readFile(FILE, (err, obj) => {
    let pokemon=obj.pokemon;
    for(let i = 0; i<pokemon.length; i++){
      if(pokemon[i].id === req.params.id){
        res.send(pokemon[i]);
      } else {
      res.status(404);
      res.send("not found");
      }
    };
  });
});

app.post('/pokemon', (req, res) => {
  let data = req.body;
  let id = parseInt(data.id);
  jsonfile.readFile(FILE, (err, obj) => {
    let pokemon = obj.pokemon;
    pokemon.push(data);
    res.send(obj)
  })
});

//CREATING A NEW POKEMON
app.get('/pokemon/new', (req, res) => {
  res.sendfile('./public/newPokemon.html');
});

//FORM FOR NEW POKEMON ADDED
app.post('/pokemon', (req, res) => {
  jsonfile.readFile(FILE, (err, obj) => {
    let pokemon = obj.pokemon;
    let newPokemonAdded = {"id": req.body['id'],
      "num": req.body['num'],
      "name": req.body['name'],
      "img": req.body['img'],
      "height": req.body['height'],
      "weight": req.body['weight'],
      "candy": "",
      "candy_count": "",
      "egg": "",
      "avg_spawns": "",
      "spawn_time": ""
    }
    pokemon.push(newPokemonAdded);
    jsonfile.writeFile(FILE, obj, (err) => {}) 
    res.redirect('/'); 
  })
});


/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));
