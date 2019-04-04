const express = require('express');
const jsonfile = require('jsonfile');
const reactEngine = require('express-react-views').createEngine();
const methodOverride = require('method-override')
const FILE = 'pokedex.json';

/**
 * ===================================
 * Configurations and set up
 * ===================================
 */

// Init express app
const app = express();
app.engine('jsx', reactEngine);
// this tells express where to look for the view files
app.set('views', __dirname + '/views');
// this line sets react to be the default view engine
app.set('view engine', 'jsx');
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
app.use(methodOverride('_method'));

/**
 * ===================================
 * Routes
 * ===================================
 */

//home, list of all routes, list of all pokemon, links to individual pages

app.get('/', (request, response) => {
    jsonfile.readFile(FILE, (err,obj) => {
        let pokeList = obj.pokemon;
        if (request.query.sortby === 'name') {
            let pokeListName = pokeList;
            pokeListName.sort(function(a, b) {
                return a.name.localeCompare(b.name);
            });
            response.render('home', {obj:pokeListName});
        } else {
            response.render('home', {obj: pokeList});
        }
    });
});

app.get('/pokemon/:id', (request, response) => {

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






// app.get('/search/name', (request,response)=>{
//     response.send(pokeList);
// })

//add new pokemon
app.post('/pokemon', (request,response) => {
    console.log(request.body);
    jsonfile.readFile(FILE, (err,obj) => {
        obj.pokemon.push(request.body);
        jsonfile.writeFile(FILE, obj, (err) => {
            console.error(err);
        });
    });
})

app.get('/pokemon/new', (request,response) => {
    response.send('<h1>Add a new pokemon entry</h1>' + '<form method="POST" action="/pokemon">' + '<input type="text" name="id" placeholder="id">' +'<input type="text" name="num" placeholder="num">' + '<input type="text" name="name" placeholder="name">' + '<input type="text" name="img" placeholder="img">' +'<input type="text" name="height" placeholder="height">' + '<input type="text" name="weight" placeholder="weight">' + '<input type="submit" value="submit">' + '</form>');
})

//modify
app.get('/pokemon/:id/edit', (request,response)=> {
    jsonfile.readFile(FILE, (err,obj)=> {
        let arrIndex = parseInt(request.params.id);
        let reply = '<h1>Modify existing entries in the pokedex!</h1>' +
                    '<form method="POST" action="/pokemon/' + arrIndex + '?_method=PUT">'+
                    'Name <input type="text" name="name" value='+ obj.pokemon[arrIndex].name + '><br><br>' +
                    'Image <input type="text" name="img" value='+ obj.pokemon[arrIndex].img + '><br><br>' +
                    'Height <input type="text" name="height" value='+ obj.pokemon[arrIndex].height + '><br><br>' +
                    'Weight <input type="text" name="weight" value='+ obj.pokemon[arrIndex].weight + '><br><br>' +
                    '<input type="submit" value="submit">'
        response.send(reply);
    });
})

app.put('/pokemon/:id', (request,response)=>{
    console.log("here in put");
    jsonfile.readFile(FILE, (err,obj)=> {
        let arrIndex = parseInt(request.params.id);
        obj.pokemon[arrIndex].name = request.body.name;
        obj.pokemon[arrIndex].img = request.body.img;
        obj.pokemon[arrIndex].height = request.body.height;
        obj.pokemon[arrIndex].weight = request.body.weight;

        jsonfile.writeFile(FILE, obj, (err)=> {
            console.log(err);
            response.send(request.body);
        });
    });
})

//delete
app.get('/pokemon/:id/delete', (request,response)=> {
    let arrIndex = parseInt(request.params.id);
    let reply = '<h1>Delete this entry</h1>' +
                '<form method="POST" action="/pokemon/' + arrIndex + '?_method=DELETE">'+
                '<input type="submit" value="delete">'
    response.send(reply);
});

app.delete('/pokemon/:id', (request,response)=> {
    let arrIndex = parseInt(request.params.id);
    jsonfile.readFile(FILE, (err,obj)=> {
        obj.pokemon.splice(arrIndex,1);
        jsonfile.writeFile(FILE, obj, (err)=> {
            console.log(err);
            response.send(response.body);
        });
    });
})

/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));