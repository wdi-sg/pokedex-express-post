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

// Tell your app to use the module
app.use(express.static(__dirname+'/public/'));
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

// this line below, sets a layout look to your express project
const reactEngine = require('express-react-views').createEngine();
app.engine('jsx', reactEngine);

const methodOverride = require('method-override')
app.use(methodOverride('_method'));

// this tells express where to look for the view files
app.set('views', __dirname + '/views');

// this line sets react to be the default view engine
app.set('view engine', 'jsx');

/**
 * ===================================
 * Routes
 * ===================================
 */

//At the root route (GET request) / display a list of all the pokemons in the pokedex
app.get('/pokemon/', (request, response) => {
    jsonfile.readFile(FILE, (err, obj) => {

//  Create dropdown options button
        let dropDownOptions =
        `<form action="/" method="GET">
            <select name="sortby">
                <option value="name">Name</option>
                <option value="id">ID</option>
                <option value="height">Height</option>
                <option value="weight">Weight</option>
            </select>
            <input type="submit">
        </form>
        `

//  Display a list off all the Pokemons
        let listOfPokemon = obj.pokemon.map(eachPokemon => {
            return eachPokemon; })

//  Sorting
        if (request.query.sortby === 'name') {
            let printOut = '';
            let sortedByName = listOfPokemon.sort((a,b) =>  (a.name > b.name) ? 1 : (b.name > a.name) ? -1 : 0);
            sortedByName.forEach((poke,index) => { printOut += `${index+1}. ${poke.name} <br>`});
            response.send(`List of Pokemons: <br> ${dropDownOptions} ${printOut}`);
        }

        else if (request.query.sortby === 'id') {
            let printOut = '';
            let sortedById = listOfPokemon.sort((a,b) => {a.id - b.id});
            sortedById.forEach((poke,index) => { printOut += `${index+1}. ${poke.name} <br>`});
            response.send(`List of Pokemons: <br>${dropDownOptions} ${printOut}`);
        }

        else if (request.query.sortby === 'height') {
            let printOut = '';
            let sortedByHeight = listOfPokemon.sort((a,b) => {return parseFloat(a.height) - parseFloat(b.height)});
            sortedByHeight.forEach((poke,index) => { printOut += `${index+1}. ${poke.name} ${poke.height} <br>`});
            response.send(`List of Pokemons: <br>${dropDownOptions} ${printOut}`);
        }

        else if (request.query.sortby === 'weight') {
            let printOut = '';
            let sortedByWeight = listOfPokemon.sort((a,b) => {return parseFloat(a.weight) - parseFloat(b.weight)});
            sortedByWeight.forEach((poke,index) => { printOut += `${index+1}. ${poke.name} ${poke.weight} <br>`});
            response.send(`List of Pokemons: <br>${dropDownOptions} ${printOut}`);
        }

        else {
            let printOut = '';
            listOfPokemon.forEach((poke,index) => { printOut += `${index+1}. ${poke.name} <br>`});
            response.send(`List of Pokemons: <br> ${dropDownOptions} ${printOut}`);
        }

    });
});



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



//      Post to JSON file       //
app.post('/pokemon', (request, response) => {
    jsonfile.readFile(FILE, (err, obj) => {

//  Check if iD input is already taken
    let listOfId = obj.pokemon.map(eachPokemon => {
        return eachPokemon.id});

    if (listOfId.includes(parseInt(request.body.id))) {
        response.status(404).send("Error in creating new pokemon. ID is already taken.");
    }
    else {
        newPokemonObj = {};
        newPokemonObj["id"] = parseInt(request.body.id);
        newPokemonObj["num"] = request.body.num;
        newPokemonObj["name"] = request.body.name;
        newPokemonObj["img"] = request.body.img;
        newPokemonObj["height"] = request.body.height;
        newPokemonObj["weight"] = request.body.weight;
        obj.pokemon.push(newPokemonObj);
        response.send(newPokemonObj);
    }

        jsonfile.writeFile(FILE, obj, (err) => {
            console.error(err);
        });
    });
});


//      Create form @ '/pokemon/new' *route       //
app.get('/pokemon/new', (request, response) => {
    let form =
    `<html>
        <body>
            <form action="/pokemon" method="POST">
                <input type="text" name="id" placeholder="Id"><br>
                <input type="text" name="num" placeholder="num"><br>
                <input type="text" name="name" placeholder="name"><br>
                <input type="text" name="img" placeholder="img"><br>
                <input type="text" name="height" placeholder="height"><br>
                <input type="text" name="weight" placeholder="weight"><br>
                <input type="submit"/>
            </form>
        </body>
    </html>`

  response.send(form);
});


app.get('/pokemon/:id/edit', (req, res) => {
    jsonfile.readFile(FILE, (err,obj) => {

//      find pokemon by id from the pokedex json file
        let idList = obj.pokemon.map(eachPokemon => {return eachPokemon.id});
        var pokemon;
        for( let i=0; i<obj.pokemon.length; i++ ){
            let currentPokemon = obj.pokemon[i];
            if( currentPokemon.id === parseInt(req.params.id) ){
            pokemon = currentPokemon;
          }
        }

//      Checks if inputId is available or not
        if (idList.includes(parseInt(req.params.id))) {
            res.render('edit', pokemon);
        } else {
            res.status(404);
            res.send("not found");
        }
    })
})






app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));
