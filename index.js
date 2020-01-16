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


// This code below is needed so that express can deal with json objects
// Particularly too read request.body 
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

//SET UP METHOD-OVERRIDE for PUT and DELETE forms
const methodOverride = require('method-override')
app.use(methodOverride('_method'));

// this line below, sets a layout look to your express project
const reactEngine = require('express-react-views').createEngine();
app.engine('jsx', reactEngine);

// this tells express where to look for the view files
app.set('views', __dirname + '/views');

// this line sets react to be the default view engine
app.set('view engine', 'jsx');

/**
 * ===================================
 Helper functions to aid RESTFUL routing
 * ===================================
 */
function allLetter(word) {
    if (!/[^a-zA-Z]/.test(word)) {
        return true
    } else {
        return false
    }
}

function compareValues(key, order = 'asc') {
    return function innerSort(a, b) {
        if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
            // property doesn't exist on either object
            return 0;
        }

        const varA = (typeof a[key] === 'string')
            ? a[key].toUpperCase() : a[key];
        const varB = (typeof b[key] === 'string')
            ? b[key].toUpperCase() : b[key];

        let comparison = 0;
        if (varA > varB) {
            comparison = 1;
        } else if (varA < varB) {
            comparison = -1;
        }
        return (
            (order === 'desc') ? (comparison * -1) : comparison
        );
    };
}
/**
 * ===================================
 * uninimportant code
 * ===================================
 */
for(i=0; i<5; i++) {
    console.log (i);
}

/**
 * ===================================
 * Routes
 * ===================================
 */
app.post('/pokemon/sort/', (request, response) => {
    if (request.query.sort == "name") {
        jsonfile.readFile(FILE, (err, obj) => {
            let pokemonArray = obj.pokemon;
            pokemonArray = pokemonArray.sort(compareValues('name'));
            let htmlString = "";

            for (let i = 0; i < pokemonArray.length; i++) {
                let name = obj.pokemon[i].name;
                let id = obj.pokemon[i].id
                let link = String("/pokemon/" + (id));

                htmlString += `<a href= ${link} className="list-group-item list-group-item-action">${name}</a><br>`
            }

            const data = {
                string: htmlString
            }
            response.render('pokemonList', data)
        })
    } else if (request.query.sort == "weight") {
        jsonfile.readFile(FILE, (err, obj) => {
            let pokemonArray = obj.pokemon;
            pokemonArray = pokemonArray.sort(compareValues('weight'));
            let htmlString = "";

            for (let i = 0; i < pokemonArray.length; i++) {
                let name = obj.pokemon[i].name;
                let id = obj.pokemon[i].id
                let link = "/pokemon/" + (id);

                htmlString += `<a href= ${link} className="list-group-item list-group-item-action">${name}</a><br>`

            }

            const data = {
                string: htmlString
            }
            response.render('pokemonList', data)
        })
    } else if (request.query.sort == "height") {
        jsonfile.readFile(FILE, (err, obj) => {
            let pokemonArray = obj.pokemon;
            pokemonArray = pokemonArray.sort(compareValues('height'));
            let htmlString = "";

            for (let i = 0; i < pokemonArray.length; i++) {
                let name = obj.pokemon[i].name;
                let id = obj.pokemon[i].id
                let link = String("/pokemon/" + (id));

                htmlString += `<a href= ${link} className="list-group-item list-group-item-action">${name}</a><br>`
            }

            const data = {
                string: htmlString
            }
            response.render('pokemonList', data)
        })
    }
})//end appget

app.get('/pokemon', (request, response) => {
    jsonfile.readFile(FILE, (err, obj) => {

        // check to make sure the file was properly read
        if (err) {
            console.log("error with json read file:", err);
            response.status(503).send("error reading filee");
            return;
        }

        let htmlString = "";

        for (let i = 0; i < obj.pokemon.length; i++) {
            let name = obj.pokemon[i].name;
            let link = String("./pokemon/" + (i + 1));

            htmlString += `<a href= ${link} className="list-group-item list-group-item-action">${name}</a><br>`

        }

        const data = {
            string: htmlString
        }

        response.render('pokemonList', data)
    })//end readFile
})//end app.get;

app.get('/pokemon/:id', (request, response) => {
    console.log(request.params.id)
    // get json from specified file
    jsonfile.readFile(FILE, (err, obj) => {

        // check to make sure the file was properly read
        if (err) {
            console.log("error with json read file:", err);
            response.status(503).send("error reading filee");
            return;
        }

        // Below if-else statement checks if the request.params.id is "new",
        // If it is, render the input form 
        // If not, it should be a number, and the object containing the details of the pokemon should be rendered.
        if (request.params.id == "new") {
            const pokeIndex = obj.pokemon.length
            console.log(pokeIndex)

            const data = {
                idValue: pokeIndex + 1,
                numValue: pokeIndex + 1
            }

            response.render('form', data);
        } else {

            let inputId = parseInt(request.params.id);
            var pokemon;
            // find pokemon by id from the pokedex json file
            for (let i = 0; i < obj.pokemon.length; i++) {
                let currentPokemon = obj.pokemon[i];
                if (parseInt(currentPokemon.id) === inputId) {
                    pokemon = currentPokemon;
                }
            }

            if (pokemon === undefined) {
                // send 404 back
                response.status(404);
                response.send("not found");
            } else {
                const data = pokemon
                response.render('showPokemon', data);
            }
        }

    });
});

