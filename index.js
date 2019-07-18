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

/*==== Request Edit Page ==== */
app.get('/pokemon/:id/edit', (request, response) => {
    pokeId = parseInt(request.params.id);

    jsonfile.readFile(file, (err,obj) => {
        if (err) {
            console.log("Something went wrong when displaying the edit page.")
        }

        pokemonMatchingId = obj.pokemon.find(pokemon => pokemon.id === pokeId);
        //creates a "copy" of the matching poke but is not a direct reference to it (i think)
        response.render(editpage, pokemonMatchingId);
    });
})

/*==== Accepting Edit Request ==== */
app.put("/pokemon/:id", (request, response) => {
    let editedPoke = request.body;

    jsonfile.readFile(file, (err, obj) => {
        if (err) {
            console.log("Something went wrong while trying to read the file.");
            console.log(err)
        }

        //obj[] - object with id === pokeID
        let unparsedIndex = obj.pokemon.findIndex(pokemon => pokemon.id === pokeId);
        let index = parseInt(unparsedIndex);
        //eh but actually if its findIndex does that mean its already parsed - check check
        obj.pokemon[index] = editedPoke;

        jsonfile.writeFile(file, obj, (err) => {
            if (err) {
                console.log("There was an error writing the edited Pokemon to file.");
                console.log(err)
            } else {
                response.send(`${editedPoke.name} has been updated!`);
                //update to show the changed pokemon page
            }
        });
    });
});

/*==== Creating Request for New Pokemon ==== */
app.get('/pokemon/new', (request, response) => {
    //not sure if need to read file & have obj for this one
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
                response.json(newPoke);
                // show pokemon's new page instead
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

        pokemonMatchingId = obj.pokemon.find(pokemon => pokemon.id === pokeId);
        response.render(deletepage, pokemonMatchingId);
    });
})

/*====  Delete Pokemon ==== */
app.delete("/pokemon/:id", (request, response) => {
    console.log(request.body);
    //pkmn to bye bye
    let byebyePoke = request.body;


    jsonfile.readFile(file, (err, obj) => {
        if (err) {
            console.log("Something went wrong while trying to read the file.");
            console.log(err)
        }

        let index = obj.pokemon.findIndex(pokemon => pokemon.id === pokeId);
        //trying findIndex without parsing

        //slice out the pokemon at index
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

// make delete page
//indv pokemon pages
// redirect new and edited pkmn to their respective updated pages instead of showing default message
// response.status proper error messages


 /*==== Setting Up Port ==== */
app.listen(8080, () => console.log('~~~ Tuning in to the waves of port 8080 ~~~'));