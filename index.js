console.log("about to require express");
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
console.log("done creating app");

// tell app to use the module
app.use(express.json());

app.use(express.urlencoded({
    extended: true
}));

// use public folder
app.use(express.static('public'))

// method-override
const methodOverride = require('method-override');
app.use(methodOverride('_method'));

// this line below, sets a layout look to your express project
const reactEngine = require('express-react-views').createEngine();
app.engine('jsx', reactEngine);

// this tells express where to look for the view files
app.set('views', __dirname + '/views');

// sets react to be the default view engine
app.set('view engine', 'jsx');


/**
 * ===================================
 * Routes
 * ===================================
 */

/*
app.get('/', (request, response) => {
  //response.send("Welcome to the online Pokdex!");
  const nameArray = [];

  jsonfile.readFile(FILE, (err, obj) => {
    for (i = 0; i < obj["pokemon"].length; i++) {
        // cannot print here cause can only get one response? so if for loop means it has to keep responding?
        nameArray.push(obj["pokemon"][i]["name"]);
    }

    const nameArrayJoin = nameArray.join(", ")

    let sort = `<form method="GET" action="/">
                <select name="sortby">
                <option value="">Please choose an option</option>
                <option value="name">Name</option>
                </select>
                <input type="submit" value="Submit">
                </form>`

    if (request.query.sortby === "name") {
        console.log("yes")
        const sortedNameArray = nameArray.sort();
        response.send(`<html>
        <h1>Welcome to the online Pokdex!</h1>
        <body>${sortedNameArray.join(", ")}<br><br>${sort}</body>
        </html>`);

        // if no sort
    } else {
        response.send(`<html>
        <h1>Welcome to the online Pokdex!</h1>
        <body>${nameArrayJoin}<br><br>${sort}</body>
        </html>`);
    }

  })   // end of / readfile
});  // end of / and form request*/

app.get("/", (request, response) => {
    const pokemonArray = [];

    // read file to take pokemon name
    jsonfile.readFile(FILE, (err, pokemonObj) => {
        for (i = 0; i < pokemonObj["pokemon"].length; i++) {
            const pokemonName = pokemonObj["pokemon"][i]["name"];
            const pokemonImg = pokemonObj["pokemon"][i]["img"]

            // put them in an object first then push to array
            const pokemonIndvObj = {};
            pokemonIndvObj["name"] =  pokemonName;
            pokemonIndvObj["img"] =  pokemonImg;

            // push object into array
            pokemonArray.push(pokemonIndvObj);
        }  // end of for loop

        //console.log(pokemonArray);

        response.render('home', {pokemon: pokemonArray})
    })  // end of readFile
})

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
    //read file to get the last key
    jsonfile.readFile(FILE, (err, pokemonObj) => {
        const pokemonArray = pokemonObj["pokemon"];

        // get last element
        var lastElement = pokemonArray[pokemonArray.length - 1].id;
        console.log(lastElement)

        let newLastElement = lastElement + 1;

        let newLastNum = "";
        if (newLastElement.toString().length < 3) {
            newLastNum = "0" + newLastElement;
        } else {
            newLastNum = newLastElement;
        }

        response.render('newPokemon', {lastId: newLastElement, lastNum: newLastNum})




/*    let respond = `<h1>New Pokemon</h1>
                  <form method="POST" action="/newPokemon">
                  ID: <input type="text" name="id" value="${newLastElement}" disabled><br><br>
                  Num: <input type="text" name="num" value="${newLastNum}" disabled><br><br>
                  Name: <input type="text" name="name"><br><br>
                  Image: <input type="text" name="img"><br><br>
                  Height: <input type="text" name="height"><br><br>
                  Weight: <input type="text" name="weight"><br><br>
                  <input type="submit" value="Submit"><br><br>
                  </form>`;

    response.send(respond)*/
    })  // end of readfile
})

app.post('/newPokemon', (request, response) => {

    // receiving the data
    console.log("this is the request body: ",request.body);

    //console.log(request.query.newPokemon)
    // get data
    //let id =

    response.send(request.body)
    jsonfile.readFile(FILE, (err, obj) => {
        const pokemonArray = obj["pokemon"];

        pokemonArray.push(request.body);

        // save request body
        jsonfile.writeFile(FILE, obj, (err) => {
            console.log(err);
            response.send(obj);
        });


    })

})


app.get('/pokemon/:id/edit', (request, response) => {
    const pokemonId = parseInt(request.params.id);

    jsonfile.readFile(FILE, (err, obj) => {
        const pokemonName = obj["pokemon"][pokemonId-1]["name"]

        response.render('edit', obj["pokemon"][pokemonId-1])


    }) // end of read file

})   // end of get pokemon id edit

app.put("/pokemon/:id", (request, response) => {
    //console.log(request.body);

    jsonfile.readFile(FILE, (err, obj) => {
        let pokemonId = parseInt(request.params.id);

        let editedPokemon = obj["pokemon"][pokemonId-1];

        console.log(editedPokemon)

        editedPokemon.name = request.body.name;
        editedPokemon.img = request.body.img;
        editedPokemon.height = request.body.height;
        editedPokemon.weight = request.body.weight

        jsonfile.writeFile(FILE, obj, (err) => {
            console.error(err);

            response.send("Done editing");
        })

    }) // end of readfile
})  // end of put request


app.get('/pokemon/:id/delete', (request, response) => {
    const pokemonId = parseInt(request.params.id);

    jsonfile.readFile(FILE, (err, obj) => {
        const pokemonName = obj["pokemon"][pokemonId-1]["name"]

        let deleteButton = `<form method="POST" action="/pokemon/${pokemonId}?_method=delete" />
                            <input type="submit" value="Delete" />`;

        response.send(deleteButton);

    }) // end of read file
})   // end of get pokemon id delete

app.delete("/pokemon/:id", (request, response) => {
    const pokemonId = parseInt(request.params.id);

    jsonfile.readFile(FILE, (err, obj) => {
        obj["pokemon"].splice(pokemonId-1, 1);

        jsonfile.writeFile(FILE, obj, (err) => {
            console.error(err);
            response.send("Deleted!")
        })  // enf of writefile
    })//  end of readfile
});  //  end of app.delete

/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));