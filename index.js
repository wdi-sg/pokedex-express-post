const express = require('express');
const app = express();
const jsonfile = require('jsonfile');
const file = 'pokedex.json';
const editpage = 'editpage.jsx';
const homepage = 'homepage.jsx';
const pokemonpage = 'pokemonpage.jsx';
const reactEngine = require('express-react-views').createEngine();
var pokedex = [];

app.engine('jsx', reactEngine);
app.set('views', __dirname + '/views');
app.set('view engine', 'jsx');
app.use('/', express.static('public'))
app.use(express.json());

app.use(express.urlencoded({
  extended: true
}));

app.get('/', (request, response) => {
    let sortMethod = request.query.sortby;
    jsonfile.readFile(file, (err,obj) => {
        err ? console.error(err) : 0;
        response.render(homepage, sortObject(sortMethod, obj));
    });
});

app.get('/pokemon/:id/edit', (request, response) => {
    jsonfile.readFile(file, (err,obj) => {
        err ? console.error(err) : 0;
        response.render(editpage, getPokemonByID(parseInt(request.params.id), obj.pokemon));
    });
})

app.get('/pokemon/:id', (request, response) => {
    jsonfile.readFile(file, (err,obj) =>{
        err ? console.error(err) : 0;
        response.render(pokemonpage, getPokemonByID(parseInt(request.params.id), obj.pokemon));
    });
});

app.post('/pokemon/:id', (request, response) => {
    console.log(request.params);
});

function getPokemonByID(pokemonID, pokedex){
    //Iterate through the Pokedex. If the Pokemon exists in the Pokedex, return the Pokemon object.
    return pokedex.find(pokemon => {
        return pokemon.id === pokemonID;
    });
}


// app.get('/pokemon/new', (request, response) => {
//     jsonfile.readFile(file, (err,obj) => {
//         initializeRead(err, obj);
//         response.send(newPokemonForm);
//     });
// });

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

function generateNewPokemon(userInput){
    let obj = {
            "id": pokedex.length + 1,
            "num": (pokedex.length + 1).toString(),
            "name": userInput.name,
            "img": userInput.img,
            "height": userInput.height,
            "weight": userInput.weight,
            "candy": "None",
            "egg": "Not in Eggs",
            "avg_spawns": 0,
            "spawn_time": "N/A"
        }
    return obj;
}