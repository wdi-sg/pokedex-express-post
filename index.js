const express = require('express');
const jsonfile = require('jsonfile');
const file = 'pokedex.json';

// Init express app
const app = express();
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));




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

        var htmlButton = "<html>" + "<body>" +
            '<form action="/" method="GET">' +
            `<select name="sortby">
                <option value="name">Name</option>
                <option value="id">ID</option>
                <option value="height">Height</option>
                <option value="weight">Weight</option>
              </select>
              ` +
            '<input type="submit"/>' +
            '</form>' + '</body>' + '</html>';


        switch (request.query.sortby) {
            case "name":
                var sortedPokemons = allPokemonsNameArr.sort();
    
                break;

            case "id":
                var sortedById = allPokemonsArr.sort((a, b) => {
                    return a.id - b.id;
                })
                var sortedPokemons = sortedById.map(eachPokemon => {
                    return "#" + eachPokemon.id + " " + eachPokemon.name;
                })

                break;

            case "height":
                var sortedByHeight = allPokemonsArr.sort((a, b) => {
                    return parseFloat(a.height) - parseFloat(b.height);
                })
                var sortedPokemons = sortedByHeight.map(eachPokemon => {
                    return eachPokemon.height + " " + eachPokemon.name;
                })

                break;

            case "weight":
                var sortedByWeight = allPokemonsArr.sort((a, b) => {
                    return parseFloat(a.weight) - parseFloat(b.weight);
                })
                var sortedPokemons = sortedByWeight.map(eachPokemon => {
                    return eachPokemon.weight + " " + eachPokemon.name;
                })

                break;

            default:
                var sortedPokemons = allPokemonsNameArr.join('<br>');
        }
      
        response.send(htmlButton + `<u>Pokemon List:</u> <br>` + sortedPokemons.join("<br>"));
    })
});

app.get('/search', (requets, response) => {

})


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


app.get('/:id', (request, response) => {

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
            response.send("not found");
        } else {

            response.send(pokemon);
        }
    });
});

/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));