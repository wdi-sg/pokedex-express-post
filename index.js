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

let doSorting = function(arr, sortMethod) {
    if (sortMethod === "name")
        return arr.slice().sort((a, b) => (a[sortMethod] > b[sortMethod]) ? 1 : -1)
    else
        return arr.slice().sort((a, b) => (parseFloat(a[sortMethod]) > parseFloat(b[sortMethod])) ? 1 : -1)
}

app.get('/pokemon/:id', (req, res) => {
    let id = parseInt(req.params.id);
    console.log(id);

    jsonfile.readFile(FILE, (err, obj) => {
        let pokemonArr = obj.pokemon;
        for (let i = 0; i < pokemonArr.length; i++) {
            if (pokemonArr[i].id === id) {
                console.log(pokemonArr[i]);
                let data = {
                    pokemon : pokemonArr[i]
                };
                res.render('individual', data);
                break;
            }

        }
    })
})

app.get('/pokemon/:id/edit', (req, res) => {
    let id = req.params.id;

    jsonfile.readFile(FILE, (err, obj) => {
        let pokemon = obj.pokemon[id - 1];
        res.render("edit", pokemon);
    });
})

app.put('/pokemon/:id', (req, res) => {
    let id = req.params.id;
    let pokemon = req.body;
    pokemon.id = parseInt(pokemon.id);
    jsonfile.readFile(FILE, (err, obj) => {
        obj.pokemon[id - 1] = pokemon
        jsonfile.writeFile(FILE, obj, (err) => {
            res.redirect(`/pokemon/${id}`);
        });
    });
})

app.get('/pokemon/:id/delete', (req, res) => {
    let id = req.params.id;
    jsonfile.readFile(FILE, (err, obj) => {
        let pokemon = obj.pokemon[id - 1];
        res.render("delete", pokemon);
    });
})

app.delete('/pokemon/:id', (req, res) => {
    let id = req.params.id;
    jsonfile.readFile(FILE, (err, obj) => {
        obj.pokemon.splice(id - 1, 1);
        jsonfile.writeFile(FILE, obj, (err) => {
            res.send("Deleted");
        });
    });
})



app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));