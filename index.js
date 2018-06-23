const express = require('express');
const jsonfile = require('jsonfile');
const methodOverride = require('method-override');
const handlebars = require('express-handlebars');
var path = require('path');

const FILE = 'pokedex.json';

/**
 * ===================================
 * Configurations and set up
 * ===================================
 */

// Init express app
const app = express();
app.use(express.static('public'))
app.use(express.json());
app.use(express.urlencoded({extended: true}))
// app.use(methodOverride('_method'));
app.use(methodOverride(function (req, res) {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    // look in urlencoded POST bodies and delete it
    var method = req.body._method
    delete req.body._method
    return method
  }
}))

// Set handlebars to be the default view engine
app.engine('handlebars', handlebars.create().engine);
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, '/public'));

/**
 * ===================================
 * Routes
 * ===================================
 */

app.get('/:id', (request, response) => {
    // get json from specified file
    jsonfile.readFile(FILE, (err, obj) => {
        // obj is the object from the pokedex json file
        // extract input data from request
        let inputId = request.params.id;
        // find pokemon by id from the pokedex json file
        // (note: find() is a built-in method of JavaScript arrays)
        let pokemon = obj.pokemon.find((currentPokemon) => {
            return currentPokemon.id === parseInt(inputId, 10);
        });
        if (pokemon === undefined) {
            // send 404 back
            response.status(404);
            response.send("not found");
        } else {
            response.send(pokemon);
        }
    });
});


app.get('/', (request, response) => {
    jsonfile.readFile(FILE, (err, objRead) => {
        let pokenames = objRead.pokemon.map( pokemon => pokemon.name)
        let context;
        if (request.query.sortby == "name") {
            context = { "pokemonList": pokenames.sort() };
        } else {
            context = { "pokemonList": pokenames };
        }
        response.render('home', context);
    })


});

app.get('/pokemon/new/', (request, response) => {
    response.render('newpokeform');
});

let generateNum = (id) => {
    let num;
    if (id < 10) {
        num = "00" + String(id);
    } else if (id < 100) {
        num = "0" + String(id);
    } else {
        num = String(id);
    }
    return num;
}

app.post('/pokemon/new', (request, response) => {
    jsonfile.readFile(FILE, (err, objRead) => {

        let pokeId = objRead.pokemon.map( pokemon => pokemon.id)
        let nextPokeId = Math.max.apply(Math, pokeId) + 1;
        let nextPokeNum = generateNum(nextPokeId);

        let newPokemon = {
            "id": nextPokeId,
            "num": nextPokeNum,
            "name": request.body.name,
            "img": request.body.img,
            "height": request.body.height,
            "weight": request.body.weight,
            "candy": "",
            "candy_count": "",
            "egg": "",
            "avg_spawns": "",
            "spawn_time": ""
        }

        objRead.pokemon.push(newPokemon);
        jsonfile.writeFile(FILE, objRead, function(err) {});
    })
    response.send('Done');
});

app.get('/pokemon/edit/', (request, response) => {
    response.render('editpokeform');
});

app.post('/pokemon/edit/', (request, response) => {
    let context;

    jsonfile.readFile(FILE, (err, objRead) => {
        let matchingPoke = objRead.pokemon.filter( pokemon => String(pokemon.id) === request.body.id);

        if (matchingPoke) {
            context = matchingPoke[0];
            response.render('poketoedit', context);
        } else {
            response.send("No matching pokemon to edit!");
        }
    })

});

app.put('/pokemon/:id/edit', (request, response) => {
    jsonfile.readFile(FILE, (err, objRead) => {
        if (err) {
            console.log(err);
        } else {
            objRead.pokemon.forEach( pokemon => {
                if (String(pokemon.id) == request.params.id) {
                    pokemon.id = parseInt(request.body.id);
                    pokemon.num = request.body.num;
                    pokemon.name = request.body.name;
                    pokemon.img = request.body.img;
                    pokemon.height = request.body.height;
                    pokemon.weight = request.body.weight;
                }
            })

            jsonfile.writeFile(FILE, objRead, function(err) {});
        }
    })
});

app.get('/pokemon/delete/', (request, response) => {
    response.render('deletepokeform');
});

// app.post('/pokemon/delete/', (request, response) => {
//     let context;
//     jsonfile.readFile(FILE, (err, objRead) => {
//         let matchingPoke = objRead.pokemon.filter( pokemon => String(pokemon.id) === request.body.id);
//         if (matchingPoke) {
//             context = matchingPoke[0];
//             response.render('poketodelete', context);
//         } else {
//             response.send("No matching pokemon to delete!");
//         }
//     })
// });

app.delete('/pokemon/:id/delete/', (request, response) => {

    jsonfile.readFile(FILE, (err, objRead) => {

        objRead.pokemon.forEach( (pokemon, index, array) => {
            if (String(pokemon.id) === request.params.id) {
                array.splice(index, 1);
            }
        })

        jsonfile.writeFile(FILE, objRead, function(err) {});
        response.redirect('/');
    })
});

/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));