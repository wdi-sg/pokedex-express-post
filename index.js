const express = require('express');
const jsonfile = require('jsonfile');
const file = 'pokedex.json';

const app = express();

//parser thing
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

//creating form on /pokemon/new [must be on top]
app.get('/pokemon/new', (request, response) => {

  console.log("birthing form");

// id, num, name, img, height, and weight

//set conditional to make id and num unique - use onclick function to self-generate a unique ID?

  let form = '';
  form = '<html>' +
    '<body>'+
    '<h1>Add your Pokémon</h1>'+
    '<form method="POST" action="/pokemon">'+
    '<h4>Name:</h4>' +
    '<input type="text" name="pokename">'+
    '<h4>ID:</h4>' +
    '<input type="text" name="id">'+
    '<h4>Num:</h4>' +
    '<input type="text" name="num">'+
    '<h4>Img Source:</h4>' +
    '<input type="text" name="img">'+
    '<h4>Height:</h4>' +
    '<input type="text" name="height">'+
    '<h4>Weight:</h4>' +
    '<input type="text" name="weight">'+
    '<br><input type="submit" value="Submit">'+
    '</form>'+
    '</body>'+
    '</html>';

  response.send(form);
});

//save the form data to pokedex.json

app.post('/pokemon', (request,response) => {

console.log("incoming pokemon entry");
var newPoke = request.body;
console.log(newPoke);

  // save in data file
jsonfile.readFile(file, (err, obj) => {
        //if error reading
        if (err) {
            console.log("could not read pokedex file");
            console.log(err)
        }

        //if not error
        obj.pokemon.push(newPoke);

        jsonfile.writeFile(file, obj, (err) => {
            //if error writing
            if (err) {
                console.log("could not write new poke");
                console.log(err);
                response.status(503).send("no work worry");
            } else {
            //show that the request was successful
            console.log("new mon successfully added");
            response.json(newPoke);
            }
        });
    });
});


//find pokemon info by name
app.get('/pokemon/:name', (request, response) => {

    jsonfile.readFile(file, (err, obj) => {

        let pokeName = "";
        let pokeWeight = "";
        let pokemonFound = false;
        let lowerCase = request.params.name.toLowerCase();
        let capsFirst = lowerCase.charAt(0).toUpperCase();
        let pokeToFind = capsFirst + lowerCase.slice(1);

        console.log(pokeToFind);

        //find pokeToFind in obj and return its name and weight
        for (let i = 0; i < obj.pokemon.length; i++) {
            if (obj.pokemon[i].name === pokeToFind) {
                pokeName = obj.pokemon[i].name;
                pokeWeight = obj.pokemon[i].weight;
                pokemonFound = true;

                console.log(obj.pokemon[i].name);
                console.log(obj.pokemon[i].weight);
            }
        }

        if (!pokemonFound) {
            response.status(404).send(`<html><body><h1>Pikaboo:(</h1><br><p>Could not find information on ${pokeToFind} - Is that a new pokemon? Gotta catch em all!</p></body></html>`);
        } else if (pokemonFound) {
            response.send(`<html><body><h1>${pokeName}</h1><br><p>Weight: ${pokeWeight}</p></body></html>`);
        }
    });
});

//setting port as 8080
app.listen(8080, () => console.log('~~~ Tuning in to the waves of port 8080 ~~~'));