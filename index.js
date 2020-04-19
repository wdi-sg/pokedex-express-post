const express = require('express');
const jsonfile = require('jsonfile');
const path = require('path');

const file = 'pokedex.json';
const file2 = 'pokedex-2.json';

/**
 * ===================================
 * Configurations and set up
 * ===================================
 */

// Init express app
const app = express();



//ReactViews

const reactEngine = require('express-react-views').createEngine();

app.use(express.urlencoded({
    extended: true
}));

app.engine('jsx', reactEngine);

app.set('views', __dirname + '/views');

app.set('view engine', 'jsx');

/**
 * ===================================
 * Routes
 * ===================================
 */

app.get('/pokemon/new', (req, res) => {
    res.render('pokemon-new-form');
});

app.get('/pokemon/:id', (req, res) => {

    // get json from specified file
    jsonfile.readFile(file, (err, obj) => {

        // check to make sure the file was properly read
        if (err) {

            console.log("error with json read file:", err);
            res.status(503).send("error reading filee");
            return;
        }
        // obj is the object from the pokedex json file
        // extract input data from request
        let inputId = parseInt(req.params.id);

        let pokemon;

        // find pokemon by id from the pokedex json file
        for (let i = 0; i < obj.pokemon.length; i++) {

            let currentPokemon = obj.pokemon[i];

            if (currentPokemon.id === inputId) {
                pokemon = currentPokemon;
            }
        }

        if (pokemon === undefined) {

            // send 404 back
            res.status(404);
            res.send("not found");

        } else {

            const data = {
                pokemon: obj.pokemon.filter(pkmn => {
                    return parseInt(pkmn.id) === parseInt(req.params.id);
                })
            }

            console.log(data.pokemon[0].name);

            res.render('individual-pokemon', data);
        }
    });
});

app.post('/pokemon', (req, res) => {
    jsonfile.readFile(file, (err, obj) => {

        const data = {}
        let idOrNumExists = false;

        obj.pokemon.forEach(poke => {
            if (poke.id == req.body.id ||
                poke.num == req.body.num) {

                let lastID = obj.pokemon[0].id;
                for (let pkm of obj.pokemon) {
                    if (pkm.id > lastID) {
                        lastID = pkm.id;
                    }
                }

                data.message = `Pokemon ID or Number already exists. The last Pokemon ID and Number is ${lastID}.`;
                idOrNumExists = true;
                res.render('pokemon-new-form', data);
            }
        })


        if (!idOrNumExists) {
            const newPokemon = {
                id: parseInt(req.body.id),
                num: req.body.num,
                name: req.body.name,
                img: req.body.img,
                height: req.body.height,
                weight: req.body.weight,
                type: req.body.type.split(" ")
            }

            const emptyFieldArr = [];

            for (let prop in newPokemon) {
                if (!newPokemon[`${prop}`])
                    emptyFieldArr.push(prop);
            }

            if (emptyFieldArr.length > 0) {
                data.message = `Empty or invalid input at the following fields: ${emptyFieldArr.join(', ')}`;
                res.render('pokemon-new-form', data);

            } else {

                obj.pokemon.push(newPokemon);

                jsonfile.writeFile(file, obj, (err) => {
                    if (err) console.log(err);
                });

                res.redirect(`/pokemon/${newPokemon.id}`);
            }
        }
    })
})

app.get('/sort', (req, res) => {

    jsonfile.readFile(file, (err, obj) => {
        const selectedProp = req.query.property;

        const compareSelectedProp = (a, b) => {

            const valueA = a[selectedProp];
            const valueB = b[selectedProp];
            let comparisonVal = 0;

            if (valueA > valueB) {
                comparisonVal = 1;
            } else if (valueA < valueB) {
                comparisonVal = -1;
            }

            return comparisonVal;
        }

        obj.pokemon.sort(compareSelectedProp);

        const data = obj;

        jsonfile.writeFile(file, obj, (err) => {
            if (err) console.log(err)
            else {
                res.render('sorted-list', data);
            }
        })
    })
})

app.get('/reset', (req, res) => {
    jsonfile.readFile(file2, (err, obj) => {
        jsonfile.writeFile(file, obj, (err) => {
            if (err) console.log(err)
        })
    })

    res.render('reset');
})

app.get('/types', (req, res) => {

    jsonfile.readFile(file, (err, obj) => {

        let typesArr = [];

        obj.pokemon.forEach(pkmn => {
            let pkmnTypes = pkmn.type.flat(4);

            pkmnTypes.forEach(type => {
                if (!typesArr.includes(type)) {
                    typesArr.push(type);
                }
            })
        })

        data = {
            types: typesArr
        }

        res.render('types', data);
    })
})

app.get('/types/:typ', (req, res) => {

    jsonfile.readFile(file, (err, obj) => {

        let pokeTypeArr = [];

        obj.pokemon.forEach(pkmn => {
            let pkmnTypes = pkmn.type.flat(4);

            pkmnTypes.forEach(type => {
                if (type == req.params.typ) {
                    pokeTypeArr.push(pkmn);
                }
            })
        })

        data = {
            pokemon: pokeTypeArr
        }

        console.log(pokeTypeArr);

        res.render('individual-type', data);
    })

})

app.get('/', (req, res) => {
    res.render('index');
});

//Serve CSS file
app.use(express.static(path.join(__dirname, 'public')));

/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));

//CUTE DOG: https://static.businessinsider.sg/2019/12/12/5df126b679d7570ad2044f3e.png