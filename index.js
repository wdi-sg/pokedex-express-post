const express = require('express');
const jsonfile = require('jsonfile');
const file = 'pokedex.json';

/**
 * ===================================
 * Configurations and set up
 * ===================================
 */

// Init express app
const app = express();

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
const methodOverride = require('method-override')
app.use(methodOverride( '_method' ));
/**
 * ===================================
 * Routes
 * ===================================
 */

// ********************************
// GET then POST, refer to floobits
// ********************************
app.get('/:pokemon', (request, response) => {
  //defaults to {}

  jsonfile.readFile(file, (err, obj) => {
    let input = parseInt(request.params.pokemon);

    var pokemon;

      for(i = 0; i < obj.pokemon.length; i++) {
        let currentPoke = obj.pokemon[i];
        if(currentPoke.pokemon === input) {
          pokemon = currentPoke;
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


    let form = '';
    form = '<html>' +
    '<body>'+
    '<h1>Pick your Pokemon!</h1>'+
    '<form method="POST" action="/pokemon/">'+
    'Pokemon id:'+
    '<p><input type="text" name="id"/></p>'+

    'num:'+
    '<p><input type="text" name="num"/></p>'+
    'name:'+
    '<p><input type="text" name="name"/></p>'+
    'img:'+
    '<p><input type="text" name="img"/></p>'+
    'height:'+
    '<p><input type="text" name="height"/></p>'+
    'weight:'+
    '<p><input type="text" name="weight"/></p>'+
    '<input type="submit" value="Submit"/>'+
    '</form>'+
    '</body>'+
    '</html>';

    response.send(form);
    console.log('sent!')
});


app.post('/pokemon', (request, response) => {
 let newPokemonObj = request.body;
 jsonfile.readFile(file, (err, obj) => {
   if(err){
     console.log('Nothing: ${err}');
   }  else {
     obj['pokemon'].push(newPokemonObj);
     jsonfile.writeFile(file,obj, (err) => {
       if(err){
         console.log('Nothing: ${err}'));
       } else {
         response.send('Added new pokemon! <a hred='../pokemon'>back .. </a>'');
       }
     });
   }
 });

  let form = request.body;
  console.log(form);

  jsonfile.readFile(file, (err, obj) => {
    if(err) {
      console.log("Error reading");
      console.log(err);
    }

//NOT COMPLETED
app.put('/request/:id', (request, response) => {
  console.log(request.params.id);
  console.log(request.body);
  let paramsId = parseInt(request.params.id);
  let newPokemonObj = request.body;
  jsonfile.readFile(file, (err.obj) => )
  if (err){
    console.log('Error reading: ${err}');
  } else {
     let pokeArr = Object.keys(request.body);
     //for loop
  }
})



    obj.pokemon.push(form);
    jsonfile.writeFile(file, obj, (err) => {
      if (err) {
              console.log(err);
              response.status(404);
              response.send("not found");
            } else {
              console.log("All good")
              response.send(form);
            }
    });
  });
});
app.listen(3000, () => console.log('~~~ Tuning into the waves of port 3000 ~~~'));
