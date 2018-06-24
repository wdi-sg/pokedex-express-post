const express = require('express');
const jsonfile = require('jsonfile');
const FILE = 'pokedex.json';
const app = express();
const bodyParser = require('body-parser');
const http=require("http");
// tell your app to use the module
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

/**
 * ===================================
 * Configurations and set up
 * ===================================
 */

// Init express app


/**
 * ===================================
 * Routes
 * ===================================
 */

app.get('/:id', (request, response) => {

  // get json from specified file
  jsonfile.readFile(FILE, (err, obj) => {
    // obj is the object from the pokedex json file
    // extract input data from request
    let inputId = request.params.id;

    // find pokemon by id from the pokedex json file
    // (note: find() is a built-in method of JavaScript arrays)
    let pokemon = obj.pokemon.find((currentPokemon) => {
      return currentPokemon.id === parseInt(inputId, 10);
      //decimal system radix
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

app.get('/*',getRootHandler)
function getRootHandler (request, response){
  let input=[]; 
  let parameters= request.params[0].split('/')
  if(parameters != []){
        input=parameters.map(function(parameter){
        return parameter.toLowerCase();
    })

  }
  if(input[0] == 'new'){
    let htmlForm = '<form method="POST" action="/pokemon">' + 
     '<input type="text" name="id" placeholder="id"/>' +
     '<input type="text" name="num" placeholder="num"/>' +
     '<input type="text" name="name" placeholder="name"/>' +
     '<input type="text" name="img" placeholder="img"/>' +
     '<input type="text" name="height" placeholder="height"/>' +
     '<input type="text" name="weight" placeholder="weight"/>' +
     '<input type="submit" value="Create">' +
     '</form>'
   response.send(htmlForm)
    }
let createNewPokemon =(request,response)=>{
    let newPokemon={
      "id":request.body.id,
      "num":request.body.num,
      "name":request.body.name,
      "img":request.body.img,
      "height":request.body.height,
      "weight":request.body.weight
    }
//adds new object into pokemon's array
  obj.pokemon.push(newPokemon);
   //to make sure var pokemon does not get overwritten
   let newObj = obj;

   //overwrites Json file
   jsonfile.writeFile('pokedex.json', newObj, (err) => {

        response.send('created pokemon! Check pokedex.json');
    };
 
  console.log(parameters)
  response.send('index.html');
};
/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));
