var express = require("express");
var handlebars = require('express-handlebars');
var app = express();
var jsonFile = require('jsonfile');
const bodyParser = require('body-parser');

var pokeFile = "pokedex.json";

/**
 * ===================================
 * Configurations and set up
 * ===================================
 */
app.engine('handlebars', handlebars.create().engine);
app.set('view engine', 'handlebars');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

/**
 * ===================================
 * Routes
 * ===================================
 */
// Q1
// app.post('/',(req,resp)=>{
//   let userInput = req.body;
//   let newPokemonChecker = false;
//   jsonFile.readFile(pokeFile,(err,obj)=>{
//     console.log("jsonreadfileError",err);
//     let existingPokemon = obj["pokemon"];
//     for(let i=0;i<existingPokemon.length;i++){
//       if(existingPokemon[i].name!=userInput.name){
//         newPokemonChecker=true;
//       }
//     }
//     if(newPokemonChecker==true){
//       existingPokemon.push(userInput);
//       jsonFile.writeFile(pokeFile,existingPokemon,(err)=>{
//         console.log("jsonwriteFileError:",err);
//         resp.send("added your new pokemon!")
//       });
//     }else{
//         resp.send("ur pokemon already exists!")
//     }
//   });
// });

// app.get('/new',(req,resp)=>{
//   resp.render('formNewPokemon');
// });

// Q2
let pokedex;

jsonFile.readFile(pokeFile, (err, obj) => {
  pokedex = obj;
})

app.get('/home',(req,resp)=>{
  resp.render('pokemon');
});
  
app.get('/:sortby?',(req,resp)=>{
  let sortParam = req.query.sortby;
  pokedex.pokemon.sort((first,second)=>{
    if(first[sortParam]>second[sortParam]) return -1;
    if(first[sortParam]>second[sortParam]) return 1;
    return 0;
  })
  resp.render('pokemon',pokedex);
});


/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */

app.listen(3000,()=>{console.log("Server running!")});