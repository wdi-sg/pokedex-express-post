const express = require('express');
const jsonfile = require('jsonfile');

const FILE = 'pokedex.json';



/**
 * ===================================
 * Configurations and set up
 * ===================================
 */

// Init express app
const app = express();

/**
 * ===================================
 * Routes
 * ===================================
 */

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

var createHtmlPagePokemon = function(request, response){
    jsonfile.readFile(FILE, (err, obj) =>{
        var newEmpArray = [];
        var pokemonObj = obj.pokemon;
        var html = '<html><body><h1>Form for new pokemon: </h1>';
        html += '<form method="POST" action="/pokemon">';
        html += 'Id Number:<br> <input type="text" name="id"><br>';
        html += 'Number:<br> <input type="text" name="num"><br>';
        html += 'Name:<br> <input type="text" name="name"><br>';
        html += 'Image:<br> <input type="text" name="img"><br>';
        html += 'Height:<br> <input type="text" name="height"><br>';
        html += 'Weight:<br> <input type="text" name="weight"><br>';
        html += '<input type="submit" value="Submit"><br>';
        html += '</form></body></html>';

        //console.log(html);
        response.send(html);
    })
}

app.get('/pokemon/new', createHtmlPagePokemon);

app.post('/pokemon', (request, response) =>{
    //console.log(request.body);
    var requestOrd = request.body;
    let file = 'pokedex.json';
    //const obj = request.body;
    let objFromHtml = {
        id: parseInt(requestOrd['id']),
        num: requestOrd['num'],
        name: requestOrd['name'],
        img: requestOrd['img'],
        height: requestOrd['height'],
        weight: requestOrd['weight']
    }

    jsonfile.readFile(file, (err,obj)=>{
        obj['pokemon'].push(objFromHtml);

        jsonfile.writeFile(file, obj, function(err){
            if (err){
                console.log("ERROR: ", err);
            }
            response.send("Yay added successfully!");
        });

    })


})

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

app.get('/', (request, response) => {
  //create a sort by button
  let buttonPage = '';
  buttonPage += '<html><body><h1>How do you want to sort the pokemons:  </h1><br>';
  //buttonPage += '<input type="button" value="Sort By Name">';
  buttonPage += '<form action="/pokemon"><select name="sortby">';
  buttonPage += '<option value="name">name</option>';
  buttonPage += '<option value="id">id</option>';
  buttonPage += '<option value="height">height</option>';
  buttonPage += '<option value="weight">weight</option>';
  buttonPage += '</select><br><br><input type="submit"></form>';
  buttonPage += '</body></html>';


  response.send(buttonPage);
  console.log(request.query);

});

app.get('/pokemon', (request, response) => {
    //console.log(request.query.sortby
    jsonfile.readFile(FILE,(err, obj) => {
        if (err){
            response.status(404).send(err);
        }
        if (request.query.sortby == 'name'){
            let sortedName = obj.pokemon.sort(compareName);
            let nameList = '';
            for (var i = 0; i < sortedName.length; i++){
                let list = '<li>' + sortedName[i].name + '</li>';
                nameList += list;
            }

            var pageNameQuery = '';
            pageNameQuery += '<html><body><h1>List of pokemon sorted by name: </h1><ul>' + nameList + '</ul></body></html>';

            response.send(pageNameQuery);
        }
        else if (request.query.sortby == 'id'){
            let sortedId = obj.pokemon.sort(compareId);
            let sortByIdList = '';
            for (var i = 0; i < sortedId.length; i++){
                let list = '<li>' + sortedId[i].name + '</li>';
                sortByIdList += list;
            }
            var pageNameQuery = '';
            pageNameQuery += '<html><body><h1>List of pokemon sorted by ID: </h1><ul>' + sortByIdList + '</ul></body></html>';
            response.send(pageNameQuery);

        }

        //Weight and height are in strings, maybe need to substring the string, then parseFloat to compare the float value
        // else if (request.query.sortby == 'height'){
        //     let sortedHeight = obj.pokemon.sort(compareHeight);
        //     let sortByHeightList = '';
        //     for (var i = 0; i < sortedHeight.length; i++){
        //         let list = '<li>' + sortedHeight[i].name + '</li>';
        //         sortByHeightList += list;
        //     }
        //     var pageNameQuery = '';
        //     pageNameQuery += '<html><body><h1>List of pokemon sorted by Height: </h1><ul>' + sortByHeightList + '</ul></body></html>';
        //     response.send(pageNameQuery);
        // }

        // else if (request.query.sortby == 'weight'){
        //     let sortedWeight = obj.pokemon.sort(compareWeight);
        //     let sortByWeightList = '';
        //     for (var i = 0; i < sortedWeight.length; i++){
        //         let list = '<li>' + sortedWeight[i].name + '</li>';
        //         sortByWeightList += list;
        //     }
        //     var pageNameQuery = '';
        //     pageNameQuery += '<html><body><h1>List of pokemon sorted by Height: </h1><ul>' + sortByWeightList + '</ul></body></html>';
        //     response.send(pageNameQuery);

        // }


    });
});

//write a function that sort arrays of object by string property in Javascript
var compareName = function(a,b){
    if (a.name < b.name){
        return -1;
    }
    if (a.name > b.name){
        return +1;
    }
    return 0;
}

var compareId = function(a,b){
    if (a.id < b.id){
        return -1;
    }
    if (a.id > b.id){
        return +1;
    }
    return 0;
}

// var compareHeight = function(a,b){
//     if (a.height < b.height){
//         return -1;
//     }
//     if (a.height > b.height){
//         return +1;
//     }
//     return 0;
// }

// var compareWeight = function(a,b){
//     if (a.weight < b.weight){
//         return -1;
//     }
//     if (a.weight > b.weight){
//         return +1;
//     }
//     return 0;
// }

/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));
