const jsonfile = require('jsonfile');
const express = require('express');
const app = express();
const FILE = 'pokedex.json';
const reactEngine = require('express-react-views').createEngine();

const methodOverride = require('method-override')
app.use(methodOverride('_method'));

app.engine('jsx', reactEngine);

// this tells express where to look for the view files
app.set('views', __dirname + '/views');

// this line sets react to be the default view engine
app.set('view engine', 'jsx');

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

app.get('/pokemon/:id', (request,response) => {
    if (request.params.id === "newPoke") {
        response.render("newPoke");
    } else {
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
    }
});
app.get('/pokemon', (request, response) => {
  // render a template form here
  // response.send("hello world");
  response.render('home');
  //After render is the file name in the open inverted commas.
});

app.get('/pokemon/:id/edit', (request,response) => {
    console.log(request.params.id);

    jsonfile.readFile(FILE, (err,obj) => {
        if (err){
            console.log("Error"); //wow edit
        } else {
            let pokeIndex = parseInt(request.params.id - 1)
            let data = obj.pokemon[pokeIndex];
            console.log(data);
            response.render('editForm.jsx', data); //banana
        }
    });

});


app.put("/pokemon/:id", (request,response) => {
    console.log("put!");
    console.log(request.body); //woah apples
    response.send(`<html>Edited!</html>`);

let newPokemon = request.body;
jsonfile.readFile(FILE, (err,obj) => {
    if (err) {
        console.log("errorrrrr"); //errrorrrrrrrrrrrrrrr hah i win
        console.log(err);
    } else {
        let editedPokeIndex = parseInt(newPokemon.id - 1);
        console.log(editedPokeIndex);
        obj.pokemon[editedPokeIndex] = newPokemon;
        jsonfile.writeFile(FILE,obj, (err) => {
            if (err) {
                console.log("aw error");
                console.log(err);
                response.status(503).send("Not found");
            } else {

            }
        });
    };
});


})

app.post('/pokemon', (request, response) => {

    console.log(request.body);
//read the current file
    jsonfile.readFile(FILE, (err, obj) => {
        if (err) {
            console.log(err);
        } else {
// push the new pokemon to pokemon array
        let newPokemon = request.body;
        obj.pokemon.push(newPokemon);
        jsonfile.writeFile(FILE, obj, {spaces:2}, (err) => {
            if (err){
            console.log(err)
        } else {
            response.send(request.body);
        }
        });
// endpoint
    };

    response.send(request.body);
});
});

app.listen(5000, () => console.log('~~~ Tuning in to the waves of port 5000 ~~~'));