//Configurations and set up
const express = require('express');
const jsonfile = require('jsonfile');
const file = 'pokedex.json';


// Init express app
const app = express();
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));


// Init Method-Override for PUT and DELETE
const methodOverride = require('method-override')
app.use(methodOverride('_method'));


// Init REACT
const reactEngine = require('express-react-views').createEngine();
app.engine('jsx', reactEngine);
// this tells express where to look for the view files
app.set('views', __dirname + '/views');
// this line sets react to be the default view engine
app.set('view engine', 'jsx');



//Routes

////////////////// WHEN 'NEW' IS ADDED TO PATH AND NEW POKEMON CAN BE ADDED //////////////////
app.post('/pokemon/', (request, response) => {
    console.log('Received POST');
    console.log(request.body);
    const newPokemon = {
        id: request.body.id,
        num: request.body.num,
        name: request.body.name,
        img: request.body.img,
        height: request.body.height,
        weight: request.body.weight
    }


    jsonfile.readFile(file, (err, obj) => {

        // check to make sure the file was properly read
        if (err) {
            console.log("error with json read file:", err);
            response.status(503).send("error reading filee");
            return;
        }


        obj.pokemon.push(newPokemon);


        jsonfile.writeFile(file, obj, (err) => {
            if (err) console.log(err);
            console.log('New ' + newPokemon);
            response.send('The following pokemon related information has been added: ' + newPokemon.name);
            return;
        })
    })
})

app.get('/pokemon/new', (request, response) => {

    let myForm = '<form method="POST" action="/pokemon">id:<input type="text" name="id"><br/>num:<input type="text" name="num"><br/>name:<input type="text" name="name"><br/>img:<input type="text" name="img"><br/>height:<input type="text" name="height"><br/>weight:<input type="text" name="weight"></br><input type="submit" value="Submit"></form>';

    response.send(myForm)
});




////////////////// WHEN POKEMON NUMBER IS ADDED TO END OF PATH //////////////////
app.get('/pokemon/:id', (request, response) => {

    jsonfile.readFile(file, (err, obj) => {

        // check to make sure the file was properly read
        if (err) {
            console.log("error with json read file:", err);
            response.status(503).send("error reading filee");
            return;
        }

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


// app.get('*', (request, response) => {
//     response.send(`bwahahahahah we've ruined everything! - Team Rocket`);
// });


















// const whenNewPokemonRequest = (request, response) => {

//         jsonfile.readFile(file, (err, obj) => {
//         request.path === "/pokemon/:new";

//     // check to make sure the file was properly read
//     if( err ){
//       console.log("error with json read file:", err);
//       response.status(503).send("error reading file");
//     return;
//     }

//     let html =
//     '<form method="POST" action="/putrequest?_method=put">'+
//       '<input name="id" value="'+obj.name+'"/>'+
//       '<input name="number" value="'+obj.name +'"/>'+
//       '<input name="name" value="'+ obj.name+'"/>'+
//       '<input name="image" value="'+ obj.name+'"/>'+
//       '<input name="height" value="'+ obj.name+'"/>'+
//       '<input name="weight" value="'+ obj.name+'"/>'+
//       '<input type="submit" value="submit"/>'+
//     '</form>';

//         response.send(html);
//     });
//   };

// app.get("/pokemon/:new", whenNewPokemonRequest);


// response.send("yay");
// });

/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));