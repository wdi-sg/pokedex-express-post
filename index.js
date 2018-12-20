/**
 * ===================================
 * Configurations and set up
 * ===================================
 */
const express = require('express');
const jsonfile = require('jsonfile');
const FILE = 'data.json';


// Init express app
const app = express();
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}))

// this line below, sets a layout look to your express project
const reactEngine = require('express-react-views').createEngine();
app.engine('jsx', reactEngine);

// this tells express where to look for the view files
app.set('views', __dirname + '/views');

// this line sets react to be the default view engine
app.set('view engine', 'jsx');

const methodOverride = require('method-override')

app.use(methodOverride('_method'));

/**
 * ===================================
 * Routes
 * ===================================
 */
app.post('/pokemon', function(request, response) {
    //debug code (output request body)
    var anyExistPoke = false;
    var errorMessage ='Pokemon entered: ' + '</br>';
    errorMessage = errorMessage + "id: " + request.body.id + '</br>';
    errorMessage = errorMessage + "num: " + request.body.num + '</br>';
    errorMessage = errorMessage + "name: " + request.body.name + '</br>' + '</br>';

    jsonfile.readFile(FILE, (err, obj) => {
        //update inform from user
        request.body.id = parseInt(request.body.id);
        for (let k = 0; k < 3 - request.body.num.length; k++) {
            request.body.num = "0" + request.body.num;
        }

        for (var i = 0; i < obj.pokemon.length; i++) {
            if(obj.pokemon[i].id === request.body.id) {
                anyExistPoke = true;
                errorMessage = errorMessage + "id already exists" + '</br>'
                break;
            }
        }

        for (var i = 0; i < obj.pokemon.length; i++) {
            if(obj.pokemon[i].num === request.body.num) {
                anyExistPoke = true;
                errorMessage = errorMessage + "num already exists" + '</br>'
                break;
            }
        }

        for (var i = 0; i < obj.pokemon.length; i++) {
            if(obj.pokemon[i].name === request.body.name) {
                anyExistPoke = true;
                errorMessage = errorMessage + "name already exists" + '</br>'
                break;
            }
        }

        if (!anyExistPoke){
            //Display the pokemon added.
            let form = `
                <html>
                <body>
                    <h1> New Pokemon added </h1>
                    <img src = ${request.body.img}>
                    <p> num: ${request.body.num} </p>
                    <p> name: ${request.body.name} </p>
                    <p> height: ${request.body.height} </p>
                    <p> weight: ${request.body.weight} </p>
                </body>
                </html>`;

            response.send(form);

            // save the request body
            obj.pokemon.push(request.body);
            jsonfile.writeFile(FILE, obj, (err) => {
                console.log(err);
            });
        }

        else {
            response.send(errorMessage);
        }
    });
});


app.get('/pokemon/new', (request, response) => {
  // render a template form here
  let form = `<html>
                <body>
                <h1> Pokemon to be added </h1>
                <form method="POST" action="/pokemon">
                id: <input type="text" name="id"> </br> </br>
                num: <input type="text" name="num"> </br> </br>
                name: <input type="text" name="name"> </br> </br>
                img: <input type="text" name="img"> </br> </br>
                height: <input type="text" name="height"> </br> </br>
                weight : <input type="text" name="weight"> </br> </br>
                <input type="submit" value="Submit">
                </form>
                </body>
                </html>`

  response.send(form);
});

var displayByName = function (response) {
    let message = "";
    let listOfName = [];

    jsonfile.readFile(FILE, (err, obj) => {
        for(var i = 0; i < obj.pokemon.length; i++) {
            listOfName.push(obj.pokemon[i].name);
        }

        listOfName.sort();

        for(var j = 0; j < listOfName.length; j++) {
            message = message + listOfName[j] + ", ";
        }

        let form1 =
            `<html>
            <body>
            <h1> List of Pokemon Sort By Name </h1>
            ${message}
            </body>
            </html>`
        response.send(form1);
    });
}

