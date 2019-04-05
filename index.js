console.log("about to require express");
const express = require('express');
const jsonfile = require('jsonfile');

let FILE = "pokedex.json";
console.log(FILE);

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

// method-override
const methodOverride = require('method-override');
app.use(methodOverride('_method'));

// this line below, sets a layout look to your express project
const reactEngine = require('express-react-views').createEngine();
app.engine('jsx', reactEngine);

// this tells express where to look for the view files
app.set('views', __dirname + '/views');

// this line sets react to be the default view engine
app.set('view engine', 'jsx');

// app.get('/', (req, res) => {
//   // running this will let express to run home.handlebars file in your views folder
//   res.render('home')
// })


/**
 * ===================================
 * Routes
 * ===================================
 */

app.get('/', (request, response)=> {
    const nameArr = [];
    jsonfile.readFile(FILE, (err, obj) => {
        for (i=0; obj['pokemon'].length; i++) {
            nameArr.push(obj['pokemon'][i]['name']);
        }
        const nameArrJoin = nameArr.join(", ");
        response.send('<html><h1>Welcome to the online Pokedex!</h1><body>' + nameArrJoin + '<br>' +
            '<form method="GET" action="/sortby = name"><input type="submit" value="Sort"></form></body></html>' )
    })
    console.log(nameArr);
})


app.get('/sortby=name', (request, response)=> {
    nameArr.sort();
    // console.log("request QUERY", request.query);
})

app.get('/pokemon/new', (request, response)=>{
    let form = '<h1>New Pokemon</h1>'+
                    '<form method="POST" action="/pokemon">' +
                    'Make your Pokemon:' + '<br>' +
                    'Pokemon ID: <input type="text" name="id">' + '<br>' +
                    'Pokemon Number: <input type="text" name="num">' + '<br>' +
                    'Pokemon Name: <input type="text" name="name">' + '<br>' +
                    'Pokemon Image: <input type="text" name="img">' + '<br>' +
                    'Height: <input type="text" name="height">' + '<br>' +
                    'Weight: <input type="text" name="weight">' + '<br>' +
                    '<input type="submit" value="Submit">' + '<br>' +
                    '</form>';
        response.send(form);
});

app.post('/pokemon',(request,response)=> {
    console.log(request.body);

    let submitForm = '<div> <h1>Pokemon</h1>' +
                        '<div>' + request.body.id + '</div>' +
                    '<div>' + request.body.num + '</div>' +
                    '<div>' + request.body.name + '</div>' +
                    '<div>' + request.body.height + '</div>' +
                    '<div>' + request.body.weight + '</div></div>';
    response.send(submitForm);

    jsonfile.readFile(FILE, (err,obj)=>{
        let newPokemon =[];

        newPokemon.id = request.body.id;
        newPokemon.num = request.body.num;
        newPokemon.name = request.body.name;
        newPokemon.img = request.body.img;
        newPokemon.height = request.body.height;
        newPokemon.weight = request.body.weight;

            obj.pokemon.push(newPokemon);

        jsonfile.writeFile(FILE, err, (obj)=> {
            if (err !=null) {
                console.log(err);
            }
        })
    })
})

app.get('/pokemon/:id/edit', (request, response)=> {
    const pokemonId = parseInt(request.params.id);

    jsonfile.readFile(FILE, (err, obj) => {
        const pokemonName = obj['pokemon'][pokemonId-1]['name'];

        response.render('home', obj['pokemon'][pokemonId-1])
    })
})

app.put('/pokemon/:id', (request, response)=> {
    console.log(request.body);

    jsonfile.readFile(FILE, (err, obj)=> {
        let pokemonId = parseInt(request.params.id);
        let editedPokemon = obj['pokemon'][pokemonId-1];
        editedPokemon.name = request.body.name;
        editedPokemon.img = request.body.img;
        editedPokemon.height = request.body.height;
        editedPokemon.weight = request.body.weight;

        jsonfile.writeFile(FILE, editedPokemon, (err)=> {
            console.log(err);

            response.send("Pokemon edited");
        })
    })
})

app.get('/:id', (request, response) => {

  // get json from specified file
  jsonfile.readFile(FILE, (err, obj) => {
    // obj is the object from the pokedex json file
    // extract input data from request
    let inputId = parseInt( request.params.id );

    var pokemon;

    // find pokemon by id from the pokedex json file
    for( let i = 0; i < obj.pokemon.length; i++ ){

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

// /**
//  // * ===================================
//  // * Listen to requests on port 3000
//  // * ===================================
// */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));