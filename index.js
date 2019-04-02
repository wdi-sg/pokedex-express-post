const express = require('express');
const jsonfile = require('jsonfile');

const FILE = 'pokedex.json';


// Init express app
const app = express();
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));


app.post("/pokemon/new", function(request, response) {

    jsonfile.readFile(FILE, function(err, obj) {
          userInput = request.body;
          console.log(obj);
          obj.pokemon.push(userInput);

          jsonfile.writeFile(FILE, obj, (err) => {
            console.error(err)

        // now look inside your json file
        response.send(obj);
    });
    });

});



app.get("/pokemon/new", function(request, response) {

    let respond = '<form method="POST" action="/pokemon/new">'+
                  'id: <input type="text" name="id">'+
                  'num: <input type="text" name="num">'+
                  'name: <input type="text" name="name">'+
                  'img: <input type="text" name="img">'+
                  'height: <input type="text" name="height">'+
                  'weight: <input type="text" name="weight">'+
                  '<input type="submit" value="Submit">'+
                  '</form>';
                  response.send(respond);
});


// app.get('/:id', (request, response) => {

//   // get json from specified file
//   jsonfile.readFile(FILE, (err, obj) => {
//     // extract input data from request
//     let inputId = parseInt( request.params.id );

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


 //Listen to requests on port 3000
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));