app.get('/', (request, response) => {
    response.send("yay");
});

app.post('/pokemon', (request, response) => {

    jsonfile.readFile(FILE, (err, obj) => {

        const pokeIndex = obj.pokemon.length

        let currInput = request.body;

        if (!allLetter(currInput.name) || isNaN(currInput.id) || isNaN(currInput.num) || isNaN(currInput.height) || isNaN(currInput.weight)) {

            let reply = {
                idValue: pokeIndex + 1,
                numValue: pokeIndex + 1,
                idErrorMessage: "",
                numErrorMessage: "",
                heightErrorMessage: "",
                weightErrorMessage: "",
                nameErrorMessage: "",
                imageErrorMessage: ""
            }

            if (!allLetter(currInput.name)) {
                reply["nameErrorMessage"] = "Please key in valid name, no numbers and SPACING!"
            }

            if (isNaN(currInput.id)) {
                reply["idErrorMessage"] = "Please key in valid id, ONLY numbers!"
            }

            if (isNaN(currInput.num)) {
                reply["numErrorMessage"] = "Please key in valid num, ONLY numbers!"
            }

            if (isNaN(currInput.height)) {
                reply["heightErrorMessage"] = "Please key in valid height, ONLY numbers!"
            }

            if (isNaN(currInput.weight)) {
                reply["weightErrorMessage"] = "Please key in valid weight, ONLY numbers"
            }

            response.render('form', reply);

        } else {

            currInput["id"] = parseInt(currInput["id"])
            // Rounding off height to 2.d.p
            currInput["height"] = Math.round(currInput["height"] * 100) / 100 + " m"
            // Rounding off weight to 1.d.p 
            currInput["weight"] = Math.round(currInput["weight"] * 10) / 10 + " kg"
            // Setting other fields not avaiable in the form as "null"
            currInput["candy"] = null;
            currInput["candy_count"] = null;
            currInput["egg"] = null;
            currInput["avg_spawn"] = null;
            currInput["spawn_time"] = null;

            obj.pokemon.push(currInput)
            // Check result by looking at last 2 elements in the pokemon array

            jsonfile.writeFile(FILE, obj, (err) => {
                console.log(err)
                let n = obj.pokemon.length;
                console.log(obj.pokemon.slice(n - 2, n))
                response.send(obj.pokemon.slice(n - 2, n));
            });
        }
    })
})

// Part 2 Routes Here 

app.get('/pokemon/:id/edit', (request, response) => {

    let pokemonId = request.params.id;

    jsonfile.readFile(FILE, (err, obj) => {
        let pokemonArray = obj.pokemon;

        const data = {
            theId: pokemonId,
            thePokemon: pokemonArray[pokemonId]
        }

        response.render('editForm', data)


    })//end readFile
})//end app.get;

app.put('/pokemon/:id', (request, response) => {

    console.log(request.body);

    let pokemonIndex = request.params.id;

    jsonfile.readFile(FILE, (err, obj) => {

        let editedPokemonObject = request.body

        obj.pokemon[pokemonIndex] = editedPokemonObject;


        jsonfile.writeFile(FILE, obj, (err) => {
            console.error(err)
            const data = obj.pokemon[pokemonIndex];
            response.render('showPokemon', data);
        });//end writefile
    });//end readfile
})//end appget


app.get('/pokemon/:id/delete', (request, response) => {

    let pokemonIndex = (request.params.id - 1);

    jsonfile.readFile(FILE, (err, obj) => {
        let pokemonArray = obj.pokemon;

        const data = {
            theId: pokemonIndex,
            thePokemon: pokemonArray[pokemonIndex]
        }

        response.render('deletePokemon', data)


    })//end readFile
})//end app.get;

app.delete('/pokemon/:id', (request, response) => {

    console.log(request.body);

    let pokemonIndex = request.body.id - 1;

    jsonfile.readFile(FILE, (err, obj) => {
        let pokemonArray = obj.pokemon;
        pokemonArray.splice(pokemonIndex, 1);
        console.log(pokemonArray[0].name)
        var htmlString;

        for (let i = 0; i < pokemonArray.length; i++) {
            let name = obj.pokemon[i].name;
            let id = obj.pokemon[i].id
            let link = String("/pokemon/" + (id));

            htmlString += `<a href= ${link} className="list-group-item list-group-item-action">${name}</a><br>`
        }

        const data = {
            string: htmlString
        }
        response.render('pokemonList', data);


    });//end readfile
})//end appget
/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));
