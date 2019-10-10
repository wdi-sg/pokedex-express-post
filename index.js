
// HELLO SIM YEN! Your code is awesome

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

// this line below, sets a layout look to your express project
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

// Set up method-override for PUT and DELETE forms
const methodOverride = require('method-override')
app.use(methodOverride('_method'));

/**
 * ===================================
 * Routes
 * ===================================
 */

// Home page
app.get('/', (request, response) => {
    jsonfile.readFile(FILE, (err, obj) => {

        // const data = {
        //     pokeobj: obj
        // }
        let data = obj;

            response.render('home', data);
        })

});

// Pokemon pages
app.get('/pokemon/:id', (request, response) => {

    // get json from specified file
    jsonfile.readFile(FILE, (err, obj) => {
        // obj is the object from the pokedex json file
        // extract input data from request
        let inputId = parseInt(request.params.id);

        var pokemon;

        // find pokemon by id from the pokedex json file
        for (let i = 0; i < obj.pokemon.length; i++) {

            let currentPokemon = obj.pokemon[i];

            if (currentPokemon.id === inputId) {
                pokemon = currentPokemon;
                pokemon.message = "Found";
            }
        }

        if (pokemon === undefined || request.params.id === "new") {
            //add new pokemon if id not taken or new
            console.log("Yay, new pokemon! Gotta catch em' all!");
            response.render('new');

            // // send 404 back
            // response.status(404);
            // response.send("not found");
        } else {

            response.render('found', pokemon);
        }
    });
});

app.post('/pokemon/new', (request, response) => {
    //let inputId = parseInt(request.params.id);
    // debug code (output request body)
    console.log(request.body);
    let newPokemon = request.body;
    // check if new id = new num
    if (newPokemon.id !== newPokemon.num) {
        let wrong = { message: "ID does not match Number!" };
        response.render('new', wrong);

    } else {
        newPokemon.id = parseInt(newPokemon.id);
        newPokemon.message = "Added";
        let nameExist = false;

        jsonfile.readFile(FILE, (err, obj) => {
            // check if ID or name already exist
            for (let i = 0; i < obj.pokemon.length; i++) {
                if ( newPokemon.id === obj.pokemon[i].id || newPokemon.name === obj.pokemon[i].name) {
                    let wrong = { message: "Record already exist!" };
                    response.render('new', wrong);
                    nameExist = true;
                }
            }
            // save the request body
            if (nameExist === false) {
                obj.pokemon.push(newPokemon);

                jsonfile.writeFile(FILE, obj, (err) => {
                    console.error(err);

                    // render out added data
                    response.render('found', newPokemon);

                });
            }

        });
    }
})

// Jasmine: this is from home page to sort pokemon
// Jasmine: switch is if statements
app.get('/pokemon?', (request, response) => {
    //output query field
    console.log(request.query.sortby);
    let field = request.query.sortby;
    let results = [];

    switch (field) {
        case 'name':
            jsonfile.readFile(FILE, (err, obj) => {
                // get name of all pokemons
                for (var i = 0; i < obj.pokemon.length; i++) {
                    results.push({ name : obj.pokemon[i].name, img : obj.pokemon[i].img });
                }
                // sort names alphabetically
                results.sort();
                let pokeobj = { "pokemon": results };
                // render out requested data
                response.render('home', pokeobj);
            });
            break;

        case 'height':
            jsonfile.readFile(FILE, (err, obj) => {

                for (var j = 0; j < obj.pokemon.length; j++) {
                    results.push({ name : obj.pokemon[j].name, img : obj.pokemon[j].img, height : obj.pokemon[j].height });
                }

                results.sort((a,b) => {
                    return parseFloat(a.height)-parseFloat(b.height);
                });
                let pokeobj = { "pokemon": results };
                // render out requested data
                response.render('home', pokeobj);
            })
            break;

        case 'weight':
            jsonfile.readFile(FILE, (err, obj) => {

                for (var j = 0; j < obj.pokemon.length; j++) {
                    results.push({ name : obj.pokemon[j].name, img : obj.pokemon[j].img, weight : obj.pokemon[j].weight });
                }

                results.sort((a,b) => {
                    return parseFloat(a.weight)-parseFloat(b.weight);
                });
                let pokeobj = { "pokemon": results };
                // render out requested data
                response.render('home', pokeobj);
            })
            break;
    }

})

//edit Pokemon
app.get('/pokemon/:id/edit', (request, response) => {
    // get json from specified file
    jsonfile.readFile(FILE, (err, obj) => {
        // obj is the object from the pokedex json file
        // extract input data from request
        let inputId = parseInt(request.params.id);

        var pokemon;

        // find pokemon by id from the pokedex json file
        for (let i = 0; i < obj.pokemon.length; i++) {

            let currentPokemon = obj.pokemon[i];

            if (currentPokemon.id === inputId) {
                pokemon = currentPokemon;
            }
        }

        response.render('update', pokemon);
    })
})

app.put('/pokemon/:id', (request, response) => {
    // get index of pokemon to be updated
    let updateId = parseInt(request.params.id)-1;
    let updatedPokemon = request.body;
    updatedPokemon.message = "Edited";
    updatedPokemon.id = parseInt(updatedPokemon.id);

    jsonfile.readFile(FILE, (err, obj) => {
        //replace updated pokemon with new data
        obj.pokemon.splice(updateId, 1, updatedPokemon);

        jsonfile.writeFile(FILE, obj, (err) => {
            console.error(err);
        })
    })

    response.render("found", updatedPokemon);
})

app.get('/pokemon/:id/delete', (request, response) => {
    // extract input data from request
    let inputId = parseInt(request.params.id);

    // get json from specified file
    jsonfile.readFile(FILE, (err, obj) => {
        // obj is the object from the pokedex json file

        var pokemon;

        // find pokemon by id from the pokedex json file
        for (let i = 0; i < obj.pokemon.length; i++) {

            let currentPokemon = obj.pokemon[i];

            if (currentPokemon.id === inputId) {
                pokemon = currentPokemon;
            }
        }

        response.render('delete', pokemon);
    })
})

app.delete('/pokemon/:id', (request, response) => {
    // get ID of pokemon to be deleted
    let deleteId = parseInt(request.params.id);

    jsonfile.readFile(FILE, (err, obj) => {
        // get index of pokemon to be deleted
        var pokemon;
        var arrayOfPokemon = [];

        // find pokemon by id from the pokedex json file
        for (let i = 0; i < obj.pokemon.length; i++) {
            arrayOfPokemon.push(obj.pokemon[i].name);
            let currentPokemon = obj.pokemon[i];
            if (currentPokemon.id === deleteId) {
                pokemon = currentPokemon;
                pokemon.message = "Deleted";
            }
        }

        let deleteIndex = arrayOfPokemon.indexOf(pokemon.name);
        console.log (deleteIndex + pokemon.name);
        obj.pokemon.splice(deleteIndex, 1);

        jsonfile.writeFile(FILE, obj, (err) => {
            console.error(err);
        })
        response.render('found', pokemon);

    })


})


/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));