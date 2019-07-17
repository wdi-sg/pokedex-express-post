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

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

const reactEngine = require('express-react-views').createEngine();
app.engine('jsx', reactEngine);
app.set('views', __dirname + '/views');
app.set('view engine', 'jsx');


const methodOverride = require('method-override')
app.use(methodOverride('_method'));

app.use(express.static(__dirname + '/public'));

/**
 * ===================================
 * Functions
 * ===================================
 */

// Show pokemon function
const showPokemon = (request, response) => {
    let sortby = request.query.sortby;
    jsonfile.readFile(FILE, (err,obj)=> {
        if (err){
            console.log(err);
        }
        else {
            let pokedex = obj.pokemon;

            if (sortby) {
                switch (sortby) {
                    case "id":
                        pokedex.sort(sortByID);
                        break;
                    case "name":
                        pokedex.sort(sortByName);
                        break;
                    case "weight":
                        pokedex.sort(sortByWeight);
                        break;
                    case "height":
                        pokedex.sort(sortByHeight);
                        break;
                }
            }
            let data = {
                pokedex: pokedex
            };
            response.render('home',data)
        }
    });
};

// Show Add Pokemon form
const addPokemonForm = (request, response) => {
    response.render('add-form')
};

// Add Pokemon
const addPokemon = (request,response) => {
    let newPokemon = request.body;
    let existing = false;
    jsonfile.readFile(FILE, (err,obj)=> {
        if (err){
            console.log(err);
        }
        else {
            let pokedex = obj.pokemon;
            for (let pokemon of pokedex){
                if (pokemon.id === parseInt(newPokemon.id) || pokemon.num === newPokemon.num){
                    console.log(pokemon.id);
                    existing = true;
                    break;
                }
            }
            if (!existing) {
                let lastKey = obj.lastKey + 1;
                let pokemonObject = {
                    "id": lastKey,
                    "num": lastKey.toString(),
                    "name": newPokemon.name,
                    "img": newPokemon.img,
                    "height": newPokemon.height+" m",
                    "weight": newPokemon.weight+" kg"
                };
                obj.pokemon.push(pokemonObject);
                jsonfile.writeFile(FILE, obj, (err) =>{
                    response.send(`<h2>Added ${newPokemon.name}</h2><a href="/">View all Pokemon</a>`);
                })
            }
            else {
                response.send(`<h2>The Pokemon ID or num have already been taken.</h2><a href="/">View all Pokemon</a>`);
            }
        }
    })
};

// Show individual Pokemon details
const showPokemonDetails = (request,response) => {
    let id = parseInt(request.params.id);
    let content = "";
    jsonfile.readFile(FILE,(err,obj)=> {
        if (err) {
            console.log(err);
        }
        else {
            let pokedex = obj.pokemon;
            let data = {};
            for (let pokemon of pokedex) {
                if (id === pokemon.id) {
                    data.pokemon = pokemon;
                }
            }
            if (data.pokemon !== undefined) {
                response.render('pokemon', data);
            }
            else {
                response.send(`<h2>Pokemon Not Found</h2><a href="/">View all Pokemon</a>`);
            }
        }
    })
};

// Show Edit Pokemon form
const editPokemonForm = (request, response) => {
    let id = parseInt(request.params.id);
    jsonfile.readFile(FILE,(err,obj)=> {
        if (err) {
            console.log(err);
        }
        else {
            let pokedex = obj.pokemon;
            for (let pokemon of pokedex){
                if (id === pokemon.id){
                    var data = {
                        pokemon : pokemon
                    }
                }
            }
            response.render('edit-form',data)
        }
    });
};

