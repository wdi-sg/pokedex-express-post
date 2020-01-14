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

/**
 * ===================================
 * Routes
 * ===================================
 */

 app.post('/pokemon', (request, response) =>{
   const newPokemon = request.body

   jsonfile.readFile(file, (err, obj) =>{
     // check to make sure the file was properly read
    if( err ){
      console.log("error with json read file:",err);
      response.status(503).send("error reading filee");
      return; 
    }
    intId = newPokemon.id

    newPokemon.id = parseInt(intId)
    obj.pokemon.push(newPokemon)

    jsonfile.writeFile(file, obj, (err) =>{
      if( err ){
        console.log("error with json read file:",err);
        response.status(503).send("error reading filee");
        return; 
      }
    })
    const names = []
    for(const pokemon of obj.pokemon){
      names.push(`<li>${pokemon.name}</li>`)
    }
    response.send(`<ul>${names.join('')}</ul>`)
   })
 })

 app.get('/pokemon', (request,response)=>{

  const names = []
  jsonfile.readFile(file, (err, obj)=>{
    if( err ){
      console.log("error with json read file:",err);
      response.status(503).send("error reading filee");
      return; 
    }

    for(const pokemon of obj.pokemon){
      names.push(`<li>${pokemon.name}</li>`)
    }
    response.send(`<ul>${names.join('')}</ul>`)
  })
 })

 app.get('/pokemon/new', (request,response)=>{
   response.send(`<form method="POST" action="/pokemon">
   Pokemon ID: <input type="text" name="id"><br>
   Pokemon Number: <input type="text" name="num"><br>
   Pokemon Name: <input type="text" name="name"><br>
   Pokemon Image: <input type="text" name="img"><br>
   Pokemon Height: <input type="text" name="height"><br>
   Pokemon Weight: <input type="text" name="weight"><br>
   <input type="submit" value="Submit">
 </form>`)
 })

app.get('/pokemon/:id', (request, response) => {

  // get json from specified file
  jsonfile.readFile(file, (err, obj) => {
    
    // check to make sure the file was properly read
    if( err ){
      console.log("error with json read file:",err);
      response.status(503).send("error reading filee");
      return; 
    }

    // obj is the object from the pokedex json file
    // extract input data from request
    let inputId = parseInt( request.params.id );

    var pokemon;

    // find pokemon by id from the pokedex json file
    for( let i=0; i< obj.pokemon.length; i++ ){

      let currentPokemon = obj.pokemon[i];

      if( currentPokemon.id === inputId ){
        pokemon = currentPokemon;
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

app.get('/', (request, response) => {
  response.send("yay");
});

/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));
