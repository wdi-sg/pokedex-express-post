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

// app.get('/:id', (request, response) => {

//   // get json from specified file
//   jsonfile.readFile(FILE, (err, obj) => {
//     // obj is the object from the pokedex json file
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



app.get("/pokemon/new", (request,response) =>{
    let form = '';
        form = '<html>' +
        '<body>'+
        '<h1>New Pokemon Entries</h1>'+
        '<form method="POST" action="/new">'+
        '<p>Name of Pokemon</p><input name="name"/>'+
        '<p>Id of Pokemon</p><input name="id"/>'+
        '<p>Num of Pokemon</p><input name="Num"/>'+
        '<p>Img link of Pokemon</p><input name="Img"/>'+
        '<p>Weight of Pokemon</p><input name="Weight"/>'+
        '<p>Height of Pokemon</p><input name="Height"/>'+
        '<input type="submit"/>'+
        '</form>'+
        '</body>'+
        '</html>';
      response.send(form);
});

app.post("/new", (request,response) => {
    // console.log("wow");
    var newPokemon = request.body
    jsonfile.readFile(file,(err,obj)=>{
        console.log(newPokemon);
        if(err){
            console.log("ERROR");
        }
        else{
            if((parseInt(newPokemon.id) - 1) < obj.pokemon.length){
                console.log("id exist. select another");
            }
            else{
                obj.pokemon.push(newPokemon);
                console.log(obj.pokemon.length);
            }
            jsonfile.writeFile(file, obj, (err) => {
                console.log("Added new pokemon")
                if( err ){
                    console.log("error writing file");
                    console.log(err)
                    response.status(503).send("no!");
                }
                  else{
                    console.log("~~~~~~~yay");

                    console.log( "send response");
                    response.send("yes!");
                  }
            })
        }
    });
});

app.get('/', (request, response) => {
    // response.send("yay");
    var pokemonName = [];
    jsonfile.readFile(file,(err,obj)=>{
        for (let i = 0; i < obj.pokemon.length;i++){
            console.log(obj.pokemon[i].name);
            pokemonName.push(obj.pokemon[i].name);
        }
        console.log("is it showing???")
        var stringPokemonName = pokemonName.join("<br>");
        response.send(stringPokemonName);
    })
});

/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));