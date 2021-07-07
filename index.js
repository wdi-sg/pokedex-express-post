const express = require('express');
const jsonfile = require('jsonfile');

// Sets up a layout look for the express project
const reactEngine = require('express-reach-views').createEngine();
app.engine('jsx', reactEngine);

// This tells express where to look for the view files
app.set('views', __dirname + 'views');

// This sets react to be the default view engine
app.set('view engine', 'jsx');

const FILE = 'pokedex.json';

// Init express app
const app = express();

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

// This first deliverable seems to be asking us to create a form to add a new pokemon to the pokedex.

// Creating a function to save the data added
let currentJSON = {};

function getCurrentJSON() {
  //read the json file
  jsonfile.readFile(FILE, (err, obj) => {
    //save the json file into a variable
    currentJSON = obj;
  })
}

// Creating HTML page to request materials to be added to Pokedex
app.get('/pokemon/new', (request, response) => {

    let html = "<html>";
    html += "<body>";
    html += '<form method="POST" action="/submit">';
    html += "New Pokemon: ";
    html += '<br><input type="text" name="id" placeholder="id"><br>';
    html += '<input type="text" name="num" placeholder="num"><br>';
    html += '<input type="text" name="name" placeholder="name"><br>';
    html += '<input type="text" name="img" placeholder="img"><br>';
    html += '<input type="text" name="height" placeholder="height"><br>';
    html += '<input type="text" name="weight" placeholder="weight"><br>';
    html += '<input type="submit" value="Submit">';
    html += "</form>";
    html += "</body>";
    html += "</html>";

    response.send( html );
});

app.post('/submit',(request, response) =>{

       jsonfile.readFile('pokedex.json', (err, obj) => {
        // Save it into the current JSON variable
        currentJSON = obj;
        // For each Pokemon, add to the ID count
        obj.pokemon.forEach(() => {
           currentIdCount++;
        });

        // Adding new Pokemon to Pokedex
        obj.pokemon.push(request.body);

        // Writing to the file the original data + the new data
        jsonfile.writeFile('data.json', obj, (err) => {
            console.log(err);
        });
    });

    response.send(request.body);

});

app.get('/pokemon/:id', (request, response) => {

  // get json from specified file
  jsonfile.readFile(FILE, (err, obj) => {
    
    // check to make sure the file was properly read
    if( err ){
      
      console.log("error with json read file:",err);
      response.status(503).send("error reading filee");
      return; 
    }
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


app.get('*', (request, response) => {

    if ( request.query.sortby == "name" ) {

        namePage();

        let sortedPokemon = currentJSON.pokemon.sort(sortName);

        var sortedNames = "";
        console.log(sortedPokemon[0].name)
        response.send(namePage());

    }

    else {
        response.send(welcome());
    }

});

    function welcome() {
        let description = '<h1>Welcome to the online Pokedex!</h1>';

        let pokeList = "";

        for ( var i = 0; i < currentJSON.pokemon.length; i++ ) {
            let pokes = '<li style="color: orange"><a href="/' + currentJSON.pokemon[i].name + '">' + currentJSON.pokemon[i].name + '</a></li>';
            pokeList += pokes;
        }

        var sortButton = `<a href=/?sortby=name>Sort by name?</a>`;

        var page = '<html><body><h1>' + description + '</h1>' + sortButton + '<ul>' + pokeList + '</ul>';
        page += '</body></html>'

        return page;
    }

function sortName(a,b) {
    const nameA = a["name"];
    const nameB = b["name"];

    let comparision = 0;

    if ( nameA > nameB ) {
        comparison = 1;
    } else if ( nameA < nameB ) {
        comparison = -1;
    };
    return comparison;
};

function namePage() {
        let sortedPokemon = currentJSON.pokemon.sort(sortName)

        let description = '<h1>Welcome to the online Pokedex!</h1>';

        let pokeList = "";

        for ( var i = 0; i < sortedPokemon.length; i++ ) {
            let pokes = '<li style="color: orange">' + sortedPokemon[i].name + '</li>';
            pokeList += pokes;
        }

        let sortByName = `<a href=/?sortby=name>Sort By Name</a>`

        var page = '<html><body><h1>' + description + '</h1>' + '<ul>' + pokeList + '</ul>';
        page += '</body></html>'

        return page;
};

getCurrentJSON();

/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));
