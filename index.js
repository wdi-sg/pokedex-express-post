const express = require('express');
const app = express();
const jsonfile = require('jsonfile');
const file = 'pokedex.json';

const newPokemonForm =  "<html>" +
                            "<body>" +
                                "<form method='POST' action='/pokemon'>" +
                                    "<input type='text' name='name' placeholder='Name'><br/><br/>" +
                                    "<input type='text' name='img' placeholder='Image URL'><br/><br/>" +
                                    "<input type='text' name='height' placeholder='Height'><br/><br/>" +
                                    "<input type='text' name='weight' placeholder='Weight'><br/><br/>" +
                                    "<input type='submit'><br/><br/>" +
                                "</form>" +
                            "</body>" +
                        "</html>";

const dropdownMenu =    "<form method='GET' action='/'>" +
                            "<select name='sortby'>" +
                                "<option value='name'>Name</option>" +
                                "<option value='height'>Height</option>" +
                                "<option value='weight'>Weight</option>" +
                            "</select>" +
                            "<input type='submit'>" +
                        "</form>";
var pokedex = [];

app.use(express.json());

app.use(express.urlencoded({
  extended: true
}));

app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));

app.get('/pokemon/new', (request, response) => {
    response.send(newPokemonForm);
});

app.get('/', (request, response) => {
    let sortMethod = request.query.sortby;
    jsonfile.readFile(file, (err,obj) => {
        initializeRead(err, obj);
        response.send(dropdownMenu + sortPokedex(sortMethod));
    });
});

function sortPokedex(sortMethod){
    switch(sortMethod){
        case "name":
            return pokedex.map(pokemon => {
                return pokemon.name;
            }).sort().join("<br/>");
        case "weight":
            return comparator(pokedex, "weight").map(getPokemonName).join("<br/>");
        case "height":
            return comparator(pokedex, "height").map(getPokemonName).join("<br/>");
        default:
            return comparator(pokedex,"id").map(getPokemonName).join("<br/>");
    }
}

function comparator(array, category){
    return array.sort((first, second) => {
        return (parseFloat(first[category]) > parseFloat(second[category])) ? 1 : -1;
    });
}

app.post('/pokemon', (request, response) => {
    jsonfile.readFile(file, (err, obj) => {
        initializeRead(err, obj);
        let userInput = request.body;
        console.log('here');
        let newPokemon = generateNewPokemon(userInput);
        pokedex.push(newPokemon);

        jsonfile.writeFile(file, pokedex, (err) => {
            if (err) { console.error(err) };
            response.send(pokedex);
        });
    });
});

function initializeRead(err, obj){
    if (err) { console.error(err) };
    pokedex = obj.pokemon;
}

function getPokemonName(pokemon){
    return pokemon.name;
}

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