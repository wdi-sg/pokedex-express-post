const express = require('express');
const jsonfile = require('jsonfile');
const methodOverride = require('method-override')



const FILE = 'pokedex.json';
const datafile = 'pokedex.json';


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
app.use(methodOverride('_method'))

const reactEngine = require('express-react-views').createEngine();
app.engine('jsx', reactEngine);

// this tells express where to look for the view files
app.set('views', __dirname + '/views');

// this line sets react to be the default view engine
app.set('view engine', 'jsx');

app.get('/pokemon', (req, res) => {
    // running this will let express to run home.handlebars file in your views folder
    jsonfile.readFile(datafile, (err, obj) => {
        if (err) {
            console.log(err);
        }
        data = {
            pokemon: obj.pokemon
        }
        res.render('home', data)
    })
})




/**
 * ===================================
 * Routes
 * ===================================
 */


app.get('/pokemon/new', (request, response) => {
    response.render('form')
});



app.post('/pokemon', function(request, response) {

    let newPokemon = request.body;

    //debug code (output request body)
    console.log(`The new pokemon is: ${JSON.stringify(newPokemon)}`);

    jsonfile.readFile(datafile, (err, obj) => {
        if (err) {
            console.log(err)
        }
        // pushes the newPokemon (array of objects) into the pokemon object
        obj['animals'].push(newPokemon);
        // save the request body
        jsonfile.writeFile(datafile, obj, { spaces: 2 }, (err) => {
            if (err) {
                console.error(`Error is ${err}`)
            }
            // now look inside your json file
            response.send(request.body);
        });

    });

});

app.get('/pokemon/:id', (request, response) => {

    // get json from specified file
    jsonfile.readFile(FILE, (err, obj) => {
        // obj is the object from the pokedex json file
        // extract input data from request
        let inputId = parseInt(request.params.id) - 1;

        var pokemon;
        const data = {
            pokemon: obj.pokemon[inputId]
        }

        // find pokemon by id from the pokedex json file
        for (let i = 0; i < obj['pokemon'].length; i++) {

            let currentPokemon = obj.pokemon[i];

            if (currentPokemon.id === inputId) {
                pokemon = currentPokemon;
            }
        }

        if (pokemon === undefined) {

            // send 404 back
            response.status(404);
            response.send("not found");
        } else {

            response.render('show', data)
        }
    });
});

app.get('/pokemon/:id/edit', (request, response) => {
    let inputId = parseInt(request.params.id) - 1;

    jsonfile.readFile(FILE, (err, obj) => {
        console.log(obj.pokemon[inputId])

        const data = {
            id: inputId,
            pokemon: obj.pokemon[inputId]
        }
        response.render('editform', data)

    })
})

app.put('/pokemon/:id', (request, response) => {
    let index = parseInt(request.params.id) - 1;
    let editedPokemon = request.body
    console.log(request.body)

    jsonfile.readFile(FILE, (err, obj) => {
        obj.pokemon[index+1] = editedPokemon;

        jsonfile.writeFile(FILE, obj, (err) => {
            if (err) {
                console.log(err)
            }
        console.log("done writing the file")
        response.send(`Done writing the file. Edited ${obj.pokemon[index+1].name} with this new info: ${JSON.stringify(editedPokemon)}`)
        })
    })
})

app.get('/pokemon/:id/delete', (request, response) => {
    let inputId = parseInt(request.params.id) - 1;

    jsonfile.readFile(FILE, (err, obj) => {
        console.log(obj.pokemon[inputId])

        const data = {
            id: inputId,
            pokemon: obj.pokemon[inputId]
        }
        response.render('delete', data)

    })
})

app.delete('/pokemon/:id', (request, response) => {
    let index = parseInt(request.params.id) - 1;

    jsonfile.readFile(FILE, (err, obj) => {
        obj.pokemon.splice(index, 1);

        jsonfile.writeFile(FILE, obj, (err) => {
            if (err) {
                console.log(err)
            }
            response.send("Deleted")
            })
    })
})


/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));