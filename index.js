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

app.get('/pokemon', (request,response)=>{
    jsonfile.readFile(file, (err, obj) => {

        const data = {
            pokeDex: obj.pokemon
        }
         response.render('index', data)

    })




})

//add new pokemon
app.get('/pokemon/new', (request, response) => {
    response.render('home')
})


//find a pokemon
app.get('/pokemon/:id', (request, response) => {

    jsonfile.readFile(file, (err, obj) => {
    let inputId = parseInt( request.params.id );
    var pokemon;
    let pokeDex = obj.pokemon;

    // find pokemon by id from the pokedex json file
    pokeDex.forEach(function (pokething) {

      let currentPokemon = pokething;

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
    })

    if (pokemon === undefined && request.params.id!== "new") {
      // send 404 back
      response.status(404);
      response.send("I don't think that's a Pokemon...");
    }
  });
});

app.post('/pokemon', function(request, response) {

    console.log(request.body);
    console.log("TEST");
    let pokeNew = request.body
    let integer = parseInt(pokeNew.id)
    pokeNew.id = integer

    let pokeKey = Object.keys(pokeNew)
    console.log(pokeKey)


    pokeKey.forEach((item)=> {
         if (pokeNew[item] === ""){

            return response.render('error')
        }

    }) //this works but throws a "cannot set headers after sent to client" error - probably because it's checking for each...




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

          jsonfile.writeFile(file, obj, {spaces:2},(err) => {
            console.error(err)

         });
    })
    response.render('pokemon', data)

});

//edit pokemon page
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

//update pokemon entry
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

//delete pokemon page
app.get('/pokemon/:id/delete', (request, response) => {

    let inputId = request.params.id
    let index = parseInt(inputId) - 1


    jsonfile.readFile(file, (err,obj) =>{

        let pokeName = obj.pokemon[index].name;
        console.log(pokeName)

        const data = {
        name: pokeName,
        img: obj.pokemon[index].img
        }

    response.render('delete', data)
    })
})

//delete pokemon forever
app.delete('/pokemon/:id', (request,response) =>{
    let identifier = request.params.id;
    let index = identifier-1

    jsonfile.readFile(file, (err,obj) =>{
         let pokeDex = obj.pokemon
         pokeDex.splice(index,1)

        jsonfile.writeFile(file,obj,{spaces:2},(err)=>{

            console.log(err)
            response.send("DELETED FOREVER")
        })
    })
})

/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(8080, () => console.log('~~~ Tuning in to the waves of port 8080 ~~~'));