// Update Pokemon details
const updatePokemonDetails = (request, response) => {
    let id = parseInt(request.params.id);
    jsonfile.readFile(FILE,(err,obj)=> {
        if (err) {
            console.log(err);
        }
        else {
            let pokedex = obj.pokemon;
            var updatedPokemon = null;
            for (var i=0;i<pokedex.length;i++) {
                var pokemon = pokedex[i];
                if (id === pokemon.id) {
                    let data = {};
                    updatedPokemon = {
                        "id": id,
                        "num": id.toString(),
                        "name": request.body.name,
                        "img": request.body.img,
                        "height": parseFloat(request.body.height) + " m",
                        "weight": parseFloat(request.body.weight) + " kg"
                    };
                    pokedex[i] = updatedPokemon;
                    jsonfile.writeFile(FILE, obj, (err) => {
                        if (err) {
                            console.log(err);
                        } else {
                            data.pokemon = updatedPokemon;
                            data.updated = true;
                            response.render('pokemon', data);
                        }
                    });
                }
            }
            if (updatedPokemon === null){
                response.send(`<h2>Pokemon not found</h2><a href="/">View all Pokemon</a>`);
            }
        }
    });
};

// Delete Pokemon form
const deletePokemonForm = (request, response) => {
    let id = parseInt(request.params.id);
    jsonfile.readFile(FILE,(err,obj)=> {
        if (err) {
            console.log(err);
        }
        else {
            let pokedex = obj.pokemon;
            for (let pokemon of pokedex){
                if (id === pokemon.id){
                    var data = {
                        pokemon : pokemon
                    }
                }
            }
            response.render('delete-form',data)
        }
    });
};

// Delete Pokemon details
const deletePokemonDetails = (request, response) => {
    let id = parseInt(request.params.id);
    jsonfile.readFile(FILE,(err,obj)=> {
        if (err) {
            console.log(err);
        }
        else {
            let pokedex = obj.pokemon;
            for (var i=0;i<pokedex.length;i++) {
                var pokemon = pokedex[i];
                if (id === pokemon.id) {
                    let name = pokemon.name;
                    pokedex.splice(i,1);
                    jsonfile.writeFile(FILE, obj, (err) => {
                        if (err) {
                            console.log(err);
                        } else {
                            response.send(`<h2>Pokemon deleted</h2><a href="/">View all Pokemon</a>`);
                        }
                    });
                }
            }
        }
    });
};

/**
 * ===================================
 * Sorting Algorithms
 * ===================================
 */

//Sort alphabetically
function sortByName(a, b) {
  // Use toUpperCase() to ignore character casing
  const nameA = a.name.toUpperCase();
  const nameB = b.name.toUpperCase();

  let comparison = 0;
  if (nameA > nameB) {
    comparison = 1;
  } else if (nameA < nameB) {
    comparison = -1;
  }
  return comparison;
}

//Sort by ID
function sortByID(a, b) {
  const indexA = a.id;
  const indexB = b.id;

  let comparison = 0;
  if (indexA > indexB) {
    comparison = 1;
  } else if (indexA < indexB) {
    comparison = -1;
  }
  return comparison;
}
//Sort by Weight
function sortByWeight(a, b) {
  const indexA = parseFloat(a.weight);
  const indexB = parseFloat(b.weight);

  let comparison = 0;
  if (indexA > indexB) {
    comparison = 1;
  } else if (indexA < indexB) {
    comparison = -1;
  }
  return comparison;
}
//Sort by Height
function sortByHeight(a, b) {
  const indexA = parseFloat(a.height);
  const indexB = parseFloat(b.height);

  let comparison = 0;
  if (indexA > indexB) {
    comparison = 1;
  } else if (indexA < indexB) {
    comparison = -1;
  }
  return comparison;
}

/**
 * ===================================
 * Routes
 * ===================================
 */


app.get('/', showPokemon);
app.put('/', showPokemon);

app.get('/pokemon/new', addPokemonForm);

app.post('/pokemon', addPokemon);

app.get('/pokemon/:id', showPokemonDetails);
app.put('/pokemon/:id', updatePokemonDetails);
app.delete('/pokemon/:id', deletePokemonDetails);

app.get('/pokemon/:id/edit', editPokemonForm);

app.get('/pokemon/:id/delete', deletePokemonForm);

/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));