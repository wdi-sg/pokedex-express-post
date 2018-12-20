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

 // Set up method-override for PUT and DELETE forms
const methodOverride = require('method-override')
app.use(methodOverride('_method'));

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

app.get("/pokemon", (request, response) => {
    jsonfile.readFile(FILE, (err, obj) => {
        let pokeList = {};
        pokeList.pokemon = obj.pokemon;
        for(let i = 0; i < obj.pokemon.length; i++){
            if(request.query.sortby == "asc"){
                pokeList.pokemon.sort((a, b) => {
                    if (a.name < b.name){
                        return -1;
                    }
                    if (a.name > b.name){
                        return 1;
                    }
                });
            }
            else if(request.query.sortby == "desc"){
                pokeList.pokemon.sort((a, b) => {
                    if (a.name > b.name){
                        return -1;
                    }
                    if (a.name < b.name){
                        return 1;
                    }
                });
            }
            else if(request.query.sortby == "id"){
                pokeList.pokemon.sort((a, b) => {
                    if (a.id < b.id){
                        return -1;
                    }
                    if (a.id > b.id){
                        return 1;
                    }
                });
            }
            else if(request.query.sortby == "height"){
                pokeList.pokemon.sort((a, b) => {
                    if (a.height < b.height){
                        return -1;
                    }
                    if (a.height > b.height){
                        return 1;
                    }
                });
            }
            else if(request.query.sortby == "weight"){
                pokeList.pokemon.sort((a, b) => {
                    if (a.weight < b.weight){
                        return -1;
                    }
                    if (a.weight > b.weight){
                        return 1;
                    }
                });
            }
            else{
                pokeList.pokemon.sort((a, b) => {
                    return a - b;
                });
            }
        }

        response.render('pokehome', pokeList);
    });
});

app.get('/pokemon/new', (request, response) => {
    response.render('pokenew');
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

app.get('/pokemon/type', (request, response) => {
    response.render('poketype');
});

app.post('/pokemon/addtype', (request, response) => {
  let addType = request.body.poketype.charAt(0).toUpperCase() + request.body.poketype.slice(1);
  let pokeName = request.body.pokename.charAt(0).toUpperCase() + request.body.pokename.slice(1);
  console.log(pokeName);
  jsonfile.readFile(FILE, (err, obj) => {
    for(let t = 0; t < obj.pokemon.length; t++){
      if(obj.pokemon[t].name == pokeName){
        if(obj.pokemon[t].type == undefined){
          obj.pokemon[t].type = '';
        }
        if(obj.pokemon[t].type.includes(addType)){
          response.send(addType + " type already exist! " + " type have already been added to " + pokeName + " before");
        }
        else{
          obj.pokemon[t].type += ', ' + addType;
            jsonfile.writeFile(FILE, obj, (err) => {
                console.log(err);
            });
          response.send("Congratulation " + addType + " type have been added to the pokemon " + pokeName);
        }
      }
    }
    });
});

app.put('/pokemon/:id', (request, response) => {
    jsonfile.readFile(FILE, (err, obj) => {
        let pokeId = parseInt(request.params.id);
        let editPoke;
        for(let i = 0; i < obj.pokemon.length; i++){
            if(obj.pokemon[i].id === pokeId){
                obj.pokemon[i].name = request.body.name;
                obj.pokemon[i].img = request.body.img;
                obj.pokemon[i].height = request.body.height;
                obj.pokemon[i].weight = request.body.weight;
                obj.pokemon[i].candy = request.body.candy;
                obj.pokemon[i].egg = request.body.egg;
                obj.pokemon[i].avg_spawns = request.body.avgspawns;
                obj.pokemon[i].spawn_time = request.body.spawntime;
                obj.pokemon[i].type = request.body.type;
                editPoke = obj.pokemon[i];
            }
        }
        response.render('pokeedited', editPoke);

        jsonfile.writeFile(FILE, obj, (err) => {
        });
    });
});

app.get('/pokemon/:id/edit', (request, response) => {
    jsonfile.readFile(FILE, (err, obj) => {
        let pokeObj = {};
        pokeObj.pokemon = [];
        pokeObj.input = parseInt(request.params.id);
        for(let n = 0; n < obj.pokemon.length; n++){
            if(parseInt(request.params.id) === obj.pokemon[n].id){
                pokeObj.pokemon.push(obj.pokemon[n]);
            }
        }
        response.render('pokeedit', pokeObj);
    });
});

app.get('/pokemon/:id/detail', (request, response) => {
    jsonfile.readFile(FILE, (err, obj) => {
        let pokeDetail = {};
        pokeDetail.pokemon = [];
        pokeDetail.input = parseInt(request.params.id);
        for(let d = 0; d < obj.pokemon.length; d++){
            if(parseInt(request.params.id) === obj.pokemon[d].id){
                pokeDetail.pokemon.push(obj.pokemon[d]);
            }
        }
    response.render('pokedetail', pokeDetail);
    });
});

app.get('/pokemon/:type/typedetail', (request, response) => {
    jsonfile.readFile(FILE, (err, obj) => {
        let pokeTDetail = {};
        pokeTDetail.pokemon = [];
        pokeTDetail.input = request.params.type;
        for(let t = 0; t < obj.pokemon.length; t++){
            if(request.params.type === obj.pokemon[t].type){
                pokeTDetail.pokemon.push(obj.pokemon[t]);
            }
        }
    response.render('poketypedetail', pokeTDetail);
    });
});

/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));
