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
// app.get('/pokemon/new', (req, res) => {
//     jsonfile.readFile(FILE, (err, obj) => {

//         if (err) {
//             console.log(err)
//         } else {
//             res.send(`
//         <h2>Please enter the details of a new Pokemon</h2>
//         <form method="POST" action="/pokemon">
//             <p>id</p><input type="number" name="id" readonly value=${obj.lastKey+1}>
//             <p>num</p><input type="text" name="num" readonly value=${obj.lastKey+1}>
//             <p>name</p><input type="text" name="name">
//             <p>img</p><input type="text" name="img">
//             <p>height</p><input type="text" name="height">
//             <p>weight</p><input type="text" name="weight">
//             <br>
//             <input type="submit">
//         </form>`);
//         }
//     })
// })

//endpoint that accepts POST request
// app.post('/pokemon', (req, res) => {
//     console.log("gonna write");

//     jsonfile.readFile(FILE, (err, obj) => {

//         if (err) {
//             console.log(err)
//         } else {
//             obj.lastKey++;
//             req.body.id = parseInt(req.body.id);
//             obj.pokemon.push(req.body);
//             jsonfile.writeFile(FILE, obj, (err) => {
//                 if (err) {
//                     console.log(err)
//                 } else {
//                     res.send("written");
//                 }

//             });
//         }

//     });
// })


app.get('/pokemon', (req, res) => {
    let sortMethod = req.query.sortby;
    jsonfile.readFile(FILE, (err, obj) => {
        if (sortMethod) {
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

let doSorting = function(arr, sortMethod) {
    if (sortMethod === "name")
        return arr.slice().sort((a, b) => (a[sortMethod] > b[sortMethod]) ? 1 : -1)
    else
        return arr.slice().sort((a, b) => (parseFloat(a[sortMethod]) > parseFloat(b[sortMethod])) ? 1 : -1)
}

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