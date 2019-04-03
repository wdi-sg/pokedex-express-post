const express = require('express');
const jsonfile = require('jsonfile');

const FILE = 'pokedex.json';

// Init express app
const app = express();
app.use(express.json());

app.use(express.urlencoded({
  extended: true
}));

const methodOverride = require('method-override')
app.use(methodOverride('_method'));


// this line below, sets a layout look to your express project
const reactEngine = require("express-react-views").createEngine();
app.engine("jsx", reactEngine);


// this tells express where to look for the view files
app.set("views", __dirname + "/views");

// this line sets react to be the default view engine
app.set("view engine", "jsx");


app.get("/", (request, response) => {
    response.render("home")
});




//Get user input and add it into pokedex.json
app.post("/pokemon", function(request, response) {

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


//Accessing to /pokemon/new receive several forms to fill out
app.get("/pokemon/new", function(request, response) {

    let respond = '<form method="POST" action="/pokemon">'+
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


//Accessing to the root route receive all the pokemon info
app.get('/', (request, response) => {
    let buttons = '<select method="POST" action="/">'+
                  '<option value="id">id</option>'+
                  '<option value="name">name</option>'+
                  '<input type="submit" value="Submit">'+
                  '</select>';
    jsonfile.readFile(FILE, (err, obj) => {
        let pokemonList = [];
        // obj.sort()
        for (i = 0; i < obj.pokemon.length; i++) {
            let currentPokemon = obj.pokemon[i].name;
            pokemonList.push("<li>" + currentPokemon + "</li>");
        }
        let respond = pokemonList.join("");
        response.send(buttons + respond);
    });
});


app.get("/pokemon/:id/edit", (request, response) => {
    //pokemonId = 2
    let pokemonId = parseInt(request.params.id);
    //pokemonIndex = 1
    let pokemonIndex = pokemonId -1;

    jsonfile.readFile(FILE, (err, obj) => {
       let data = obj.pokemon[pokemonIndex]

       response.render("home", {dataKey: data, idKey: pokemonId});
    });
});


app.put("/pokemon/:id", (request, response) => {
    // response.send("YES!!!");
    // console.log(request.body);
    jsonfile.readFile(FILE, (err, obj) => {
        userInput = request.body;
        // console.log(userInput);
         obj.pokemon.push(userInput);

        jsonfile.writeFile(FILE, obj, (err) => {
            console.error(err)

        response.send(obj);
    });
    });
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



 //Listen to requests on port 3000
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));