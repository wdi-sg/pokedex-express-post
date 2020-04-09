const express = require('express');
const jsonfile = require('jsonfile');
const FILE = 'pokedex.json';
/**
 * ===================================
 * Configurations and set up
 * ===================================
 */
// Init express app
const app = express();
const reactEngine = require('express-react-views').createEngine();
app.engine('jsx', reactEngine);
app.set('views', __dirname + '/views');
app.set('view engine', 'jsx');
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

const capitalize = (s) => {
    if (typeof s !== 'string') return ''
    return s.charAt(0).toUpperCase() + s.slice(1)
}

/**
 * ===================================
 * Routes
 * ===================================
 */
//THE INPUT FORM PAGE.
app.get(`/pokemon/new`, (req, res) => {
    res.render('form')
})

app.get(`/pokemon/:id`, (req, res) => {

    const queryId = parseInt(req.params.id);
    jsonfile.readFile(FILE, (err, obj) => {

        //Is there an error? If so, console log it. If not, do nothing.
        err ? console.log(`error: ${err}`) : null

        const array = obj.pokemon
        const foundPokemon = array.find((pokemon) => pokemon.id === queryId);
        if (foundPokemon === undefined) {
            // send 404 back
            res.status(404);
            res.send("not found");
        } else {
            const data = foundPokemon
            res.render('pokemon', data)
        }
    })
})



app.get(`/type/:x`, (req, res) => {

    const query = capitalize(req.params.x)
    jsonfile.readFile(FILE, (err, obj) => {

        const pokeArray = obj.pokemon

        const findType = (pokemon) => {
            const typeArray = pokemon.type;
            if (typeArray !== undefined) {
                const result = typeArray.find(type => type === query);
                return result ? pokemon : false
            }
        }

        const foundPokemon = pokeArray.filter(findType);

        const data = {
            list: foundPokemon,
            query: query
        }

        res.render('typelist', data);

    })
})

//POSTING TO THE POKEMON ROUTE
app.post(`/pokemon`, (req, res) => {

    const newObj = req.body
    const inputKeys = Object.keys(newObj)

    for (let i = 0; i < inputKeys.length; i++) {
        let currentKey = inputKeys[i]

        //Check if any of the fields are empty.
        if (newObj[currentKey] === "") {
            //Create error message.
            const data = {
                error: `There was an error with your ${currentKey} input.`
            }
            //Reload the form, with error message.
            return res.render('form', data)
        }
    }

    jsonfile.readFile(FILE, (err, obj) => {
        const array = obj.pokemon
        if (err) {
            console.log("error with json read file:", err);
            response.status(503).send("error reading filee");
            return;
        }
        const newPokemon = {
            id: (array.length + 1),
            num: (array.length + 1).toString(),
            name: req.body.name,
            img: req.body.img,
            height: req.body.height,
            weight: req.body.weight
        }
        array.push(newPokemon);
        jsonfile.writeFile(FILE, obj, (err) => {
            err ? console.log(`error: ${err}`) : res.redirect(`/pokemon/${newPokemon.id}`)
        })
    })
})

app.get('/', (req, res) => {

    jsonfile.readFile(FILE, (err, obj) => {

      const pokeArray = obj.pokemon

        if (err) {
            console.log(`error w reading file: ${err}`);
        }

        const sortingQuery = req.query.sort
        let data;
        let sorted;
        if (sortingQuery === undefined) {
          sorted = pokeArray;
        } else if (sortingQuery===`nameAscend`) {
          sorted = pokeArray.sort( (a,b) => (a.name > b.name) ? 1 : -1 )
        } else if (sortingQuery===`nameDescend`) {
          sorted = pokeArray.sort( (a,b) => (a.name < b.name) ? 1 : -1 )
        } else if (sortingQuery===`type`) {
          sorted = pokeArray.sort( (a,b) => (a.type > b.type) ? 1 : -1 )
        } else if (sortingQuery===`idAscend`) {
          sorted = pokeArray.sort( (a,b) => (a.id > b.id) ? 1 : -1 )
        }else if (sortingQuery===`idDescend`) {
          sorted = pokeArray.sort( (a,b) => (a.id < b.id) ? 1 : -1 )
        } else if (sortingQuery===`heightAscend`) {
          sorted = pokeArray.sort( (a,b) => {
            let height1 = parseFloat(a.height);
            let height2 = parseFloat(b.height);
            return (height1 > height2) ? 1 : -1
          })
        } else if (sortingQuery===`heightDescend`) {
          sorted = pokeArray.sort( (a,b) => {
            let height1 = parseFloat(a.height);
            let height2 = parseFloat(b.height);
            return (height1 < height2) ? 1 : -1
          })
        } else if (sortingQuery===`weightAscend`) {
          sorted = pokeArray.sort( (a,b) => {
            let weight1 = parseFloat(a.weight);
            let weight2 = parseFloat(b.weight);
            return (weight1 > weight2) ? 1 : -1
          })
        } else if (sortingQuery===`weightDescend`) {
          sorted = pokeArray.sort( (a,b) => {
            let weight1 = parseFloat(a.weight);
            let weight2 = parseFloat(b.weight);
            return (weight1 < weight2) ? 1 : -1
          })
        }
        data = {
            pokeData: sorted
        }
        res.render('index', data);

    })

});

app.get('/sort', (req, res) => {

    console.log(req.query.sort)

    jsonfile.readFile(FILE, (err, obj) => {
        if (err) {
            console.log(`error w reading file: ${err}`);
        }

        const data = {
            pokeData: obj.pokemon
        }

        res.render('index', data);

    })

});

/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));
