const express = require('express');
const jsonfile = require('jsonfile');

const file = 'pokedex.json';


/**
 * ===================================
 * Configurations and set up
 * ===================================
 */

// Init express app
const app = express();
// tell your app to use the module
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

const methodOverride = require('method-override')
app.use(methodOverride('_method'));



/**
 * ===================================
 * Routes
 * ===================================
 */


 app.get('/', (request, response) => {

  response.render('landing')

});

// app.get('/pokemon/new', (request,response) => {
//     response.render('home')
// })


app.post('/pokemon', function(request, response) {

    console.log(request.body);
    let pokeNew = request.body

    let pokeKey = Object.keys(pokeNew)
    console.log(pokeKey)

    for (let i=0; i<pokeKey.length; i++){
        let key = pokeKey[i]
        console.log(key + "key name")
        console.log(pokeNew[key] + "value of key on request")
        if (pokeNew[key] === ""){
            console.log(pokeNew[key] + "empty key")
            return response.render('error')
        }
    }

    const data = {
        "id": pokeNew.id,
        "num": pokeNew.num,
        "name": pokeNew.name,
        "img": pokeNew.image,
        "height": pokeNew.height,
        "weight": pokeNew.weight
    }

    jsonfile.readFile(file, (err, obj) => {

        console.log(err)
        let pokeList = obj.pokemon

        obj.pokemon.push(pokeNew)
        console.log(obj.pokemon[obj.pokemon.length-1])

  // // save the request body
          jsonfile.writeFile(file, obj, {spaces:2},(err) => {
            console.error(err)

    // now look inside your json file

         });
    })
    response.render('pokemon', data)

});

app.get('/pokemon/:id', (request, response) => {

  // get json from specified file
  jsonfile.readFile(file, (err, obj) => {
    // obj is the object from the pokedex json file
    // extract input data from request
    let inputId = parseInt( request.params.id );

    var pokemon;

    // find pokemon by id from the pokedex json file
    for( let i=0; i<obj.pokemon.length; i++ ){

      let currentPokemon = obj.pokemon[i];

      if( currentPokemon.id === inputId ){
        pokemon = currentPokemon;
        const data = {
            id: currentPokemon.id,
            num: currentPokemon.num,
            name:currentPokemon.name,
            img: currentPokemon.img,
            height: currentPokemon.height,
            weight: currentPokemon.weight
        }
        response.render('pokemon', data)
      }
    }

    if (pokemon === undefined && request.params.id!== "new") {

      // send 404 back
      response.status(404);
      response.send("I don't think that's a Pokemon...");
    }

    if (request.params.id === "new"){
        response.render('home')
    }
  });
});

app.get('/pokemon/:id/edit', (request, response) => {

    let identifier = request.params.id;
    let index = parseInt(identifier)-1


    jsonfile.readFile(file, (err,obj) => {

        const pokemon = obj.pokemon[index];

        const data = {
            id: parseInt(identifier),
            pokemon: pokemon
        }

        response.render('edit', data)
    })
})

app.put('/pokemon/:id', (request,response) =>{
    let identifier = request.params.id;
    let index = identifier-1
    let pokeEdit = request.body;


    jsonfile.readFile(file, (err,obj) =>{
        pokeEdit.id = parseInt(pokeEdit.id)
        obj.pokemon[index] = pokeEdit;
        console.log(obj.pokemon[index])
        const currentPokemon = obj.pokemon[index]

        const data = {
            id: currentPokemon.id,
            num: currentPokemon.num,
            name:currentPokemon.name,
            img: currentPokemon.img,
            height: currentPokemon.height,
            weight: currentPokemon.weight
        }
        response.render('pokemon', data)

        jsonfile.writeFile(file,obj,{spaces:2},(err)=>{

            console.log(err)

        })
    })
})

app.get('/pokemon/:id/delete', (request, response) => {


        response.render('delete', data)

})

/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(8080, () => console.log('~~~ Tuning in to the waves of port 8080 ~~~'));