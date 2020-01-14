const express = require('express');
const jsonfile = require('jsonfile');

const FILE = 'pokedex.json';

/**
 * ===================================
 * Configurations and set up
 * ===================================
 */

// Init express app
const app = express();

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

const htmlform = `<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css"
        integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
    <title>Submit new pokemon</title>
</head>

<body>
    <div class="container">
        <form action="/pokemon" method="POST">
            <p>Id
            <input type="text" name="id"></p>
            <p>num
            <input type="text" name="num"></p>
            <p>name
            <input type="text" name="name"></p>
            <p>img
            <input type="text" name="img"></p>
            <p>height
            <input type="text" name="height"></p>
            <p>weight
            <input type="text" name="weight"></p>
            <input type="submit">
        </form>
    </div>
</body>

</html>`;


/**
 * ===================================
 * Routes
 * ===================================
 */

app.get('/pokemon/new', (request, response) => {
    response.send(htmlform);
})


app.post('/pokemon/', (request, response) => {
    console.log('Received POST');
    console.log(request.body);
    const newPokemon = {
        id: request.body.id,
        num: request.body.num,
        name: request.body.name,
        img: request.body.img,
        height: request.body.height,
        weight: request.body.weight
    }

    jsonfile.readFile(FILE, (err, obj) => {

        // check to make sure the file was properly read
        if (err) {

            console.log("error with json read file:", err);
            response.status(503).send("error reading file");
            return;
        }

        obj.pokemon.push(newPokemon);

        jsonfile.writeFile(FILE, obj, (err) => {
            if (err) console.log(err);
            console.log('successfully written ' + newPokemon);
            response.send('Successfully added new pokemon ' + newPokemon.name);
            return;
        })
    })
})


app.get('/pokemon/:id', (request, response) => {

    // get json from specified file
    jsonfile.readFile(FILE, (err, obj) => {

        // check to make sure the file was properly read
        if (err) {

            console.log("error with json read file:", err);
            response.status(503).send("error reading filee");
            return;
        }
        // obj is the object from the pokedex json file
        // extract input data from request
        let inputId = parseInt(request.params.id);

        var pokemon;

        // find pokemon by id from the pokedex json file
        for (let i = 0; i < obj.pokemon.length; i++) {

            let currentPokemon = obj.pokemon[i];

            if (currentPokemon.id === inputId) {
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


app.get('/', (request, response) => {
    response.send("yay");
});

/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));