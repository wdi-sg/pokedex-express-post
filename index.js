const express = require('express');
const jsonfile = require('jsonfile');
const file = 'pokedex.json';

const app = express();
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
app.use(express.static(`${__dirname}/public/`));

const methodOverride = require('method-override')
app.use(methodOverride('_method'));

// this line below, sets a layout look to your express project
const reactEngine = require('express-react-views').createEngine();
app.engine('jsx', reactEngine);

// this tells express where to look for the view files
app.set('views', __dirname + '/views');

// this line sets react to be the default view engine
app.set('view engine', 'jsx');



//////////////////////////////////////////////////////
///////////////// MAIN FUNCTIONS /////////////////////
//////////////////////////////////////////////////////


// listing all pokemons available, with the choice of sorting
app.get('/', (request, response) => {
    jsonfile.readFile(file, (err, obj) => {

        // putting all Pokemons into an array
        var allPokemonsArr = obj.pokemon.map(eachPokemon => {
            return eachPokemon;
        })

        // putting all Pokemon names into an array
        var allPokemonsNameArr = obj.pokemon.map(eachPokemon => {
            return eachPokemon.name;
        })

        switch (request.query.sortby) {
            case "name":
                var sortedByName = allPokemonsArr.sort((a, b) => (a.name > b.name) ? 1 : (b.name > a.name) ? -1 : 0);
                var sortedPokemons = sortedByName.map(eachPokemon => {
                    return eachPokemon;
                })

                break;

            case "id":
                var sortedById = allPokemonsArr.sort((a, b) => {
                    return a.id - b.id;
                })
                var sortedPokemons = sortedById.map(eachPokemon => {
                    return eachPokemon;
                })

                break;

            case "height":
                var sortedByHeight = allPokemonsArr.sort((a, b) => {
                    return parseFloat(a.height) - parseFloat(b.height);
                })
                var sortedPokemons = sortedByHeight.map(eachPokemon => {
                    return eachPokemon;
                })

                break;

            case "weight":
                var sortedByWeight = allPokemonsArr.sort((a, b) => {
                    return parseFloat(a.weight) - parseFloat(b.weight);
                })
                var sortedPokemons = sortedByWeight.map(eachPokemon => {
                    return eachPokemon;
                })

                break;

            default:
                var sortedByName = allPokemonsArr.sort((a, b) => (a.name > b.name) ? 1 : (b.name > a.name) ? -1 : 0);
                var sortedPokemons = sortedByName.map(eachPokemon => {
                    return eachPokemon;
                })


        }

        response.render('sort', {
            array: sortedPokemons,
            sortType: request.query.sortby
        });
    })
});

app.get('/pokemon/:id/edit', (request, response) => {
    let searchid = request.params.id - 1;
    console.log(searchid);
    jsonfile.readFile(file, function(err, obj) {
        let searchedPokemon = obj.pokemon[searchid];
        console.log(searchedPokemon);
        
        response.render('edit', {searchPoke: searchedPokemon});
    })
});

app.put('/pokemon/:id', (request, response) => {
    jsonfile.readFile(file, (err, obj) =>{
        let currentPokedex = obj;
        var currentId; 
        var sameId = parseInt(request.body.id);
        console.log("hi", sameId);
        

        for (var i=0; i < currentPokedex.pokemon.length; i++){
            if (currentPokedex.pokemon[i].id === sameId){
                // let pokemonObj = currentPokedex.pokemon[i];
                currentPokedex.pokemon[i].weight = request.body.weight;
                currentPokedex.pokemon[i].height = request.body.height;
                currentPokedex.pokemon[i].candy = request.body.candy;
                currentPokedex.pokemon[i]["candy_count"] = request.body["candy_count"];
                currentId = i;
                console.log(currentId, "hi");
            }

        }

        jsonfile.writeFile('pokedex.json', currentPokedex, (err) => {
            console.log(err)
        });
        
        response.render('display', {searchPoke: obj.pokemon[currentId]});
        

    });
});


// getting new pokemon from user
app.get('/pokemon/new', (request, response) => {
    let form = "<html>" + "<body>" +
        '<form action="/pokemon" method="POST">' +
        '<input name="id" placeholder="ID"/>' + '<br>' +
        '<input name="num" placeholder="Number"/>' + '<br>' +
        '<input name="name" placeholder="Name"/>' + '<br>' +
        '<input name="img" placeholder="Image Link"/>' + '<br>' +
        '<input name="height" placeholder="Height"/>' + '<br>' +
        '<input name="weight" placeholder="Weight"/>' + '<br>' + '<br>' +
        '<input type="submit"/>' +
        '</form>' + '</body>' + '</html>';

    response.send(form);
})

// putting new pokemon from user into pokedex.json
app.post('/pokemon', (request, response) => {
    jsonfile.readFile(file, (err, obj) => {
        newPokemonObj = {};
        newPokemonObj["id"] = request.body.id;
        newPokemonObj["num"] = request.body.num;
        newPokemonObj["name"] = request.body.name;
        newPokemonObj["img"] = request.body.img;
        newPokemonObj["height"] = request.body.height;
        newPokemonObj["weight"] = request.body.weight;

        console.log(newPokemonObj);

        obj.pokemon.push(newPokemonObj);

        jsonfile.writeFile(file, obj, (err) => {
            console.log(err)
        });
    })
})


app.get('/pokemon/:id', (request, response) => {

    // get json from specified file
    jsonfile.readFile(file, (err, obj) => {
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

        if (pokemon === undefined) {

            // send 404 back
            response.status(404);
            response.send("Pokemon not found ):");
        } else {

            response.render('display', {searchPoke: pokemon});
        }
    });
});

/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));