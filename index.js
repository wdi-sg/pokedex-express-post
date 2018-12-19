/**
 * ===================================
 * Configs
 * ===================================
 */
const express = require('express');
const jsonfile = require('jsonfile');
const pokedex = 'pokedex.json';
const app = express();
const Request = require("request");
const methodOverride = require('method-override')
app.use(methodOverride('_method'));
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
// this line below, sets a layout look to your express project
const reactEngine = require('express-react-views').createEngine();
app.engine('jsx', reactEngine);
// this tells express where to look for the view files
app.set('views', __dirname + '/views');
// this line sets react to be the default view engine
app.set('view engine', 'jsx');

/**
 * ===================================
 * Routes
 * ===================================
 */

//REACT REFACTORING
//homepage. display all with sort
app.get('/', (request, response) => {
    jsonfile.readFile(pokedex, (err, obj) => {

        let pokedexAndSort = {};
        pokedexAndSort.pokedex = obj.pokemon;
        pokedexAndSort.sortby = request.query.sortby;

        response.render("pokemons", pokedexAndSort);
    });
});
app.get('/pokemon', (request, response) => {
    jsonfile.readFile(pokedex, (err, obj) => {

        let pokedexAndSort = {};
        pokedexAndSort.pokedex = obj.pokemon;
        pokedexAndSort.sortby = request.query.sortby;

        response.render("pokemons", pokedexAndSort);
    });
});

//new pokemon form page
app.get("/pokemon/new", (request,response) => {
    response.render("newpokemon");
});

//create new pokemon
app.post("/pokemon/new", (request,response) => {
    jsonfile.readFile(pokedex, (err, obj) => {
        let currentPokedex = obj;
        let randomPokemon;
        if (request.body.name === "random") {
            //I'm not stopping repeated pokemons
            let randomNum = Math.floor(Math.random() * 809 + 1);
            Request.get("https://pokeapi.co/api/v2/pokemon/" + randomNum + "/", (error, reqres, body) => {
                if(error) {
                    return console.dir(error);
                }
                randomPokemon = JSON.parse(body);
                let newPokemon = {
                  "id": currentPokedex.pokemon.length+1,
                  "num": (currentPokedex.pokemon.length+1).toString(),
                  "name": randomPokemon.name,
                  "img": `https://www.serebii.net/pokemongo/pokemon/${randomPokemon.id}.png`,
                  "height": `${randomPokemon.height/10} m`,
                  "weight": `${randomPokemon.weight/10} kg`,
                  "candy": "",
                  "candy_count": "",
                  "egg": "",
                  "avg_spawns": "",
                  "spawn_time": ""
                };
                currentPokedex.pokemon.push(newPokemon);
                jsonfile.writeFile("pokedex.json", currentPokedex, (err) => {
                    console.log(err);
                    response.render("pokemon", newPokemon);
                });
            });
        } else {
            let newPokemon = {
              "id": currentPokedex.pokemon.length+1,
              "num": (currentPokedex.pokemon.length+1).toString(),
              "name": request.body.name,
              "img": request.body.img,
              "height": request.body.height,
              "weight": request.body.weight,
              "candy": "",
              "candy_count": "",
              "egg": "",
              "avg_spawns": "",
              "spawn_time": ""
            };
            currentPokedex.pokemon.push(newPokemon);
            jsonfile.writeFile("pokedex.json", currentPokedex, (err) => {
                console.log(err);
                response.render("pokemon", newPokemon);
            });
        };
    });
});

//Individual Pokemon's Page
app.get('/pokemon/:id', (request, response) => {
  // get json from specified file
  jsonfile.readFile(pokedex, (err, obj) => {
    // obj is the object from the pokedex json file
    // extract input data from request
    let inputId = parseInt( request.params.id );
    let pokemon;
    // find pokemon by id from the pokedex json file
    for( let i=0; i<obj.pokemon.length; i++ ){
      let currentPokemon = obj.pokemon[i];
      if( currentPokemon.id === inputId ){
        pokemon = currentPokemon;
        response.render('pokemon', pokemon);
      }
    }
    if (pokemon === undefined) {
      // send 404 back
      response.status(404);
      response.send("not found");
    }
  });
});

//Update Individual Pokemon's Data
app.put('/pokemon/:id', (request, response) => {
    jsonfile.readFile(pokedex, (err, obj) => {
        let currentId = parseInt(request.body.id);
        let currentPokedex = obj;
        let pokemon;
        for (let i = 0; i < currentPokedex.pokemon.length; i++) {
            if (currentPokedex.pokemon[i].id === currentId) {
                currentPokedex.pokemon[i].name = request.body.name;
                currentPokedex.pokemon[i].img = request.body.img;
                currentPokedex.pokemon[i].height = request.body.height;
                currentPokedex.pokemon[i].weight = request.body.weight;
                currentPokedex.pokemon[i].type = request.body.type;
                pokemon = currentPokedex.pokemon[i];
            }
        }
        jsonfile.writeFile('pokedex.json', currentPokedex ,(err) => {
            console.log(err);
            response.render("pokemon", pokemon);
        });
    });
});

//Delete This Pokemon
app.delete('/pokemon/:id', (request, response) => {
    jsonfile.readFile(pokedex, (err, obj) => {
        let currentId = parseInt(request.body.id);
        let deletedPokedex = obj.pokemon.filter( (value, index, arr) => {
            return value.id != currentId;
        });

        for (let i = 0; i < deletedPokedex.length; i++) {
                deletedPokedex[i].id = i+1;
                deletedPokedex[i].num = i+1;
        }

        deletedPokedex = {
            'newPokedex': {'pokemon': deletedPokedex},
            'pokedex': deletedPokedex,
            'sortby': "num"
        }

        jsonfile.writeFile('pokedex.json', deletedPokedex.newPokedex ,(err) => {
            console.log(err);
            response.render("pokemons", deletedPokedex);
        });
    });
});

/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));