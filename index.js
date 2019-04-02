const express = require('express');
const jsonfile = require('jsonfile');

const FILE = 'pokedex.json';

// Init express app
const app = express();

// Tell your App to use module..
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

app.get('/:id', (request, response) => {
  // get json from specified file
  jsonfile.readFile(FILE, (err, obj) => {
    // obj is the object from the pokedex json file
    // extract input data from request
    let inputId = parseInt( request.params.id );
    var pokemon;
    // find pokemon by id from the pokedex json file
    for( let i=0; i<obj.pokemon.length; i++ ){
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

app.get('/pokemon/new', (request, response) => {
    let  respond = '<h1>Add New Pokemon to Pokedex</h1>'+
                   '<form method="POST" action="/pokemon">'+
                   'Pokemon id: <input type="text" name="id"><br>'+
                   'Pokemon num: <input type="text" name="num"><br>'+
                   'Pokemon name: <input type="text" name="name"><br>'+
                   'Pokemon img: <input type="text" name="img"><br>'+
                   'Pokemon height: <input type="text" name="height"><br>'+
                   'Pokemon weight: <input type="text" name="weight"><br>'+
                   '<button>Submit</button>'
                   '</form>';
    response.send(respond);
});

app.post('/pokemon', (request, response) => {
    jsonfile.readFile(FILE, (err, obj) => {
        // Not going to use entire request.body as id and num are different
        const arr = obj["pokemon"];
        const newPokemon = {};
        newPokemon["id"] = arr.length + 1;
        newPokemon["num"] = (arr.length + 1).toString();
        newPokemon["name"] = request.body["name"];
        newPokemon["img"] = request.body["img"];
        newPokemon["height"] = request.body["height"];
        newPokemon["weight"] = request.body["weight"];
        arr.push(newPokemon);
        console.log(newPokemon);
        jsonfile.writeFile(FILE, obj, (err) =>{
            // arr.push(newPokemon);
            // console.log(newPokemon);
            response.send(request.body);
        })
    });
})

// app.get('/?sortby=name', (request, response) => {
//     let htmlContent = '<h1>List of Pokemon in Ascending Order</h1>';
//     jsonfile.readFile(FILE, (err, obj) => {
//         const arr = obj["pokemon"];
//         const nameArr = [];
//         for (let i = 0; i < arr.length; i++) {
//             nameArr.push(arr[i]["name"]); // ["Bulbasaur","Ivysaur",...]
//         }
//         nameArr.sort();
//         for (let i = 0; i < nameArr.length; i++) {
//             htmlContent += `<li>${nameArr[i]["name"]}</li>`;
//         }
//         response.send(htmlContent);
//     })
// });

app.get('/', (request, response) => {
    let htmlContent = '<h1>List of Pokemon</h1>';
    jsonfile.readFile(FILE, (err, obj) => {
        const arr = obj["pokemon"];
        for (let i = 0; i < arr.length; i++) {
            htmlContent += `<li>${arr[i]["name"]}</li>`;
        }
        htmlContent += `<form method="GET"action="/?sortby=name">
            <button>Sort by Name</button>
            </form>`;
        response.send(htmlContent);
    })
});

app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));