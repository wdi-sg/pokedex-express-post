/**
 * ===================================
 * Configurations and Global Variables
 * ===================================
 */

const express = require('express');
const jsonfile = require('jsonfile');
const file = 'pokedex.json';
const app = express();
const reactEngine = require('express-react-views').createEngine();
app.engine('jsx', reactEngine);
app.set('views', __dirname + '/views');
app.set('view engine', 'jsx');
app.use(express.static(__dirname + '/public'));
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
const methodOverride = require('method-override')
app.use(methodOverride('_method'));

const homepage = 'home.jsx';
const editpage = 'edit.jsx';
const createpage = 'create.jsx';
const deletepage = 'delete.jsx';
const pokepage = 'poke.jsx';
//actually... there is no need to create these variables right but i guess its just neater

let pokeId = null;
let pokemonMatchingId = null;


/**
 * ===================================
 * Routes
 * ===================================
 */

 /*==== Redirect to front page ==== */
app.get('/', (request, response) => {
    response.redirect('/pokemon');
});

 /*==== Front Page ==== */

/*==== Front Page ==== */
app.get('/pokemon', (request, response) => {
    let sortRequest = request.query.sortby;

    jsonfile.readFile(file, (err, obj) => {
        if (err) {
            console.log("Something went wrong when displaying the front page.")
        }
        response.render(homepage, sortPokemon(sortRequest, obj));
    });
});

/*==== Creating Request for New Pokemon ==== */
app.get('/pokemon/new', (request, response) => {
    response.render(createpage);
});

/*==== Posting New Pokemon ==== */
app.post('/pokemon', (request, response) => {
    let newPoke = request.body;
    console.log(newPoke);

    jsonfile.readFile(file, (err, obj) => {
        if (err) {
            console.log("Something went wrong while trying to read Pokemon file.");
            console.log(err)
        }

        obj.pokemon.push(newPoke);

        jsonfile.writeFile(file, obj, (err) => {
            if (err) {
                console.log("Something went wrong while trying to add new Pokemon.");
                console.log(err);
            } else {
                console.log("New Pokemon successfully added to the Dex!");
                let url = "/pokemon/" + newPoke.id;
                response.redirect(url);
                //it goes to the right page but not sure why it crashes initially. tried with setTimeout also
            }
        });
    });
});

/*==== Requesting Single Poke Page ==== */
app.get('/pokemon/:id', (request, response) => {
    pokeId = parseInt(request.params.id);
    console.log(typeof pokeId);

    jsonfile.readFile(file, (err,obj) => {
        if (err) {
            console.log("Something went wrong when displaying the Poke page.")
        }

        pokemonMatchingId = obj.pokemon.find(pokemon => parseInt(pokemon.id) === pokeId);
        console.log(pokemonMatchingId);
        response.render(pokepage, pokemonMatchingId);
    });
})

/*==== Request Edit Page ==== */
app.get('/pokemon/:id/edit', (request, response) => {
    pokeId = parseInt(request.params.id);

    jsonfile.readFile(file, (err,obj) => {
        if (err) {
            console.log("Something went wrong when displaying the edit page.")
        }

        pokemonMatchingId = obj.pokemon.find(pokemon => parseInt(pokemon.id) === pokeId);
        //creates a "copy" of the matching poke but is not a direct reference to it (i think)
        response.render(editpage, pokemonMatchingId);
    });
})

/*==== Accepting Edit Request ==== */
app.put('/pokemon/:id', (request, response) => {
    let editedPoke = request.body;

    jsonfile.readFile(file, (err, obj) => {
        if (err) {
            console.log("Something went wrong while trying to read the file.");
            console.log(err)
        }

        let index = obj.pokemon.findIndex(pokemon => parseInt(pokemon.id) === pokeId);
        obj.pokemon[index] = editedPoke;

        jsonfile.writeFile(file, obj, (err) => {
            if (err) {
                console.log("There was an error writing the edited Pokemon to file.");
                console.log(err)
            } else {
                response.send(`${editedPoke.name} has been updated!`);
                //solve redirect issue faced in add pokemon and apply
            }
        });
    });
});

/*==== Request Delete Pokemon ==== */
app.get('/pokemon/:id/delete', (request, response) => {
    pokeId = parseInt(request.params.id);

    jsonfile.readFile(file, (err,obj) => {
        if (err) {
            console.log("Something went wrong when displaying the delete page.")
        }

        pokemonMatchingId = obj.pokemon.find(pokemon => parseInt(pokemon.id) === pokeId);
        response.render(deletepage, pokemonMatchingId);
    });
})

/*====  Delete Pokemon ==== */
app.delete('/pokemon/:id', (request, response) => {
    let byebyePoke = request.body;

    jsonfile.readFile(file, (err, obj) => {
        if (err) {
            console.log("Something went wrong while trying to read the file.");
            console.log(err)
        }

        let index = obj.pokemon.findIndex(pokemon => parseInt(pokemon.id) === pokeId);
        obj.pokemon.splice(index, 1);

        jsonfile.writeFile(file, obj, (err) => {
            if (err) {
                console.log("There was an error deleting Pokemon from file.");
                console.log(err)
            } else {
                response.send(`${byebyePoke.name} has been deleted!`);
                //update to show default home page
            }
        });
    });
});

/**
 * ===================================
 * Helper Functions
 * ===================================
 */

//* sortPokemon function: name/number/weight/height query(sortRequest) gets passed into sortPokemon function where it goes through a switch case to dynamically recreate pokemon obj each time, changing what is shown on home page *//

function sortPokemon(sortRequest, obj){
    switch(sortRequest) {
        case "name":
            return {"pokemon": obj.pokemon.sort(function(a,b) {
                if (a.name < b.name) //a goes higher
                    return -1
                if (a.name > b.name) //b goes higher
                    return 1
                return 0               //a and b remain "equal"
                })
            };

        //random important note: syntax-wise, it seems to break code if first return is on a line by itself (because return just ends the function?)

        //random important note 2: dot notation is a lot cleaner than bracket

        case "num":
            return {"pokemon": obj.pokemon.sort(function(a,b) {
                if (a.num < b.num)
                    return -1
                if (a.num > b.num)
                    return 1
                return 0
                }), "sortRequest": sortRequest
                //adds temporary property of sortRequest to obj
            };

        case "weight":
            return {"pokemon": obj.pokemon.sort(function(a,b) {
                if (a.weight < b.weight)
                    return -1
                if (a.weight > b.weight)
                    return 1
                return 0
                }), "sortRequest": sortRequest
            };

        case "height":
            return {"pokemon": obj.pokemon.sort(function(a,b) {
                if (a.height < b.height)
                    return -1
                if (a.height > b.height)
                    return 1
                return 0
                }), "sortRequest": sortRequest
            };

        default:
            obj["sortRequest"] = "num";
            return obj;
    }
};

/**
 * ===================================
 * To-Do
 * ===================================
 */

// redirect new and edited pkmn to their respective updated pages instead of showing default message - results in crash
// response.status proper error messages (error 501?)


 /*==== Setting Up Port ==== */
app.listen(8080, () => console.log('~~~ Tuning in to the waves of port 8080 ~~~'));