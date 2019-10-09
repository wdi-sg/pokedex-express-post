const jsonfile = require('jsonfile');
const express = require('express');
const app = express();
const FILE = 'pokedex.json';
const reactEngine = require('express-react-views').createEngine();
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