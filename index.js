// variables and making sure the npms are working 

const express = require('express');
const jsonfile = require('jsonfile');
const data = 'pokedex.json';
const app = express();

//make the html file within the public folder available
app.use(express.static('public'));

//module that lets you grab the contents of the form 
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

app.post('/pokemon', function(request, response) {

  jsonfile.readFile('pokedex.json', (err, obj) => {
  obj.pokemon.push(request.body);

    jsonfile.writeFile('pokedex.json', obj, (err) => {
    console.error(err)

      //debug code (output request body)
      console.log(request.body);

      response.send(obj.pokemon[obj.pokemon.length-1]);
      return
      // save the request body
    })
  });
});







// will allow the JS to access html files in my public folder 
// app.use(express.static('public'));

// app.use(express.json());
// app.use(express.urlencoded({
//   extended: true
// }));

// var path = require('path');

// // post request that listen for pokemon (its in the action of the html form) and calls a function
// app.post ('/pokemon', (request, response) => {
//     console.log(request.body);
    
 
// // XXXXXXXparse the form data and then push it to the json file  as new pokemon

//   // reads json file 
//   jsonfile.readFile('pokedex.json', (err, obj) => {
//       obj.pokemon.push(request.body);
      
//       jsonfile.writeFile('pokedex.json', obj, (err) => {
//         console.log(err)
//         response.send(obj.pokemon[obj.pokemon.length-1]);
//       });
//   });
// });


app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));
