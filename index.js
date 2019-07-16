const express = require('express');
const jsonfile = require('jsonfile');
const file = 'pokedex.json';


const app = express();

//parser thing
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

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

//part 2 woo - creating form on /pokemon/new
app.get('/pokemon/new', (request, response) => {

  console.log("birthing form");

// id, num, name, img, height, and weight

//set conditional to make id and num unique - use onclick function to self-generate a unique ID?

  let form = '';
  form = '<html>' +
    '<body>'+
    '<h1>Add your Pokémon</h1</h1>'+
    '<form method="POST" action="/pokemon">'+
    '<input type="text" name="id">'+
    '<input type="text" name="num">'+
    '<input type="text" name="img">'+
    '<input type="text" name="height">'+
    '<input type="text" name="weight">'+
    '<input type="submit" value="Submit">'+
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


//setting port as 8080
app.listen(8080, () => console.log('~~~ Tuning in to the waves of port 8080 ~~~'));