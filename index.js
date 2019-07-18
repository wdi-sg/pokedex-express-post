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
///////////////////////////////////////


//main page that list all pokemon
app.get('/pokemon', (req, res) => {
    let sortMethod = req.query.sortby;
    jsonfile.readFile(FILE, (err, obj) => {
        if (sortMethod) {
            //send to doSorting function to do sorting, then return a copy of array with new order
            let pokArray = doSorting(obj.pokemon, sortMethod);
            let data = {
                pokemon: pokArray
            }
            res.render("main", data);
        } else {
            res.render("main", obj);
        }

    });
})

//for adding new pokemon
app.get('/pokemon/new', (req, res) => {
    jsonfile.readFile(FILE, (err, obj) => {
        let newKey = obj.lastKey + 1;
        let data = {
            data: newKey
        };
        res.render('add', data);
    })
})

app.post('/pokemon', (req, res) => {
    jsonfile.readFile(FILE, (err, obj) => {
        obj.pokemon.push(req.body);
        obj.lastKey++;
        jsonfile.writeFile(FILE, obj, (err) => {
            res.redirect(`/pokemon/${obj.pokemon.length-1}`);
        });
    });
})


//for checking individual pokemon
app.get('/pokemon/:id', (req, res) => {
    let id = parseInt(req.params.id);

    jsonfile.readFile(FILE, (err, obj) => {
        let foundPok = logarithmicComplex(obj.pokemon, obj.pokemon.length, id)
        let data = {
            pokemon: foundPok
        };
        res.render('individual', data);

    })
})


//for editing pokemon
app.get('/pokemon/:id/edit', (req, res) => {
    let id = req.params.id;

    jsonfile.readFile(FILE, (err, obj) => {
        let foundPok = logarithmicComplex(obj.pokemon, obj.pokemon.length, id)
        res.render("edit", foundPok);
    });
})

app.put('/pokemon/:id', (req, res) => {
    let id = req.params.id;
    let pokemon = req.body;
    pokemon.id = parseInt(pokemon.id);
    jsonfile.readFile(FILE, (err, obj) => {
        let foundPokIndex = logarithmicComplex(obj.pokemon, obj.pokemon.length, id, true)
        obj.pokemon[foundPokIndex] = pokemon
        jsonfile.writeFile(FILE, obj, (err) => {
            res.redirect(`/pokemon/${id}`);
        });
    });
})

//for deleting pokemon
app.get('/pokemon/:id/delete', (req, res) => {
    let id = req.params.id;
    jsonfile.readFile(FILE, (err, obj) => {
        let foundPok = logarithmicComplex(obj.pokemon, obj.pokemon.length, id)
        res.render("delete", foundPok);
    });
})

app.delete('/pokemon/:id', (req, res) => {
    let id = req.params.id;
    jsonfile.readFile(FILE, (err, obj) => {
        let foundPokIndex = logarithmicComplex(obj.pokemon, obj.pokemon.length, id, true)
        obj.pokemon.splice(foundPokIndex, 1);
        jsonfile.writeFile(FILE, obj, (err) => {
            res.redirect("/pokemon");
        });
    });
})

//do sorting based on sortMethod, send back a new copy of array
let doSorting = function(arr, sortMethod) {
    if (sortMethod === "name")
        return arr.slice().sort((a, b) => (a[sortMethod] > b[sortMethod]) ? 1 : -1)
    else
        return arr.slice().sort((a, b) => (parseFloat(a[sortMethod]) > parseFloat(b[sortMethod])) ? 1 : -1)
}

//use logarithmic complex algo to look for specific id, and send back that pokemon object
const logarithmicComplex = function(arr, n, id, getIndex = false) {

    let left = 0;
    let right = n - 1;
    while (left <= right) {
        let mid = Math.floor((left + right) / 2);
        if (arr[mid].id < id)
            left = mid + 1;
        else if (arr[mid].id > id)
            right = mid - 1;
        else
        if (getIndex === true)
            return mid
        else
            return arr[mid]
    }

}



app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));