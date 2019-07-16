const express = require('express');
const jsonfile = require('jsonfile');

const file = 'pokedex.json';

const app = express();

// tell your app to use the module
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

//ROUTES




// app.get('/:id', (request, response) => {

//   // get json from specified file
//   jsonfile.readFile(file, (err, obj) => {
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


// Expose a new endpoint that intercepts GET requests to /pokemon/new, which responds with a HTML page with a form that has these fields: id, num, name, img, height, and weight

// Point the form to submit data to the (/pokemon) route using POST method

app.get('/pokemon/new', (request, response) => {
  let form = `<form method="POST" action="/pokemon">
  Pokemon Information:
  <input type="text" name="id" placeholder="id">
  <input type="text" name="num" placeholder="number">
  <input type="text" name="name" placeholder="name">
  <input type="text" name="img" placeholder="img">
  <input type="text" name="height" placeholder="height">
  <input type="text" name="weight" placeholder="weight">
  <input type="submit" value="Submit">
  </form>
  `

  response.send(form);
});


app.post('/pokemon', (request, response) => {
    let newPokemon = request.body;
    console.log(newPokemon)

    jsonfile.readFile(file, function(err, obj) {

        //not working properly
        obj.pokemon.push(newPokemon);

        jsonfile.writeFile(file, obj, function (err) {
            // obj.pokemon.push(newPokemon);
            console.error(err)
        response.send(newPokemon);
        })
    })

})


app.get('/', (request, response) => {
    let btnForm = `<form method="POST" action="/?sortby=name">
    <button type="submit">Sort by Name</button>
    <button type="submit">Sort by Weight</button>
    <button type="submit">Sort by Height</button>
    </form>
    `
    // let selForm = `<form name='myform' action="">
    // <select name="select" onchange="changeAction(this.value)">
    // <option name="default" value="0">Sort by...<option>
    // <option name="name" value="1" action="?sortby=name">Name<option>
    // <option name="weight" value="2">Weight<option>
    // <option name="height" value="3">Height<option>
    // </select>
    // `
    jsonfile.readFile(file, function(err, obj) {
        response.send(btnForm)
    })
})


app.post('/?sortby=name', (request, response) => {
    //does not enter this POST
    console.log('sorting by name')
    console.log(request.body)
    jsonfile.readFile(file, function(err, obj) {
        let arr = [];
        for (let i=0; i<obj.pokemon.length; i+=1){
            arr.push(obj.pokemon[i].name)
            arr.sort();
        }
        response.send(arr)
        console.log(arr)

        jsonfile.writeFile(file, obj, function (err) {

            console.error(err)
            // response.send(arr)
            // console.log(arr)

        })
    })

})






/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));