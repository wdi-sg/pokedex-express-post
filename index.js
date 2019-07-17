const express = require('express');
const jsonfile = require('jsonfile');
const app = express();
const FILE = 'pokedex.json';

// tell your app to use the module
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

const reactEngine = require('express-react-views').createEngine();
app.engine('jsx', reactEngine);
app.set('views', __dirname + '/views');
app.set('view engine', 'jsx');

const methodOverride = require('method-override')
app.use(methodOverride('_method'));

//for adding new pokemon
app.get('/pokemon/new', (req, res) => {
    jsonfile.readFile(FILE, (err, obj) => {

        if (err) {
            console.log(err)
        } else {
            res.send(`
        <h2>Please enter the details of a new Pokemon</h2>
        <form method="POST" action="/pokemon">
            <p>id</p><input type="number" name="id" readonly value=${obj.lastKey+1}>
            <p>num</p><input type="text" name="num" readonly value=${obj.lastKey+1}>
            <p>name</p><input type="text" name="name">
            <p>img</p><input type="text" name="img">
            <p>height</p><input type="text" name="height">
            <p>weight</p><input type="text" name="weight">
            <br>
            <input type="submit">
        </form>`);
        }
    })
})

//endpoint that accepts POST request
app.post('/pokemon', (req, res) => {
    console.log("gonna write");

    jsonfile.readFile(FILE, (err, obj) => {

        if (err) {
            console.log(err)
        } else {
            obj.lastKey++;
            req.body.id = parseInt(req.body.id);
            obj.pokemon.push(req.body);
            jsonfile.writeFile(FILE, obj, (err) => {
                if (err) {
                    console.log(err)
                } else {
                    res.send("written");
                }

            });
        }

    });
})

app.get('/:id', (request, response) => {

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

        if (pokemon === undefined) {

            // send 404 back
            response.status(404);
            response.send("not found");
        } else {

            response.send(pokemon);
        }
    });
});


//To display list of all pokemons by default, and also handle different types query
app.get('/', (request, response) => {
    if (request.query.sortby === "name") {
        let result = [];
        jsonfile.readFile(FILE, (err, obj) => {
            if (err) {
                console.log(err)
            } else {

                for (let i = 0; i < obj.pokemon.length; i++) {
                    result.push(obj.pokemon[i].name);
                }
                result = result.sort();
                let endResult = "";
                for (let i = 0; i < result.length; i++) {
                    endResult += `<li>${result[i]}</li>`
                }
                response.send(`
        <h2>List of all Pokemons:</h2>
        <form method="GET">${sortingMethods()}
        </form>
        <ul>${endResult}</ul>`);
            }
        })
    } else if (request.query.sortby === "weight") {
        let result = [];
        jsonfile.readFile(FILE, (err, obj) => {
            if (err) {
                console.log(err)
            } else {

                for (let i = 0; i < obj.pokemon.length; i++) {
                    result.push({
                        name: obj.pokemon[i].name,
                        weight: obj.pokemon[i].weight
                    });
                }
                result.sort((a, b) => (parseFloat(a.weight) > parseFloat(b.weight)) ? 1 : -1);
                let endResult = "";
                for (let i = 0; i < result.length; i++) {
                    endResult += `<li>${result[i].name} - ${result[i].weight}</li>`
                }
                response.send(`
        <h2>List of all Pokemons:</h2>
        <form method="GET">${sortingMethods()}
        </form>
        <ul>${endResult}</ul>`);
            }
        })
    } else if (request.query.sortby === "height") {
        let result = [];
        jsonfile.readFile(FILE, (err, obj) => {
            if (err) {
                console.log(err)
            } else {

                for (let i = 0; i < obj.pokemon.length; i++) {
                    result.push({
                        name: obj.pokemon[i].name,
                        height: obj.pokemon[i].height
                    });
                }
                result.sort((a, b) => (parseFloat(a.height) > parseFloat(b.height)) ? 1 : -1);
                let endResult = "";
                for (let i = 0; i < result.length; i++) {
                    endResult += `<li>${result[i].name} - ${result[i].height}</li>`
                }
                response.send(`
        <h2>List of all Pokemons:</h2>
        <form method="GET">${sortingMethods()}
        </form>
        <ul>${endResult}</ul>`);
            }
        })
    } else {
        let result = "";
        jsonfile.readFile(FILE, (err, obj) => {
            if (err) {
                console.log(err)
            } else {
                for (let i = 0; i < obj.pokemon.length; i++) {
                    result += `<li>${obj.pokemon[i].name}</li>`;
                }
                response.send(`
        <h2>List of all Pokemons:</h2>
        <form method="GET">
        ${sortingMethods()}
        </form>
        <ul>${result}</ul>`);
            }
        })
    }



});

var sortingMethods = function() {
    return `<select name="sortby" placeholder="Select a sorting method" onchange="this.form.submit()">
        <option value="">Select a Sorting Method</option>
        <option value="name">Sort by Name</option>
        <option value="weight">Sort by Weight</option>
        <option value="height">Sort by Height</option>
        </select>`
}

app.get('/pokemon/:id/edit', (req, res) => {
    let id = req.params.id;

    jsonfile.readFile(FILE, (err, obj) => {
        let pokemon = obj.pokemon[id-1];
        res.render("edit",pokemon);

// {
//       "id": 1,
//       "num": "001",
//       "name": "Bulbasaur",
//       "img": "http://www.serebii.net/pokemongo/pokemon/001.png",
//       "height": "0.71 m",
//       "weight": "6.9 kg",
//       "candy": "Bulbasaur Candy",
//       "candy_count": "25",
//       "egg": "2 km",
//       "avg_spawns": "69",
//       "spawn_time": "20:00"
//     },

    });
})



app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));