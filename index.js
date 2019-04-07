const express = require('express');
const jsonfile = require('jsonfile');

//Init express app
const app = express();
const FILE = 'pokedex.json';

// Set up method-override for PUT and DELETE forms
const methodOverride = require('method-override')
app.use(methodOverride('_method'));

/**
 * ===================================
 * Configurations and set up
 * ===================================
 */

// //this line below, sets a layout look to your express project
// const reactEngine = require('express-react-views').createEngine();
// app.engine('jsx', reactEngine);

// //this tells express where to look for the view files
// app.set('views', __dirname + '/views');

//this line sets react to be the default view engine
app.set('view engine', 'jsx');

//Tell your app to use the module
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

/**
 * ===================================
 * Routes
 * ===================================
 */

// Display a list of all pokemon
// app.get('/', (request, response)=>{
//     jsonfile.readFile(FILE, (err, obj)=>{
//         let pokemonIndex = obj.pokemon;
//         response.render('home', {obj:pokemonIndex});
//         // response.send(obj.pokemon);
//     })
// })

// Submit new Pokemon
app.get('/pokemon/new', (request, response)=>{

    let  respond =  '<h1>Submit new Pokemon</h1>'+
                  '<form method="POST" action="/pokemon">'+
                  'Id:<input type="number" name="id" min="152" max="200">'+
                  '<br>'+'<br>'+
                  'Num:<input type="number" name="num" min="152" max="200">'+
                  '<br>'+'<br>'+
                  'Name:<input type="text" name="name">'+
                  '<br>'+'<br>'+
                  'Image:<input type="file" name="img" accept="image/*">'+
                  '<br>'+'<br>'+
                  'Height:<input type="text" name="height">'+
                  '<br>'+'<br>'+
                  'Weight:<input type="text" name="weight">'+
                  '<br>'+'<br>'+
                  '<input type="submit" value="Submit">'
                  '</form>';

    response.send(respond);
})

app.post('/pokemon', function(request, response) {

    //debug code (output request body)
    console.log(request.body.id);

    // Coverts a string into a number
    request.body.id = parseInt(request.body.id);

    //This will read the pokedex.json
    jsonfile.readFile(FILE, (err, obj)=>{

        // This will push the submitted information into an array
        obj.pokemon.push(request.body)

            //This will write to the pokedex.json
            jsonfile.writeFile(FILE, obj, (err) => {
                console.error(err)

            // now look inside your json file
            response.send(request.body);
            });
    })
// save the request body
});

// //Edit Pokemon
// app.get('/pokemon/:id/edit', (request, response)=>{

//     let pokemon = parseInt( request.params.id );


//     //This will read the pokedex.json
//     jsonfile.readFile(FILE, (err, obj) => {

//     let  respond =  '<h1>Edit Pokemon</h1>'+

//               '<form method="POST" action="/'+pokemon.id+'?_method=PUT">'+
//               'Id:<input type="number" name="id" min="152" max="200" value="'+pokemon.id+'"/>'+
//               '<br>'+'<br>'+
//               'Num:<input type="number" name="num" min="152" max="200" >'+
//               '<br>'+'<br>'+
//               'Name:<input type="text" name="name" >'+
//               '<br>'+'<br>'+
//               'Image:<input type="file" name="img" accept="image/*">'+
//               '<br>'+'<br>'+
//               'Height:<input type="text" name="height" >'+
//               '<br>'+'<br>'+
//               'Weight:<input type="text" name="weight" >'+
//               '<br>'+'<br>'+
//               '<input type="submit" value="Submit">'
//               '</form>';

//     response.send(obj.pokemon);
//     });
// });

app.get('/:id', (request, response) => {

    //get json from specified file
    jsonfile.readFile(FILE, (err, obj) => {

        //obj is the object from the pokedex json file
        //extract input data from request
        let inputId = parseInt( request.params.id );

        var pokemon;

        //find pokemon by id from the pokedex json file
        for( let i=0; i<obj.pokemon.length; i++ ){

        let currentPokemon = obj.pokemon[i];

            if( currentPokemon.id === inputId ){
            pokemon = currentPokemon;
            }
        }

        if (pokemon === undefined) {

        //send 404 back
        response.status(404);
        response.send("not found");

        } else {

        response.send(pokemon);
        }
    });
});

// app.get('/', (request, response) => {
//   response.send("yay");
// });

/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000,  () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));