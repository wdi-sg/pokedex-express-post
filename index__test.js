const express = require('express');
const jsonfile = require('jsonfile');

const FILE = 'pokedex.json';

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



// app.get('/:id', (request, response) => {

//   // get json from specified file
//   jsonfile.readFile(FILE, (err, obj) => {
//     // obj is the object from the pokedex json file
//     // extract input data from request
//     let inputId = parseInt( request.params.id );
//     let inputNum = parseInt (request.params.num);
//     let inputName = request.params.name;
//     let inputImg = request.params.img;
//     let inputHeight = request.params.height;
//     let inputweight = request.params.weight;

//     var pokemon;

//     // find pokemon by id from the pokedex json file
//     for( let i=0; i<obj.pokemon.length; i++ ){

//       let currentPokemon = obj.pokemon[i];

//       if( currentPokemon.id === inputId ){
//         pokemon = currentPokemon;
//       }
//     }

//     if (pokemon === undefined) {

//       // send 404 back
//       response.status(404);
//       response.send("not found");
//     } else {

//       response.send(pokemon);
//     }
//   });
// });


// app.get('/', (request, response) => {
//   response.send("yay");
// });

app.get("/pokemon/new",(request,response)=>{

  let form = "<html>"+
      "<body>" +
      '<form action="/pokemon" method="POST">' +
          '<input name="id"/>' +
          '<input name="num"/>' +
          '<input name="name"/>' +
          '<input name="img"/>' +
          '<input name="height"/>' +
          '<input name="weight"/>' +

          '<input type="submit"/>' +
      "</form>" +
      "</body>" +
      "</html>";

  response.send(form);
})

app.post("/pokemon", (request,response) =>{   

  // jsonfile.readfile('pokedex.json', request.body, (err) => {
  //   var pokemon = obj.pokemon;
  //   var newPokemon = [];
  //   var id = request.body.id;
  //   var num = request.body.num;
  //   var name = request.body.name;
  //   var img = request.body.img;
  //   var height = request.body.height;
  //   var weight = request.body.weight;

  //   newPokemon.push(id);
  //   newPokemon.push(num);
  //   newPokemon.push(name);
  //   newPokemon.push(img);
  //   newPokemon.push(height);
  //   newPokemon.push(weight);
   
  //   jsonfile.writeFile('pokedex.json', request.body, (err) => {

  //     newPokemon;     

        response.send();
    });

//   }); 
// });  
        
 

/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));
