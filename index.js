const express = require('express');
const jsonfile = require('jsonfile');

const pokedex = 'pokedex.json';

const app = express();

//seting a layout look to your express project
const reactEngine = require('express-react-views').createEngine();
app.engine('jsx', reactEngine);
//this tells express where to look for the view files
app.set('views', __dirname + '/views');
//this line sets react to be the default view engine
app.set('view engine', 'jsx');

//tell the app to use the module
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

//set-up method for put and delete forms
const methodOverride = require('method-override');
app.use(methodOverride('_method'));


app.get('/pokemon/new', (request, response) => {

    response.render('create');

})

app.post('/pokemon', (request, response) => {

    jsonfile.readFile(pokedex, (err, obj) => {

        let currentListOfPokemon = obj['pokemon'];
        let newPokemon = request.body;
        newPokemon['id'] = parseInt(obj['pokemon'][currentListOfPokemon.length - 1]['id']) + 1;
        let num  = parseInt(obj['pokemon'][currentListOfPokemon.length - 1]['num']) + 1;
        newPokemon['num'] = num.toString();
        newPokemon['height'] += " m";
        newPokemon['weight'] += " kg";
        currentListOfPokemon.push(newPokemon);

        jsonfile.writeFile(pokedex, currentListOfPokemon, (err) => {

            console.log(err);

        })
        response.render('updatedlist', { newlist: currentListOfPokemon });

    })
})

app.get('/sort', (request, response) => {

    jsonfile.readFile(pokedex, (err, obj) => {

        let allPokemon = obj['pokemon'];

        if (request.query.sortby === "name") {

            var sortedList = allPokemon.sort((a,b) => {

                if (a.name < b.name) {

                    return -1;

                } else if (a.name > b.name) {

                    return 1;

                } else {

                    return 0;
                }
            });

            var order = 'Name';

        } else if (request.query.sortby === "id") {

            var sortedList = allPokemon;
            var order = 'Id'

        } else if (request.query.sortby === "height") {

            var sortedList = allPokemon.sort((a,b) => {

                if (a.height < b.height) {

                    return -1;

                } else if (a.height > b.height) {

                    return 1;

                } else {

                    return 0;
                }
            })
            var order = 'Height'

        } else if (request.query.sortby === "weight") {

            var sortedList = allPokemon.sort((a,b) => {

                if (a.weight.length < b.weight.length) {

                    return -1;

                } else if (a.weight.length > b.weight.length) {

                    return 1;

                } else {

                    if (a.weight < b.weight) {

                        return -1;

                    } else if (a.weight > b.weight) {

                        return 1;

                    } else {

                        return 0;
                    }
                }
            });
            var order = 'Weight'

        }

        response.render('sorting', {list: sortedList, sortingorder: order})

    })
})

app.get('/:id/edit', (request, response) => {

    jsonfile.readFile(pokedex, (err, obj) => {

        let allPokemon = obj['pokemon'];
        let id = request.params.id;
        var pokemon;

        for (let i = 0; i < allPokemon.length; i++ ) {

            if (allPokemon[i].id == id) {

                pokemon = allPokemon[i];

            }
        }

        response.render('edit', {editPokemon: pokemon, params: id});
    });
});


app.put('/:id', (request, response) => {

    jsonfile.readFile(pokedex, (err, obj) => {


        let params = request.params.id;
        let allPokemon = obj['pokemon'];

        var pokemon;

        for (let i = 0; i < allPokemon.length; i++) {

            if(params == allPokemon[i].id) {

                allPokemon[i] = request.body;
                allPokemon[i].id = parseInt(allPokemon[i].id);
                pokemon = allPokemon[i];
            }

        }

        jsonfile.writeFile(pokedex, obj, (err) => {

            console.log(err);

        });

        response.render('pokemonid', {foundPokemon: pokemon, params: params})

    })
})


app.get('/:id', (request, response) => {

  // get json from specified file
  jsonfile.readFile(pokedex, (err, obj) => {
    // obj is the object from the pokedex json file
    // extract input data from request
    let inputId = parseInt( request.params.id );

    var pokemon;

    // find pokemon by id from the pokedex json file
    for( let i=0; i<obj.pokemon.length; i++ ){

      let currentPokemon = obj.pokemon[i];

      if( currentPokemon.id === inputId ){
        pokemon = currentPokemon;
      }
    }

    if (pokemon === undefined) {

      // send 404 back
      response.status(404);
      response.send("not found");
    } else {

      response.render('pokemonid', {foundPokemon: pokemon, params: request.params.id});
    }
  });
});


app.get('/', (request, response) => {

    response.render('pokemon');

});


const PORT_NUMBER = 3000;
app.listen(PORT_NUMBER, () => { console.log('Tuning to Port 3000') });