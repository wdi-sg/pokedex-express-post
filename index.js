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
                                "<option>Number</option>" +
                                "<option value='name'>Name</option>" +
                                "<option value='height'>Height</option>" +
                                "<option value='weight'>Weight</option>" +
                            "</select>" +
                            "<input type='submit'>" +
                        "</form>";

const cssString =   `<style>
                        div{
                            display: inline-block;
                            width: 120px;
                            height: 120px;
                            text-align:center;
                            margin: 10px 20px 10px 20px;
                        }
                        h1{
                            font-family: "Verdana", sans-serif;
                            font-size: 16pt;
                            margin: 3px auto;
                        }
                        img{
                            width: 100%;
                            height: 100%;
                        }
                        p{
                            font-family: "Arial", sans-serif;
                            font-size: 12pt;
                            margin: 3px auto;
                        }
                    </style>`

var pokedex = [];

app.use(express.json());

app.use(express.urlencoded({
  extended: true
}));

app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));

app.get('/pokemon/new', (request, response) => {
    jsonfile.readFile(file, (err,obj) => {
        initializeRead(err, obj);
        response.send(newPokemonForm);
    });
});

app.get('/', (request, response) => {
    let sortMethod = request.query.sortby;
    jsonfile.readFile(file, (err,obj) => {
        initializeRead(err, obj);
        response.send(dropdownMenu + cssString + sortPokedex(sortMethod));
    });
});

function sortPokedex(sortMethod){
    switch(sortMethod){
        case "name":
            return getHTMLString(pokedex.sort(stringComparator));
        case "weight":
            return getHTMLString(numberComparator(pokedex, "weight"));
        case "height":
            return getHTMLString(numberComparator(pokedex, "height"));
        default:
            return getHTMLString(pokedex);
    }
}

function getHTMLString(array){
    let resultString =  "";
    array.forEach(pokemon => {
        resultString+= `
            <div>
                <img src="${pokemon.img}">
                <h1>${pokemon.name}</h1>
                <p>#${pokemon.num}</p>
            </div>
            `
    });
    return resultString;
}

function stringComparator(first,second){
    if (first.name < second.name){
        return -1;
    } else if (first.name > second.name){
        return 1;
    } else {
        return 0;
    }
}

function numberComparator(array, category){
    return array.sort((first, second) => {
        return (parseFloat(first[category]) > parseFloat(second[category])) ? 1 : -1;
    });
}

app.post('/pokemon', (request, response) => {
    jsonfile.readFile(file, (err, obj) => {
        initializeRead(err, obj);
        let userInput = request.body;
        let newPokemon = generateNewPokemon(userInput);
        pokedex.push(newPokemon);
        jsonfile.writeFile(file, obj, (err) => {
            if (err) { console.error(err) };
            response.send(dropdownMenu + cssString + sortPokedex("default"));
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