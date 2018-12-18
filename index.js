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

app.get('/pokemon/new', (request, response) => {
    jsonfile.readFile(file, (err, obj) => {
        if (err) {
            console.log(err)
        }

        let form = "<html>" +
                   "<body>" +
                   '<form action="/pokemon" method="POST">' +
                   '<input name = "id"/ placeholder="ID"/>' +
                   "<br />" +
                   '<input name = "num"/ placeholder="Number"/>' +
                   "<br />" +
                   '<input name = "name"/ placeholder="Name"/>' +
                   "<br />" +
                   '<input name = "img"/ placeholder="Image"/>' +
                   "<br />" +
                   '<input name = "height"/ placeholder="Height"/>' +
                   "<br />" +
                   '<input name = "weight"/ placeholder="Weight"/>' +
                   "<br />" + "<br />" +
                   '<input type = "submit"/>' +
                   "</form>" +
                   "</body>" +
                   "</html>";

        response.send(form);


    });
});

app.post("/pokemon", (request,response) => {
    jsonfile.readFile(file, (err, obj) => {
        if (err) {
            console.log(err)
        }

        // for (var i=0; i<obj.pokemon.length;) {
        //     let inputId = JSON.parse(request.body.id[i]);
        // }

        response.send(request.body)

        obj.pokemon.push(request.body)
        jsonfile.writeFile(file, obj, (err) => {
            console.log(obj)
          });

    })
        console.log(request.body);
        // response.send("helo")
    });

app.get('/', (request, response) => {
  jsonfile.readFile(file, (err, obj) => {
    if (err) {
        console.error(err)
    }

    let pokeList = []
        for (let i=0; i<obj.pokemon.length; i++) {
            // response.send(obj.pokemon[i].name)
            // console.log(obj.pokemon[i].name)
            pokeList.push(obj.pokemon[i].name)
        }
        response.send(pokeList)
        console.log(pokeList)
    })

    // jsonfile.writeFile(file, (err, obj) => {
    //     response.send(obj.pokemon[i].name)
    // })

});

/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));
