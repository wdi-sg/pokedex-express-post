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

function compareHt(a, b) {
    if (a.height < b.height){
        return -1;
    }
    if (a.height > b.height){
        return 1;
    }
    return 0;
}

function compareWt(a, b) {
    if (a.weight < b.weight){
        return -1;
    }
    if (a.weight > b.weight){
        return 1;
    }
    return 0;
}

function compareId(a, b) {
    return a - b;
}


app.get("/", (request, response) => {
    let pokeMainList = [];
    let pokeList = [];
    let pokeIdList = [];
    let pokeIdNew = [];
    let pokeHtList = [];
    let pokeHtNew = [];
    let pokeWtList = [];
    let pokeWtNew = [];
    jsonfile.readFile(FILE, (err, obj) => {
        // pokeHtList.push(obj.pokemon.sort(compareHt));
        var joinArr = pokeMainList.join("<br>");
        for(let i = 0; i < obj.pokemon.length; i++){
            // pokeList.push(obj.pokemon[i].name);
            // pokeIdList.push(obj.pokemon[i].id);
                if(request.query.sortby == "name"){
                    pokeList.push(obj.pokemon[i].name);
                    // joinArr = pokeList.join("<br>");
                    // console.log(pokeList);
                    // joinArr = pokeList.join("<br>");
                }
                else if(request.query.sortby == "id"){
                    pokeIdList.push(obj.pokemon[i]);
                    // joinArr = pokeList.join("<br>");
                    // console.log(pokeList);
                }
                else if(request.query.sortby == "height"){
                    pokeHtList.push(obj.pokemon[i]);
                    // joinArr = pokeList.join("<br>");
                }
                else if(request.query.sortby == "weight"){
                    pokeWtList.push(obj.pokemon[i]);
                    // joinArr = pokeList.join("<br>");
                }
                else{
                    pokeMainList.push(obj.pokemon[i].name);
                }
        }

        if(request.query.sortby == "name"){
            pokeList.sort();
            joinArr = pokeList.join("<br>");
            // console.log(pokeList);
            // joinArr = pokeList.join("<br>");
        }
        else if(request.query.sortby == "id"){
            pokeIdList.sort(compareId);
            // console.log(pokeIdList);
            for(let d = 0; d < pokeIdList.length; d++){
                pokeIdNew.push(pokeIdList[d].name);
            }
            joinArr = pokeIdNew.join("<br>");
        }
        else if(request.query.sortby == "height"){
            pokeHtList.sort(compareHt);
            for(let h = 0; h < pokeHtList.length; h++){
                pokeHtNew.push(pokeHtList[h].name);
            }
            joinArr = pokeHtNew.join("<br>");
        }
        else if(request.query.sortby == "weight"){
            pokeWtList.sort(compareWt);
            for(let w = 0; w < pokeWtList.length; w++){
                pokeWtNew.push(pokeWtList[w].name);
            }
            joinArr = pokeWtNew.join("<br>");
        }
        else{
            joinArr = pokeMainList.join("<br>");
        }

        response.send('<form method="GET" action="/">' + '<select name="sortby">' +
                '<option value="name">' + 'Name' + '</option>' + '<option value="id">' + 'ID' + '</option>' + '<option value="height">' + 'Height' + '</option>' + '<option value="weight">' + 'Weight' + '</option>' + '</select>' + '&nbsp' +
                '<input type="submit" value="sort"> ' +
                '</form>' + "Welcome to the online Pokedex! Here are the list of pokemon currently in the Pokedex:- <br><br>" + joinArr );
        // response.send("Welcome to the online Pokedex! Here are the list of pokemon currently in the Pokedex sorted by name:- \n\n" + pokeList + '</form>');
    });
});

app.post('/pokemon', function(request, response) {
    // get json from specified file
    jsonfile.readFile(FILE, (err, obj) => {
        // obj is the object from the pokedex json file
        // extract input data from request
        let x = true;
        let newPoke = {
            id: parseInt(obj.pokemon.length + 1),
            num: (obj.pokemon.length + 1).toString(),
            name: request.body.name,
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
    // jsonfile.readFile(FILE, (err, obj) => {
    //     response.send(obj);
    // });
});

app.get('/pokemon/new', (request, response) => {
    response.send('<form method="POST" action="/pokemon">' +
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


// app.post('/pokemon', function(request, response) {
//     // console.log(request.body.name);
//     // get json from specified file
//     jsonfile.readFile(FILE, (err, obj) => {
//         // obj is the object from the pokedex json file
//         // extract input data from request
//         let inputId = parseInt(request.body.name);

//         var pokemon;

//         // find pokemon by id from the pokedex json file
//         for(let i = 0; i < obj.pokemon.length; i++){

//           let currentPokemon = obj.pokemon[i];

//           if(currentPokemon.id === inputId){
//             pokemon = currentPokemon;
//           }
//         }

//         if(pokemon === undefined) {

//           // send 404 back
//           response.status(404).send("not found");
//         } else {

//           response.send(pokemon);
//         }
//       });
// });

/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));
