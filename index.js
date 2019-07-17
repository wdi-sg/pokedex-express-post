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

const editpage = 'edit.jsx';
const homepage = 'home.jsx';

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
        //creates a "copy" of the poke but is not a direct reference to it (i think)

        response.render(editpage, pokemonMatchingId);
    });
})

/*==== Accepting Edit Request ==== */
app.put("/pokemon/:id", (request, response) => {

    let editedPoke = request.body;
    console.log(pokemonMatchingId);
    console.log(editedPoke);


    jsonfile.readFile(file, (err, obj) => {
        if (err) {
            console.log("Something went wrong while trying to read the file.");
            console.log(err)
        }

        //obj[] - object with id === pokeID
        let unparsedIndex = obj.pokemon.findIndex(pokemon => pokemon.id === pokeId);
        let index = parseInt(unparsedIndex);
        obj.pokemon[index] = editedPoke;

        jsonfile.writeFile(file, obj, (err) => {
            if (err) {
                console.log("There was an error writing the edited Pokemon to file.");
                console.log(err)
            } else {
                response.send(`${editedPoke.name} has been updated!`);
            }
        });
    });
});

/**
 * ===================================
 * Helper Functions
 * ===================================
 */

//* sortPokemon function: name/number/weight/height query(sortRequest) gets passed into sortPokemon function where it goes through a switch case to dynamically recreate pokemon obj each time - thus changing what is show on home page *//

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
// creating new poke! on /pokemon/new
// app.get('/pokemon/new', (request, response) => {

//     console.log("birthing form");

//     //set conditional to make id and num unique - use onclick function to self-generate a unique ID?

//     let form =
//         '<html>' +
//         '<body>' +
//         '<h1>Add your Pokémon</h1>' +
//         '<form method="POST" action="/pokemon">' +
//         '<h4>ID:</h4>' +
//         '<input type="text" name="id">' +
//         '<h4>Num:</h4>' +
//         '<input type="text" name="num">' +
//         '<h4>Name:</h4>' +
//         '<input type="text" name="name">' +
//         '<h4>Img Source:</h4>' +
//         '<input type="text" name="img">' +
//         '<h4>Height:</h4>' +
//         '<input type="text" name="height">' +
//         '<h4>Weight:</h4>' +
//         '<input type="text" name="weight">' +
//         '<br><input type="submit" value="Submit">' +
//         '</form>' +
//         '</body>' +
//         '</html>';

//     response.send(form);
// });

// save the form data to pokedex.json
// app.post('/pokemon', (request, response) => {

//     var newPoke = request.body;

//     console.log(newPoke);

//     // save in data file
//     jsonfile.readFile(file, (err, obj) => {
//         //if error reading
//         if (err) {
//             console.log("could not read pokedex file");
//             console.log(err)
//         }

//         //if not error
//         obj.pokemon.push(newPoke);

//         jsonfile.writeFile(file, obj, (err) => {
//             //if error writing
//             if (err) {
//                 console.log("could not write new poke");
//                 console.log(err);
//                 response.status(503).send("sorry, the service in unavailable..");
//             } else {
//                 //show that the request was successful
//                 console.log("new mon successfully added");
//                 response.json(newPoke);
//             }
//         });
//     });
// });

 /*==== Setting Up Port ==== */
app.listen(8080, () => console.log('~~~ Tuning in to the waves of port 8080 ~~~'));