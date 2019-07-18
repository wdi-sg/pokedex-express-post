const express = require('express');
const jsonfile = require('jsonfile');

var currentId = 0; // when the server starts, get the latest id

const FILE = 'pokedex.json';

/**
 * ===================================
 * Configurations and set up
 * ===================================
 */

// Init express app
// const express = require('express');
const app = express();

// this line below, sets a layout look to your express project
const reactEngine = require('express-react-views').createEngine();
app.engine('jsx', reactEngine);

// this tells express where to look for the view files
app.set('views', __dirname + '/views');

// this line sets react to be the default view engine
app.set('view engine', 'jsx');

const methodOverride = require('method-override')
app.use(methodOverride('_method'));

// tell your app to use the module
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

/**
 * ===================================
 * Routes
 * ===================================
 */

app.get("/pokemon/new", (request, response) => {
    console.log("Getting forms");

    let form ='';
    form =  `<html>
                <body>
                    <h1>Submit new pokemon form</h1>
                        <form method = "POST" action ="/pokemon">
                            <p>id</p>
                            <input name = "id">
                            <p>num</p>
                            <input name = "num">
                            <p>name</p>
                            <input name = "name">
                            <p>img</p>
                            <input name = "img">
                            <p>height</p>
                            <input name = "height">
                            <p>weight</p>
                            <input name = "weight">
                            <input type = "Submit">
                        </form>
                </body>
            </html>`;
        response.send(form);
});

app.post('/pokemon', function(request, response) {

    console.log("passing values to newPokemon");
    var newPokemon = request.body;
    console.log(newPokemon);

    jsonfile.readFile(FILE, (err, obj) => {
        if (err) {
            console.log(err);
        }
        else {
            obj.pokemon.push(newPokemon);

            jsonfile.writeFile(FILE, obj, (err) => {
                if (err) {
                    console.log(err);
                }
                else {
                    console.log("push complete");
                }
            })
        }
    })

});




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

// part 1 deliverable=================================

app.get('/', (request, response) => {

  var showAllPokemon = [];
  var displayData

  jsonfile.readFile(FILE, (err, obj) => {
    if (err) {
        console.log(err);
    }

    else {

        for (let i = 0; i < obj.pokemon.length; i++) {
            showAllPokemon.push(obj.pokemon[i].name + "\n");

        }

    displayData = showAllPokemon;

    }

    let form = '';

    form =  '<form method = "GET">' +
                '<select name = "sortby">' +
                    '<option value = "name">sort by name</option>' +
                    '<option value = "weight">sort by weight</option>' +
                    '<option value = "height">sort by height</option>' +
                '</select>' +
            '<input type = "submit" value = "submit">' +
            '</form>' + displayData.toString();

    response.send(form);

  })

});

// ===================================================

//edit step 1: request to fetch pokedex json data
app.get('/pokemon/:id/edit', (request, response) => {
    console.log("get edit request");

    //read pokedex json file
    jsonfile.readFile(FILE, (err, obj) => {
        if (err) {
            console.log(err);
        }
        const id = request.params.id;

        const editData = {

            //reference keys for edit path
            indexDatatoEdit : obj.pokemon[id],
            idToEdit : id
        }

    //edit step 2a: render edit path
    response.render('edit', editData);
    })
});

// ===================================================

//delete step 1: request to fetch pokedex json data
app.get('/pokemon/:id/delete', (request, response) => {
    console.log("get delete request");

    //read pokedex json file
    jsonfile.readFile(FILE, (err, obj) => {
        if (err) {
            console.log(err);
        }
        const index = parseInt(request.params.id) - 1;
        console.log("index: " + index);

        const deleteData = {

            //reference keys for delete path
            indexDatatoDelete : obj.pokemon[index],
            idToDelete : index
        }

    //delete step 2a: render delete path
    response.render('delete', deleteData);
    })
});

// ===================================================

//edit step 3: request to edit pokemon
app.put('/pokemon/:id', (request, response) => {
    console.log("put edit request");

    var editData = request.body;
    console.log("editData");
    console.log(editData);

    jsonfile.readFile(FILE, (err, obj) => {
        if (err) {
            console.log(err);
        }
        console.log("existing data");
        console.log(obj.pokemon[request.params.id]);

        obj.pokemon[request.params.id] = editData;

        //edit step 4: write edited data to pokemon json
        jsonfile.writeFile(FILE, obj, (err) => {
            if (err) {
                console.log(err);
            }
            else {
                response.send("edit complete")
            }
        })
    })
});

// ===================================================

//delete step 3: request to delete pokemon
app.delete('/pokemon/:id', (request, response) => {
    console.log("delete request");

    var index = parseInt(request.params.id) - 1;
    console.log("index: " + index);

    jsonfile.readFile(FILE, (err, obj) => {
        if (err) {
            console.log(err);
        }

        obj.pokemon.splice(index, 1);
        console.log("splice operation");

        //delete step 4: delete the index pokemon json
        jsonfile.writeFile(FILE, obj, (err) => {
            if (err) {
                console.log(err);
            }
            else {
                response.send("delete complete");
            }
        })

    })
});

// ===================================================

/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));