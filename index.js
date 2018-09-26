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
/**
 * ===================================
 * Routes
 * ===================================
 */

app.get('/:pokeName', (request, response) => {

    jsonfile.readFile(FILE, (err, obj) => {
        const pokemons = obj.pokemon;

        let html = "";
        html += "<html>";
        html += "<head><style>body{width:15vw;margin:0 auto;}p{font-size:18px;font-family:sans-serif}img{width:15vw;}</style></head>"
        html += "<body>";
        for (i in pokemons) {
            if (request.params.pokeName.toLowerCase() === pokemons[i].name.toLowerCase()) {
                html += "<h1>" + pokemons[i].name + "</h1>";
                html += "<img src=" + pokemons[i].img + ">"
                html += "<p>Height: " + pokemons[i].height + "<br>"
                html += "<br>Weight: " + pokemons[i].weight + "<br>"
                html += "</ul>"
                html += "</body>";
                html += "</html>";

                return response.send(html);
            }

        }
        response.status(304);
        response.redirect('/');

    });
});


app.get('/:id', (request, response) => {

    // get json from specified file
    jsonfile.readFile(FILE, (err, obj) => {
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

     jsonfile.readFile(FILE, (err, obj) => {
         const pokemons = obj.pokemon;

        let html = "";
        html += "<html>";
        html += "<head><style>body{width:15vw;margin:0 auto;}p{font-size:18px;font-family:sans-serif}img{width:15vw;}</style></head>"
        html += "<body>";
        html += "<h1>Pokedex:</h1>";
        html += "<form action='/sort/this'><select name='sortby'>"
        html += "<option value=''>Sort by</option>"
        html += "<option value='name'>Name</option>"
        html += "<option value='id'>Id Number</option>"
        // html += "<a href='?sortby=name'><button>Sort By Name</button>";
        html += "</select><input type='submit' value='Submit'></form>"
        // html += "<ul>"
        for (var i = 0; i < pokemons.length; i++) {
            html += "<li><a href='" + pokemons[i].name + "'>" + pokemons[i].name + "</li>"
        }
        html += "</ul>"
        html += "</body>";
        html += "</html>";

        response.send(html);

     });
});

app.get('/sort/this', (request, response) => {



    jsonfile.readFile(FILE, (err, obj) => {

    const pokemons = obj.pokemon;
    var nameArr = []
    var sortedArr
    let html = "";
        html += "<html>";
        html += "<head><style>body{width:15vw;margin:0 auto;}p{font-size:18px;font-family:sans-serif}img{width:15vw;}</style></head>"
        html += "<body>";
        html += "<h1>Pokedex:</h1>";
        html += "<form action='/sort/this'><select name='sortby'>"
        html += "<option value=''>Sort by</option>"
        html += "<option value='name'>Name</option>"
        html += "<option value='id'>Id Number</option>"
        html += "</select><input type='submit' value='Submit'></form>"
    if (request.query.sortby === 'name') {
        for (var i = 0; i < pokemons.length; i++) {
            nameArr.push(pokemons[i].name);
            sortedArr = nameArr.sort()
        }
        for (var j = 0; j < sortedArr.length; j++) {
            html += "<li><a href='" + sortedArr[j] + "'>" + sortedArr[j] + "</li>"
        }
    } else {
        sortedArr=sortById(pokemons);
        for (var j = 0; j < sortedArr.length; j++) {
           html += "<li><a href='" + sortedArr[j][1].name + "'>" + sortedArr[j][1].name + "</li>"
        }
    }
    html += "</ul>"
        html += "</body>";
        html += "</html>";

        response.send(html);
});
});

function sortById(obj){
    var sortable=[];
    for(var key in obj)
        if(obj.hasOwnProperty(key))
            sortable.push([key, obj[key]]); // each item is an array in format [key, value]

    // sort items by value
    sortable.sort(function(a, b)
    {
      return a[1]-b[1]; // compare numbers
    });
    return sortable;
    }

app.get('/pokemon/new', (request, response) => {
    let html = "<html>";
    html += "<head><style>body{width:15vw;margin:0 auto;}p{font-size:18px;font-family:sans-serif}img{width:15vw;}</style></head>"
    html += "<body>";
    html += "<h1>Add a new pokemon:</h1>";
    html += '<form method="POST" action="/pokemon">';
    //html += "Id:<br>";
    //html += '<input type="text" name="id" ><br>';
    //html += "Number:<br>";
    //html += '<input type="text" name="num"><br>';
    html += "Name:<br>";
    html += '<input type="text" name="name"><br>';
    html += "Image:<br>";
    html += '<input type="text" name="img"><br>';
    html += "Height:<br>";
    html += '<input type="text" name="height"><br>';
    html += "Weight:<br>";
    html += '<input type="text" name="weight"><br>';
    html += '<input type="submit" value="Submit">';
    html += "</form>";
    html += "</body>";
    html += "</html>";

    response.send(html);
});

app.post('/pokemon', (request, response) => {
    console.log(request.body)
    //const obj = request.body;

    jsonfile.readFile(FILE, function(err, obj) {
        const pokemons = obj.pokemon;
        console.log(pokemons.length);
        var lastKey = pokemons.length;

        let newPoke = {
        id: parseInt(lastKey+=1),
        num: lastKey.toString(),
        name: request.body.name,
        img: request.body.img,
        height: request.body.height,
        weight: request.body.weight,
        };

        obj["pokemon"].push(newPoke);

        jsonfile.writeFile(FILE, obj, function(err) {
            if (err) console.log("ERROR:", err)

            response.send(newPoke);

        });

    });
});

/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));