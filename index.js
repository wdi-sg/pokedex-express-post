const express = require('express');
const app = express();
const jsonfile = require('jsonfile');

const FILE = 'pokedex.json';

// For body-parser?
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

const methodOverride = require('method-override');
app.use(methodOverride('_method'));

const reactEngine = require('express-react-views').createEngine();
app.engine('jsx', reactEngine);

app.set('views', __dirname + '/views');

app.set('view engine', 'jsx');

// We should render a jsx instead and change the route to /pokemon/:id
app.get('/pokemon/:id', (request, response) => {
    const id = parseInt(request.params.id);
    jsonfile.readFile(FILE, (err, json) => {
        let pokemon;
        const arr = json["pokemon"];
        for (let i = 0; i < arr.length; i++) {
            if(id === arr[i]["id"]){
                pokemon = arr[i];
            }
        }
        // if pokemon !found we can render an error page? ...
        if (pokemon === undefined) {
            response.status(404);
            response.send("not found");
        } else {
            // response.redirect('show', pokemon);
            response.send(pokemon);
        }
  });
});

// Once again, we need to create a jsx file to render a form for new Pokemon
app.get('/pokemon/new', (request, response) => {
    let  respond = '<h1>Add New Pokemon to Pokedex</h1>'+
                   '<form method="POST" action="/pokemon">'+
                   'Pokemon name: <input type="text" name="name"><br>'+
                   'Pokemon img: <input type="text" name="img"><br>'+
                   'Pokemon height: <input type="text" name="height"><br>'+
                   'Pokemon weight: <input type="text" name="weight"><br>'+
                   '<button>Submit</button>'
                   '</form>';
    response.send(respond);
});

// Redirect user to single Pokemon pg.
app.post('/pokemon', (request, response) => {
    jsonfile.readFile(FILE, (err, obj) => {
        // Not going to use entire request.body as id and num are different
        const arr = obj["pokemon"];
        const newPokemon = {};
        newPokemon["id"] = arr.length + 1;
        newPokemon["num"] = (arr.length + 1).toString();
        newPokemon["name"] = request.body["name"];
        newPokemon["img"] = request.body["img"];
        newPokemon["height"] = request.body["height"];
        newPokemon["weight"] = request.body["weight"];
        arr.push(newPokemon);
        // console.log(newPokemon);
        jsonfile.writeFile(FILE, obj, (err) =>{
            // To simplify things, we will just render name, img, height and weight
            // response.redirect('single', newPokemon)
            response.send(request.body);
        })
    });
})

app.get('/pokemon/:id/edit', (request, response) => {
    const id = parseInt(request.params.id);
    jsonfile.readFile(FILE, (err, json) => {
        const arr = json["pokemon"];
        let data; // is an {}
        for (let i = 0; i < arr.length; i++) {
            if (arr[i]["id"] === id) {
                data = arr[i];
            }
        }
        response.render('edit', data);
    })
})

// Renders a single-Pokemon pg.
app.put('/pokemon/:id', (request, response) => {
    // console.log(request.body); {}
    let arrayIndex = parseInt( request.params.id ) - 1;
    //get the current contents of the file
    jsonfile.readFile(FILE, (err, json) => {
        // console.log(arrayIndex);
        // individually edit each value in the Pokemon *object*
        // REFACTOR?
        const selectedArr = json.pokemon[arrayIndex]; // {}
        selectedArr.name = request.body.name;
        selectedArr.img = request.body.img;
        selectedArr.height = request.body.height;
        selectedArr.weight = request.body.weight;
        // json.pokemon[arrayIndex].candy = request.body.candy;
        // json.pokemon[arrayIndex]["candy_count"] = parseFloat(request.body["candy_count"]);
        // json.pokemon[arrayIndex].egg = request.body.egg;
        // json.pokemon[arrayIndex]["avg_spawns"] = parseFloat(request.body["avg_spawns"]);
        // json.pokemon[arrayIndex]["spawn_time"] = request.body["spawn_time"];
        jsonfile.writeFile(FILE, json, (err) => {
            // To simplify things, we will just render name, img, height and weight
            // response.redirect('single', selectedArr)
            response.send(request.body);
        });
    });
})

app.get('/pokemon/:id/delete', (request, response) => {
    let id = parseInt( request.params.id );
    jsonfile.readFile(FILE, (err, json) => {
        const arr = json["pokemon"];
        let data; // is an {}
        for (let i = 0; i < arr.length; i++) {
            if (arr[i]["id"] === id) {
                data = arr[i];
            }
        }
        response.render('delete', data);
    })
})

app.delete('/pokemon/:id', (request, response) => {
    let id = parseInt( request.params.id ) - 1;

    //get the current contents of the file
    jsonfile.readFile(FILE, (err, json) => {
        const nameOfDeleted = json.pokemon[id].name;
        // change the current contents of the file
        json.pokemon.splice(id, 1);

        jsonfile.writeFile(FILE, json, (err) => {
        // console.error(err)
        // now look inside your json file
        response.send(`You deleted ${nameOfDeleted}..`);
    });
  });
})

app.get('/pokemon', (request, response) => {
    // readFile
    // render 'home', FILE

    let htmlContent = '<h1>Click Sort to Display the Pokemons</h1>'+
                      '<form method="GET">'+
                      '<select name="sortby">'+
                      '<option value="name">Sort by Name</option>'+
                      '<option value="id">Sort by ID</option>'+
                      '</select>'+
                      '<button>Sort</button>'+
                      '</form>';
    jsonfile.readFile(FILE, (err, obj) => {
        const arr = obj["pokemon"];
        if (request.query.sortby === "id") {
            for (let i = 0; i < arr.length; i++) {
            htmlContent += `<li>${arr[i]["name"]}</li>`;
            }
        } else if (request.query.sortby === "name") {
            const nameArr = [];
            for (let i = 0; i < arr.length; i++) {
                nameArr.push(arr[i]["name"]);
            }
            nameArr.sort();
            for (let i = 0; i < nameArr.length; i++) {
                htmlContent += `<li>${nameArr[i]}</li>`;
            }
        }
        response.send(htmlContent);
    })
});

app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));