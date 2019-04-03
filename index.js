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

app.get('/:id', (request, response) => {
  // get json from specified file
  jsonfile.readFile(FILE, (err, obj) => {
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
      response.send(pokemon);
    }
  });
});

app.get('/pokemon/new', (request, response) => {
    let  respond = '<h1>Add New Pokemon to Pokedex</h1>'+
                   '<form method="POST" action="/pokemon">'+
                   'Pokemon id: <input type="text" name="id"><br>'+
                   'Pokemon num: <input type="text" name="num"><br>'+
                   'Pokemon name: <input type="text" name="name"><br>'+
                   'Pokemon img: <input type="text" name="img"><br>'+
                   'Pokemon height: <input type="text" name="height"><br>'+
                   'Pokemon weight: <input type="text" name="weight"><br>'+
                   '<button>Submit</button>'
                   '</form>';
    response.send(respond);
});

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
        console.log(newPokemon);
        jsonfile.writeFile(FILE, obj, (err) =>{
            // arr.push(newPokemon);
            // console.log(newPokemon);
            response.send(request.body);
        })
    });
})

app.get('/pokemon/:id/edit', (request, response) => {
    const id = parseInt(request.params.id); // 1
    jsonfile.readFile(FILE, (err, json) => {
        const arr = json["pokemon"];
        let data; // is an {}
        for (let i = 0; i < arr.length; i++) {
            if (arr[i]["id"] === id) {
                data = arr[i];
            }
        }
        response.render('home', data);
    })
})

app.put('/pokemon/:id', (request, response) => {
    // console.log(request.body);
    //get the current contents of the file
    jsonfile.readFile(FILE, (err, json) => {
        // get the location in the array we are requesting
        let arrayIndex = parseInt( request.params.id ) - 1;
        console.log(arrayIndex);
        // individually edit each value in the animal *object*
        json.pokemon[arrayIndex].name = request.body.name;
        json.pokemon[arrayIndex].img = request.body.img;
        json.pokemon[arrayIndex].height = request.body.height;
        json.pokemon[arrayIndex].weight = request.body.weight;
        json.pokemon[arrayIndex].candy = request.body.candy;
        json.pokemon[arrayIndex]["candy_count"] = parseFloat(request.body["candy_count"]);
        json.pokemon[arrayIndex].egg = request.body.egg;
        json.pokemon[arrayIndex]["avg_spawns"] = parseFloat(request.body["avg_spawns"]);
        json.pokemon[arrayIndex]["spawn_time"] = request.body["spawn_time"];
        // we dont need to reassign this, but lets be explicit about the change
        // const changedObj = contentsOfFile;
        jsonfile.writeFile(FILE, json, (err) => {
            // console.error(err)
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



app.get('/', (request, response) => {
    let htmlContent = '<h1>List of Pokemon</h1>';
    jsonfile.readFile(FILE, (err, obj) => {
        const arr = obj["pokemon"];
        for (let i = 0; i < arr.length; i++) {
            htmlContent += `<li>${arr[i]["name"]}</li>`;
        }
        htmlContent += `<form method="GET"action="/?sortby=name">
            <button>Sort by Name</button>
            </form>`;
        response.send(htmlContent);
    })
});

app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));