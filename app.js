const express = require('express')
const app = express();
const jsonfile = require('jsonfile');
// const pokedex = require("./pokedex");
const FILE = 'pokedex.json';
const methodOverride = require('method-override')
app.use(methodOverride('_method'));

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

// this line below, sets a layout look to your express project
const reactEngine = require('express-react-views').createEngine();
app.engine('jsx', reactEngine);

// this tells express where to look for the view files
app.set('views', __dirname + '/views');

// this line sets react to be the default view engine
app.set('view engine', 'jsx');


//read and then pass info to jsx file
app.get('/pokemon/:id/edit', (req, res) => {
    jsonfile.readFile(FILE, (error, object) => {
        if (error) {
            console.log("-----------------")
            console.error(error);
            console.log("-----------------")
        } else {
            var i;
            for (i in object.pokemon) {
            if (object.pokemon[i].id == req.params.id) {
                var selectedPokemon = object.pokemon[i];
            }
        }
        res.render('pokemon', { object: selectedPokemon });
        }

    })
})

//Once user fill in info, jsx file channels info from the form which we then retrieve here in app.put
app.put("/pokemon/:id", (request, response) => {

    var pokemonId = request.params.id;

    //read json file and update the selected fields
    jsonfile.readFile(FILE, (error, object) => {
        if (error) {
        console.log("-----------------")
        console.error(error);
        console.log("-----------------")
        } else {
            // pull the info from the form via request.body and store this info
            let updatedTrait = request.body;
            var i;
            // update key value instead of pushing it in like the previous homework
            for (i in object.pokemon) {
                if (object.pokemon[i].id == pokemonId) {
                    var selectedPokemon = object.pokemon[i];
                    selectedPokemon.num = updatedTrait.number;
                    selectedPokemon.name = updatedTrait.name;
                    selectedPokemon.img = updatedTrait.image;
                    selectedPokemon.height = updatedTrait.height;
                    selectedPokemon.weight = updatedTrait.weight;
                }
            }
            //update the jsonfile with new inputs
            jsonfile.writeFile(FILE, object, (err) => {
                console.error(err)
            })

            //redirect user to a makeshift pokemon profile page (which displays only the name of pokemon) to check that name is indeed updated
            response.redirect('/pokemon/'+selectedPokemon.name);
            // response.send("success!")
        }
    })
})

//create a new app.get to double check that the name is indeed updated, after user updates it at pokemon/id/edit
app.get('/pokemon/:name', (request, response) => {
    jsonfile.readFile(FILE, function(error, object) {
        //create object
        for (key in object.pokemon) {
            var pokemonArray = request.params.name
            if (pokemonArray == object.pokemon[key].name) {
                var pokemonNewName = object.pokemon[key].name;
                response.send("Successful name change! Name of pokemon has been updated to " + pokemonNewName)
            }
        }
    })
})


app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));