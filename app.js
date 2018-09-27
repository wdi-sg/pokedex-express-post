const express = require('express')
const app = express();
const jsonfile = require('jsonfile');
// const pokedex = require("./pokedex");
const FILE = 'pokedex.json';
const methodOverride = require('method-override')
app.use(methodOverride('_method'));

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
        var i;
        for (i in object.pokemon) {
            if (object.pokemon[i].id == req.params.id) {
                var selectedPokemon = object.pokemon[i];
            }
        }
        res.render('pokemon', {object:selectedPokemon});
    })
})

app.put("/pokemon/:id", (request, response) => {
    console.log(request);

  // //read the file in and write out to it
  //   var userInput = request.body;
    //function readfile has 2 parameters, first one is the target file, the second one is a callback function with 2 parameters
    jsonfile.readFile(FILE, (error, object) => {
        console.log("-----------------");
        console.log(request.body);
        // update key value instead of pushing it in
        // var i;
        // for (i in object.pokemon) {
        //     if (object.pokemon[i].id == req.params.id) {
        //         let selectedPokemon = object.pokemon[i];
        //         selectedPokemon.num = request.body.
        //         selectedPokemon.name =
        //         selectedPokemon.image =
        //         selectedPokemon.height =
        //         selectedPokemon.weight =
        //     }
        // }

        // save the request.body
        jsonfile.writeFile(FILE, object, (err) => {
            // console.error(err)
        })
            // now look inside your json file
            response.send("Success");

    })
})



//LEARNING POINTS:
// anything within "" is a string, for JSX variable.key cannot be indicated inside, so you have to define outside of return where the code reader understands javascript
//double quote not applicable for variable




app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));
