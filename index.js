const express = require('express');
const jsonfile = require('jsonfile');
const validator = require('is-my-json-valid')

const FILE = 'pokedex.json';
const datafile = 'data.json'
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

// this tells express where to look for the view files
app.set('views', __dirname + '/views');

// this line sets react to be the default view engine
app.set('view engine', 'jsx');

app.get('/', (req, res) => {
    // running this will let express to run home.handlebars file in your views folder
    res.render('home')
})



/**
 * ===================================
 * Routes
 * ===================================
 */

// app.get('/pokemon/:id', (request, response) => {

//     // get json from specified file
//     jsonfile.readFile(FILE, (err, obj) => {
//         // obj is the object from the pokedex json file
//         // extract input data from request
//         let inputId = parseInt(request.params.id);

//         var pokemon;

//         // find pokemon by id from the pokedex json file
//         for (let i = 0; i < obj.pokemon.length; i++) {

//             let currentPokemon = obj.pokemon[i];

//             if (currentPokemon.id === inputId) {
//                 pokemon = currentPokemon;
//             }
//         }

//         if (pokemon === undefined) {

//             // send 404 back
//             response.status(404);
//             response.send("not found");
//         } else {

//             response.send(pokemon);
//         }
//     });
// });

app.get('/pokemon/new', (request, response) => {
    response.render('form')
});



app.post('/pokemon', function(request, response) {

    let newPokemon = request.body;

    //debug code (output request body)
    console.log(`The new pokemon is: ${JSON.stringify(newPokemon)}`);

    var validate = validator({
        required: true,
        type: 'object',
        properties: {
            id: {
                required: true,
                type: 'number'
            },
            num: {
                required: true,
                type: 'string'
            },
            name: {
                required: true,
                type: 'string'
            },
            img: {
                required: true,
                type: 'string'
            },
            height: {
                required: true,
                type: 'string'
            },
            weight: {
                required: true,
                type: 'string'
            }
        }
    })

    console.log('validating...', validate(newPokemon))

    let error = {err: validate(newPokemon)}
    console.log(JSON.stringify(error))

    if (validate(newPokemon) !== true) {
    response.send(`${JSON.stringify(validate.errors)}`)
    return;
    }

    // get the last list of errors by checking validate.errors
    // the following will print [{field: 'data.hello', message: 'is required'}]
    console.log(validate.errors)

    jsonfile.readFile(datafile, (err, obj) => {
        if (err) {
            console.log(err)
        }
        // pushes the newPokemon (array of objects) into the pokemon object
        obj['animals'].push(newPokemon);
        // save the request body
        jsonfile.writeFile(datafile, obj, (err) => {
            if (err) {
            console.error(`Error is ${err}`)
}
            // now look inside your json file
            response.send(request.body);
        });

    });

});

/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));