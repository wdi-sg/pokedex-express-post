const express = require('express');
const jsonfile = require('jsonfile');

const FILE = 'pokedex.json';

// Init express app
const app = express();

//debug code (output request body)
app.use(express.json());
app.use(express.urlencoded({
    extended: true,
    }));

//ROUTES
app.get('/pokemon/new', (request, response) => {
    // render a template form here
    let html = "<html>";
    html += "<body>";
    html += '<form method="POST" action="/pokemon/">';
    html += "Inputs:";
    html += '<div><div>';
    html += '<br>';
    html += "ID: ";
    html += '<input type="text" name="id" style="margin-left: 5vw">';
    html += '<div><div>';
    html += "Number: ";
    html += '<input type="text" name="num" style="margin-left: 1.6vw">';
    html += '<div><div>';
    html += "Name: ";
    // html += '<div style="margin:10px";"padding:10px">Weight<div>';
    html += '<input type="text" name="name" style="margin-left: 3vw">';
    html += '<div><div>';
    html += "Image: ";
    html += '<input type="text" name="img" style="margin-left: 2.8vw">';
    html += '<div><div>';
    html += "Height: ";
    html += '<input type="text" name="height" style="margin-left: 2.5vw">';
    html += '<div><div>';
    html += "Weight: ";
    html += '<input type="text" name="weight" style="margin-left: 2.3vw">';
    html += '<div><div>';
    html += '<br>';
    // html += '<button>Sort by name</button>'
    html += '<input type="submit" value="Submit">';
    html += "</form>";
    html += "</body>";
    html += "</html>";

    response.send(html);
});

//Post

//when someone makes a response
app.post('/pokemon', function(request, response) {
    // console.log(request.body);
    var userInput = request.body; //pokemonObject is an object containing users inputs
    // let newObject = {
    //     id: parseInt(pokemonObject['id']),
    //     num: pokemonObject['num'],
    //     img: ['img'],
    //     height: ['height'],
    //     weight: ['weight']
    // };

//function readfile has 2 parameters, first one is the target file, the second one is a callback function with 2 parameters
    jsonfile.readFile(FILE,(error,object) => {
        // console.log(object);
        object.pokemon.push(userInput);

        // save the request body
        jsonfile.writeFile(FILE, object, (err) => {
            console.error(err)
        })
    })

    // now look inside your json file
    response.send("Success");
});


// app.post('/pokemon', (request, response) =>{
//     console.log(request.body);
//     var requestOrd = request.body;
//     let file = 'pokedex.json';

//     //const obj = request.body;
//     let objFromHtml = {
//         id: parseInt(requestOrd['id']),
//         num: requestOrd['num'],
//         name: requestOrd['name'],
//         img: requestOrd['img'],
//         height: requestOrd['height'],
//         weight: requestOrd['weight']
//     }

//     jsonfile.readFile(file, (err,obj)=>{
//         obj['pokemon'].push(objFromHtml);

//         jsonfile.writeFile(file, obj, function(err){
//             if (err){
//                 console.log("ERROR: ", err);
//             }
//             response.send("Yay added successfully!");
//         });

//     })

// })

// app.get('/:id', (request, response) => {

//     // get json from specified file
//     jsonfile.readFile(FILE, (err, obj) => {
//         // obj is the object from the pokedex json file
//         // extract input data from request
//         let inputId = parseInt(request.params.id);

//         var pokemon;

//         // find pokemon by id from the pokedex json file
//         for (let i = 0; i < obj.pokemon.length; i++) {

//             let currentPokemon = obj.pokemon[i];

//             if (currentPokemon.id === inputId) {
//                 pokemon = currentPokemon;
//             }
//         }

//         if (pokemon === undefined) {

//             // send 404 back
//             response.status(404);
//             response.send("not found");
//         } else {

//             response.send(pokemon);
//         }
//     });
// });

//Get server up to listen for request
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));