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
jsonfile.readFile(file, (err, obj) => {
    let pokeArr = [];

    app.get('/:id', (request, response) => {

        // obj is the object from the pokedex json file
        // extract input data from request
        let inputId = parseInt(request.params.id);

        var pokemon;

        // find pokemon by id from the pokedex json file
        for (let i = 0; i < obj.pokemon.length; i++) {

            let currentPokemon = obj.pokemon[i];

            if (currentPokemon.id === inputId) {
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

    app.get('/pokemon/new', (request, response) => {
        let form = "<html>" +
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

    app.post("/pokemon", (request, response) => {
        request.body.id = parseInt(request.body.id);
        console.log(request.body);
        obj.pokemon.push(request.body);
        jsonfile.writeFile(file, obj, (err) => {
            console.log(err);
        });
        // store fruit in JSON file
    });



    app.get('/', (request, response) => {
        pokeArr = []
                let form = "<html>" +
            "<body>" +
            '<form action="/" method="GET">' +
            'enter name : <input type="text" value="name" name="sortby"/>' +
            '<input type="submit"/>' +
            "</form>" +
            "</body>" +
            "</html>";
        for(let i = 0 ; i<obj.pokemon.length; i++){
        pokeArr.push(obj.pokemon[i].name);
    }
    if (request.query.sortby === "name"){
        pokeArr.sort();
    }
    var joined = pokeArr.join("<br>");
    response.send(form + joined);

    });

});

//     app.post("/?sortby=name", (request, response) => {
//         var arrName =[];
//         for(let i = 0; i<obj.pokemon.length; i++){
//             if(name.toLowerCase()===obj.pokemon[i].name.toLowerCase()){
//                 arrName.push(obj.pokemon[i].name);
//             }
//         }
//         console.log(arrName);
//     });
 /*
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));