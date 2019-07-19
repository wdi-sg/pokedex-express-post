/**
 * ===================================
 * Configurations and set up
 * ===================================
 */
const express = require('express');
const jsonfile = require('jsonfile');
const FILE = 'pokedex.json';
const app = express();
const reactEngine = require('express-react-views').createEngine();
app.engine('jsx', reactEngine);
app.set('views', __dirname + '/views');
app.set('view engine', 'jsx');
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
const methodOverride = require('method-override')
app.use(methodOverride('_method'));
/**
 * ===================================
 * FUNCTIONS
 * ===================================
 */

let showAllPokemon = (request, response) => {
    jsonfile.readFile(FILE, (err,obj) => {
        let query = request.query.sortby;
        let pokemon = obj.pokemon;
        console.log(pokemon);
        let data = {
            pokemonKey : pokemon,
            queryKey : query
        }
        response.render('home', data)
    });
}

let createPokemon = (request, response) => {
    response.render('createForm');
}

let createdPokemonResult = (request, response) => {
    let newPoke = request.body;
    jsonfile.readFile(FILE, (err,obj) => {
        newPoke.num = obj.lastKey + 1;
        obj.lastKey++;
        obj.pokemon.push(newPoke);
        jsonfile.writeFile(FILE, obj, (err) => {
            if (err) {
                console.log('error in writing!');
            } else {
                response.send(`You have created a new Pokemon ${newPoke.name}!`);
            }
        })
    });
}

let showPokemon = (request, response) => {
    jsonfile.readFile(FILE, (err, obj) => {
        let id = parseInt(request.params.id);
        for(let i=0; i<obj.pokemon.length; i++) {
            if ( id === obj.pokemon[i].id ){
                console.log('id2',id)
                console.log('obj id', obj.pokemon[i].id)
                let pokemon = obj.pokemon[i];
                let data = {
                    pokemon : pokemon
                }

                response.render('pokemon', data)
            }
        }
    });
}

let editPokemon = (request, response) => {
    jsonfile.readFile (FILE, (err,obj) => {
        let id = parseInt(request.params.id);
        for(let i=0; i<obj.pokemon.length; i++) {
            if ( id === obj.pokemon[i].id){
                let pokemon = obj.pokemon[i];
                let data = {
                    pokemon : pokemon
                }
                response.render('editForm', data)
            }
        }
    })
}

let editPokemonResult = (request, response) => {

    let newPoke = request.body;
    jsonfile.readFile (FILE, (err,obj) => {
        let id = parseInt(request.params.id);
        for(let i=0; i<obj.pokemon.length; i++) {
            if ( id === obj.pokemon[i].id){
                obj.pokemon[i] = request.body;
            }
        }
        jsonfile.writeFile(FILE, obj, (err) => {
            if (err) {
                console.log('error in writing!');
            } else {
                response.send(`EDIT POKEMON SUCCESS!`);
            }
        })
    })
}

let deletePokemon = (request, result) => {
    jsonfile.readFile (FILE, (err,obj) => {
        let id = parseInt(request.params.id);
        for(let i=0; i<obj.pokemon.length; i++) {
            if ( id === obj.pokemon[i].id){
                let pokemon = obj.pokemon[i];
                let data = {
                    pokemon : pokemon
                }
                response.render('deleteForm', data)
            }
        }
    })
}

let deletePokemonResult = (request, result) => {
    let newPoke = request.body;
    jsonfile.readFile (FILE, (err,obj) => {
        let id = parseInt(request.params.id);
        for(let i=0; i<obj.pokemon.length; i++) {
            if ( id === obj.pokemon[i].id){
                obj.pokemon.splice(i,1);
                // obj.pokemon[i] = request.body;
            }
        }
        jsonfile.writeFile(FILE, obj, (err) => {
            if (err) {
                console.log('error in writing!');
            } else {
                response.send(`YOUR POKEMON DELETED!`);
            }
        })
    })
}

/**
 * ===================================
 * ROUTING
 * ===================================
 */

app.get('/pokemon', showAllPokemon);
app.get('/pokemon/new', createPokemon);
app.post('/pokemon', createdPokemonResult);
app.get('/pokemon/:id', showPokemon);
app.get('/pokemon/:id/edit', editPokemon);
app.put('/pokemon/:id', editPokemonResult)
app.get('/pokemon/:id/delete', deletePokemon)
app.delete('/pokemon/:id', deletePokemonResult)

/**
 * ===================================
 * Listen to requests on port
 * ===================================
 */

let port = 1500;
app.listen(port, () => console.log(`~~~ Tuning in to the waves of port ${port} ~~~`));