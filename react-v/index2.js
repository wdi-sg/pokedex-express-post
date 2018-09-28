const express = require('express');
const jsonfile = require('jsonfile');
const app = express();

const methodOverride = require('method-override');
app.use(methodOverride('_method'));

// Sets up a layout look for the express project
const reactEngine = require('express-react-views').createEngine();
app.engine('jsx', reactEngine);

// This tells express where to look for the view files
app.set('views', __dirname + '/views');

// This sets react to be the default view engine
app.set('view engine', 'jsx');



app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

app.put('/pokemon/:id', (req,res) => {
    console.log("REQ BODY:", req.body);
    var currentJSON;
    jsonfile.readFile('../pokedex.json', (err,obj) => {
        let requestedPokemonId = req.params.id
        currentJSON = obj;
        for ( let i = 0; i < currentJSON.pokemon.length; i++ ) {
            if ( currentJSON.pokemon[i].id == parseInt( requestedPokemonId ) ) {
                var foundPokemonIndex = i;
                var foundPokemon = currentJSON.pokemon[i];
            }
        }

        if ( foundPokemon ) {
            currentJSON.pokemon[foundPokemonIndex] = req.body;
            currentJSON.pokemon[foundPokemonIndex].id = parseInt(currentJSON.pokemon[foundPokemonIndex].id);


            var whenDoneWritingFile =  function(abc) {
                if (abc) console.log("Error:", abc);
                res.redirect(`/pokemon/${foundPokemon.id}`)
            };

            jsonfile.writeFile('../pokedex.json', currentJSON, whenDoneWritingFile )

        } else {
            res.send("Not a Pokemon");
        }
    })

})

app.get('/pokemon/:id/edit', (req,res) => {
    var currentJSON;
    jsonfile.readFile('../pokedex.json', (err,obj) => {
        currentJSON = obj;
        let requestedPokemonId = req.params.id;
        for ( let i = 0; i < currentJSON.pokemon.length; i++ ) {
            if ( currentJSON.pokemon[i].id == parseInt( requestedPokemonId ) ) {
                var foundPokemon = currentJSON.pokemon[i];
            }
        }

        if ( foundPokemon ) {
            console.log("Found:", foundPokemon);
            res.render('editForm', {pokemon: foundPokemon})
        } else {
            res.send("Not a Pokemon");
        }

    })
})

app.get('/pokemon/:id', (req,res) => {
    var currentJSON;
    jsonfile.readFile('../pokedex.json', (err,obj) => {
        currentJSON = obj
        let requestedPokemonId = parseInt(req.params.id) - 1;
        res.render('singlePoke', currentJSON.pokemon[requestedPokemonId]);
    })
})

app.get('/pokemon', (req, res) => {
    var currentJSON;
    jsonfile.readFile('../pokedex.json', (err,obj) => {
        currentJSON = obj;
        res.render('allPokes', currentJSON)
    })
})

app.get('/json', (req, res) => {
    var currentJSON;
    jsonfile.readFile('data.json', (err, obj) => {
        currentJSON = obj;
        res.render('viewstuff', currentJSON.users[0])
    });


})


const PORT_NUM = 3000;
app.listen(PORT_NUM);















