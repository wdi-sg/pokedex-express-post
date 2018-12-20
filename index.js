const express = require('express');
const app = express();
const jsonfile = require('jsonfile');
const methodOverride = require('method-override')
const file = 'pokedex.json';
const editpage = 'editpage.jsx';
const homepage = 'homepage.jsx';
const pokemonpage = 'pokemonpage.jsx';
const reactEngine = require('express-react-views').createEngine();
var pokedex = [];

app.use(methodOverride('_method'));
app.engine('jsx', reactEngine);
app.set('views', __dirname + '/views');
app.set('view engine', 'jsx');
app.use(express.json());
app.use(express.static(__dirname+'/public/'));
app.use(express.urlencoded({
  extended: true
}));

app.get('/', (request, response) => {
    response.redirect('/pokemon');
});

app.get('/pokemon/new', (request, response) => {
    jsonfile.readFile(file, (err,obj) => {
        err ? console.error(err) : 0;
        response.render(editpage);
    });
});

app.get('/pokemon', (request, response) => {
    let sortMethod = request.query.sortby;
    jsonfile.readFile(file, (err,obj) => {
        err ? console.error(err) : 0;
        response.render(homepage, sortObject(sortMethod, obj));
    });
});

app.get('/pokemon/:id/edit', (request, response) => {
    jsonfile.readFile(file, (err,obj) => {
        err ? console.error(err) : 0;
        response.render(editpage, getPokemonByID(request.params.id, obj.pokemon));
    });
})

app.get('/pokemon/:id', (request, response) => {
    jsonfile.readFile(file, (err,obj) =>{
        err ? console.error(err) : 0;
        response.render(pokemonpage, getPokemonByID(request.params.id, obj.pokemon));
    });
});

app.put('/pokemon/:id', (request, response) => {
    jsonfile.readFile(file, (err,obj) =>{
        let ID = request.params.id;
        let sortMethod = request.query.sortby;
        err ? console.error(err) : 0;
        if (getPokemonByID(ID, obj.pokemon)){
            updatePokemon(request.body, getPokemonByID(ID, obj.pokemon))
        } else {
            obj.pokemon.push(generateNewPokemon(request.body, obj.pokemon));
        }
        jsonfile.writeFile(file, obj, err => {
            err ? console.error(err) : 0;
            response.redirect('/pokemon/' + ID);
        })
    });
});

function getPokemonByID(pokemonID, pokedex){
    //Iterate through the Pokedex. If the Pokemon exists in the Pokedex, return the Pokemon object.
    return pokedex.find(pokemon => {
        return pokemon.id === parseInt(pokemonID);
    });
}

function updatePokemon(update, original){
    parseInt(update["id"]) !== NaN ? update["id"] = parseInt(update["id"]) : 0;
    for (let key in update){
        original[key] === update[key] ? 0 : original[key] = update[key];
    }
}

app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));

function sortObject(sortMethod, obj){
    switch(sortMethod){
        case "name":
            return {"pokemon": obj.pokemon.sort(nameComparator), "sortMethod": "num"};
        case "weight":
            return {"pokemon": obj.pokemon.sort(weightComparator), "sortMethod": sortMethod};
        case "height":
            return {"pokemon": obj.pokemon.sort(heightComparator), "sortMethod": sortMethod};
        default:
            obj["sortMethod"] = "num";
            return obj;
    }
}

function comparatorWork(first, second, type){
    if (first[type] < second[type]){
        return -1;
    } else if (first[type] > second[type]){
        return 1;
    } else {
        return 0;
    }
}

function nameComparator(first,second){
    return comparatorWork(first, second, "name");
}

function weightComparator(first, second){
    return comparatorWork(first, second, "weight");
}

function heightComparator(first, second){
    return comparatorWork(first, second, "height");
}

// app.post('/pokemon', (request, response) => {
//     jsonfile.readFile(file, (err, obj) => {
//         initializeRead(err, obj);
//         let userInput = request.body;
//         let newPokemon = generateNewPokemon(userInput);
//         pokedex.push(newPokemon);
//         jsonfile.writeFile(file, obj, (err) => {
//             if (err) { console.error(err) };
//             response.send(dropdownMenu + cssString + sortObject("default"));
//         });
//     });
// });

function generateNewPokemon(userInput, pokedex){
    let obj = {
            "id": pokedex.length + 1,
            "num": (pokedex.length + 1).toString(),
            "name": userInput.name,
            "img": userInput.img,
            "height": userInput.height,
            "weight": userInput.weight,
            "candy": userInput.candy,
            "candy_count": userInput.candy_count,
            "egg": userInput.egg,
            "avg_spawns": userInput.avg_spawns,
            "spawn_time": userInput.spawn_time
        }
    return obj;
}