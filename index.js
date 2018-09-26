const express = require('express');
const jsonfile = require('jsonfile');

const FILE = 'pokedex.json';



// Init express app
const app = express();

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

//#1
app.get('/pokemon/new', (request, response) => {
  let html = "<html>";
  html += "<body>";
  html += '<form method="POST" action="/pokemon">';
  html += "New Pokemon: <br>"
  html += 'Id: <input type="text" name="id">';
  html += 'Num: <input type="text" name="num">';
  html += 'Name: <input type="text" name="name">';
  html += 'Image: <input type="text" name="img">';
  html += 'Height: <input type="text" name="height">';
  html += 'Weight: <input type="text" name="weight">';
  html += '<input type="submit" value="submit">';
  html += "</form>";
  html += "</body>";
  html += "</html>";

  response.send(html);
});


app.post('/pokemon', (request, response) => {
  console.log("test");

  const obj = request.body;
  // const data = 'data.json';
  //
  // jsonfile.writeFile(data , obj, (err) => {
  //     if(err) console.log("error: ", err);
  //   });

  jsonfile.readFile(FILE, (err, obj) => {
    if(err) console.log("error: ", err);

    console.log(request.body);
    obj['pokemon'].push(request.body);

    jsonfile.writeFile(FILE , obj, (err) => {
      if(err) console.log("error: ", err);
    });
  });
  response.send(request.body);
});


// //FINDS AND MATCHES ID
// app.get('/:id', (request, response) => {
//
//   // get json from specified file
//   jsonfile.readFile(FILE, (err, obj) => {
//     // obj is the object from the pokedex json file
//     // extract input data from request
//     let inputId = parseInt( request.params.id );
//
//     var pokemon;
//
//     // find pokemon by id from the pokedex json file
//     for( let i=0; i<obj.pokemon.length; i++ ){
//
//       let currentPokemon = obj.pokemon[i];
//
//       if( currentPokemon.id === inputId ){
//         pokemon = currentPokemon;
//       }
//     }
//
//     if (pokemon === undefined) {
//
//       // send 404 back
//       response.status(404);
//       response.send("not found");
//     } else {
//
//       response.send(pokemon);
//     }
//   });
// });
//
// //NO DIRECTORY
// app.get('/', (request, response) => {
//   response.send("yay");
// });

app.listen(3001, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));