var displayByHeight = function (response) {
    var message = "";
    var listOfHeight = [];

    jsonfile.readFile(FILE, (err, obj) => {
        for(let i = 0; i < obj.pokemon.length; i++) {
            let length = obj.pokemon[i].height.length;
            let height = parseFloat(obj.pokemon[i].height.substring(0, (length - 2)));
            listOfHeight.push(height);
        }

        listOfHeight.sort(function(a, b){return a-b});

        for(let i = 0; i < listOfHeight.length; i++) {
        }

        for(let j = 0; j < listOfHeight.length; j++) {
            let heightString = listOfHeight[j] + " m";
           for (let k = 0; k < obj.pokemon.length; k++) {
                if(heightString === obj.pokemon[k].height) {
                    message = message + obj.pokemon[k].name + "(" + obj.pokemon[k].height + "), ";
                    obj.pokemon.slice(k, 1);
                    break;
                }
           }
        }

        let form1 =
            `<html>
            <body>
            <h1> List of Pokemon Sort By Height </h1>
            ${message}
            </body>
            </html>`
        response.send(form1);
    });
}

var displayByWeight = function (response) {
    var message = "";
    var listOfWeight = [];

    jsonfile.readFile(FILE, (err, obj) => {
        for(let i = 0; i < obj.pokemon.length; i++) {
            let length = obj.pokemon[i].weight.length;
            let weight = parseFloat(obj.pokemon[i].weight.substring(0, (length - 3)));
            listOfWeight.push(weight);
        }

        listOfWeight.sort(function(a, b){return a-b});

        for(let i = 0; i < listOfWeight.lenght; i++) {
            console.log("weight: " + listOfWeight);
        }

        for(let j = 0; j < listOfWeight.length; j++) {
            let weightString = listOfWeight[j] + " kg";
           for (let k = 0; k < obj.pokemon.length; k++) {
                if(weightString === obj.pokemon[k].weight) {
                    message = message + obj.pokemon[k].name + "(" + obj.pokemon[k].weight + "), ";
                    obj.pokemon.slice(k, 1);
                    break;
                }
           }
        }

        let form1 =
            `<html>
            <body>
            <h1> List of Pokemon Sort By Height </h1>
            ${message}
            </body>
            </html>`
        response.send(form1);
    });
}

app.get('/sortedPokemon', (request, response) => {
    if (request.query.sortby === "name") {
        displayByName(response);
    }

    else if (request.query.sortby === "height") {
        displayByHeight(response);
    }

    else if (request.query.sortby === "weight") {
        displayByWeight(response);
    }

});

app.get('/', (request, response) => {

    let form = `<html>
                <body>
                <h1> Pokemon Sort By </h1>
                <form method="GET" action="/sortedPokemon">
                <select name="sortby">
                <option value="name">Name</option>
                <option value="height">Height</option>
                <option value="weight">Weight</option>
                </select>
                <input type="submit" value="Submit">
                </form>
                </body>
                </html>`
    response.send(form);
})


app.get('/pokemon/:id/edit', (request, response) => {

    let id = request.params.id;

    jsonfile.readFile(FILE, function (err, obj) {
        let searchedPokemon = obj.pokemon[(id - 1)];

        response.render("pokemon", searchedPokemon);
    });
});


app.put('/pokemon/:id/edit', (request, response) => {
    var idPokemon = parseInt(request.body.id);
    var numPokemon = request.body.num;
    for (let k = 0; k < 3 - request.body.num.length; k++) {
        numPokemon = "0" + numPokemon;
    }
    var namePokemon = request.body.name;
    var weightPokemon = request.body.weight;
    var heightPokemon = request.body.height;
    var imgPokemon = request.body.img;

    var editPokemon = { id: idPokemon,
                    num: numPokemon,
                    name: namePokemon,
                    weight: weightPokemon,
                    height: heightPokemon,
                    img: imgPokemon
                    };

    response.render("pokemon", editPokemon);

    jsonfile.readFile(FILE, (err, obj) => {
        obj.pokemon[parseInt(idPokemon - 1)].id = idPokemon;
        obj.pokemon[parseInt(idPokemon - 1)].num = numPokemon;
        obj.pokemon[parseInt(idPokemon - 1)].name = namePokemon;
        obj.pokemon[parseInt(idPokemon - 1)].weight = weightPokemon;
        obj.pokemon[parseInt(idPokemon - 1)].height = heightPokemon;
        obj.pokemon[parseInt(idPokemon - 1)].img = imgPokemon;

        jsonfile.writeFile(FILE, obj, (err) => {
            console.log(err);
        });
    });
});

/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));
