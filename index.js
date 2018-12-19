const express = require('express');
const jsonfile = require('jsonfile');
// Init express app
const app = express();

const FILE = 'pokedex.json';

/**
 * ===================================
 * Configurations and set up
 * ===================================
 */

const reactEngine = require('express-react-views').createEngine();
app.engine('jsx', reactEngine);

// this tells express where to look for the view files
app.set('views', __dirname + '/views');

// this line sets react to be the default view engine
app.set('view engine', 'jsx');

// tell your app to use the module
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

/**
 * ===================================
 * Routes
 * ===================================
 */

// function sortNumber(a, b){
//     return a - b;
// }

app.get("/pokemon", (request, response) => {
    let pokeList = [];
    jsonfile.readFile(FILE, (err, obj) => {
        for(let i = 0; i < obj.pokemon.length; i++){
            if(request.query.sortby == "name"){
                obj.pokemon.sort();
                pokeList.push(obj.pokemon[i].name);
            }
            else if(request.query.sortby == "id"){
                obj.pokemon.sort((a, b) => {
                    return a - b;
                });
                pokeList.push(obj.pokemon[i].name);
            }
            else if(request.query.sortby == "height"){
                obj.pokemon.sort((a, b) => {
                    if (a.height < b.height){
                        return -1;
                    }
                    if (a.height > b.height){
                        return 1;
                    }
                });
                pokeList.push(obj.pokemon[i].name);
            }
            else if(request.query.sortby == "weight"){
                obj.pokemon.sort((a, b) => {
                    if (a.weight < b.weight){
                        return -1;
                    }
                    if (a.weight > b.weight){
                        return 1;
                    }
                });
                pokeList.push(obj.pokemon[i].name);
            }
            else{
                obj.pokemon.sort((a, b) => {
                    return a - b;
                });
                pokeList.push(obj.pokemon[i].name);
            }
        }

        let joinArr = pokeList.join("<br>");

        response.send('<form method="GET" action="/pokemon">' + '<select name="sortby">' +
                '<option value="name">' + 'Name' + '</option>' + '<option value="id">' + 'ID' + '</option>' + '<option value="height">' + 'Height' + '</option>' + '<option value="weight">' + 'Weight' + '</option>' + '</select>' + '&nbsp' +
                '<input type="submit" value="sort"> ' +
                '</form>' + "Welcome to the online Pokedex! Here are the list of pokemon currently in the Pokedex:- <br><br>" + joinArr);
    });
});

app.post('/pokemon/add', (request, response) => {
    // get json from specified file
    jsonfile.readFile(FILE, (err, obj) => {
        // obj is the object from the pokedex json file
        // extract input data from request
        let x = true;
        let newPoke = {
            id: parseInt(obj.pokemon.length + 1),
            num: (obj.pokemon.length + 1).toString(),
            name: request.body.name.charAt(0).toUpperCase() + request.body.name.slice(1),
            img: request.body.img,
            height: request.body.height,
            weight: request.body.weight
        }

        // let inputId = parseInt(request.body.id);
        // find pokemon by id from the pokedex json file
        for(let i = 0; i < obj.pokemon.length; i++){

          let currentPokemon = obj.pokemon[i];

          if(currentPokemon.id === newPoke.id){
            x = false
          }
        }

        if(x === true){
            // If no existing id in pokedex push user input
            obj.pokemon.push(newPoke);
            response.send(newPoke);
        }
        else if(x === false){
            // throw error if id already exist in pokedex till 151 only
            response.status(404).send("Error in creating new pokemon. Please put ID after " + inputId);
        }
        else if(newPoke === undefined){
          // send 404 back
          response.status(404).send("Error");
        }

        jsonfile.writeFile(FILE, obj, (err) => {
            console.log(err);
        });
    });
});

app.get('/pokemon/new', (request, response) => {
    response.send('<form method="POST" action="/pokemon/add">' +
    'Create a new Pokemon: ' + '<br><br>' +
    'Pokemon Id: ' +
    '<input type="text" name="id" placeholder="Auto generated"> ' + '<br>' +
    'Pokemon Num: ' +
    '<input type="text" name="num" placeholder="Auto generated"> ' + '<br>' +
    'Pokemon Name: ' +
    '<input type="text" name="name"> ' + '<br>' +
    'Pokemon Img: ' +
    '<input type="text" name="img"> ' + '<br>' +
    'Pokemon Height: ' +
    '<input type="text" name="height"> ' + '<br>' +
    'Pokemon Weight: ' +
    '<input type="text" name="weight"> ' + '<br><br>' +
    '<input type="submit" value="Submit"> ' +
    '</form>');
});

app.post('/pokemon/addtype', (request, response) => {
  let addType = request.body.poketype;
  let pokeName = request.body.pokename.charAt(0).toUpperCase() + request.body.pokename.slice(1);
  console.log(pokeName);
  jsonfile.readFile(FILE, (err, obj) => {
    for(let t = 0; t < obj.pokemon.length; t++){
      if(obj.pokemon[t].name == pokeName){
        if(obj.pokemon[t].type == undefined){
          obj.pokemon[t].type = [];
        }
        if(obj.pokemon[t].type.includes(addType)){
          response.send(addType + " type already exist! " + " type have already been added to " + pokeName + " before");
        }
        else{
          obj.pokemon[t].type.push(addType);
            jsonfile.writeFile(FILE, obj, (err) => {
                console.log(err);
            });
          response.send(addType + " type have been added to the pokemon " + pokeName);
        }
      }
    }
    });
});


app.get('/pokemon/type', (request, response) => {
    jsonfile.readFile(FILE, (err, obj) => {
        response.send('<form method="POST" action="/pokemon/addtype">' +
                '<input type="text" name="pokename" placeholder="Insert pokemon name"> ' + '&nbsp' + '<select name="poketype">' +
                '<option value="fire">' + 'Fire' + '</option>' + '<option value="water">' + 'Water' + '</option>' + '<option value="grass">' + 'Grass' + '</option>' + '<option value="electric">' + 'Electric' + '</option>' + '<option value="ground">' + 'Ground' + '</option>' + '<option value="rock">' + 'Rock' + '</option>' + '<option value="flying">' + 'Flying' + '</option>' + '<option value="fighting">' + 'Fighting' + '</option>' + '</select>' + '&nbsp' +
                '<input type="submit" value="Add"> ' +
                '</form>' + "What typing do you want to add to existing pokemon?<br><br>");
    });
});

app.get('/pokemon/:id', (request, response) => {
    var userInput = parseInt(request.params.id);
    jsonfile.readFile(FILE, (err, obj) => {
        for(let n = 0; n < obj.pokemon.length; n++){
            if(userInput === obj.pokemon[n].id){
                response.send(obj.pokemon[n]);
            }
        }
    });
});

// app.get("/greet/:name/:lastname", (request, response) => {
//   response.send("Hello " + request.params.name + " " + request.params.lastname)
//   console.log(request);
// });

/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));
