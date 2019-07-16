const jsonfile = require('jsonfile');
const file = 'pokedex.json';
const express = require('express');
const app = express();
app.use(express.static(__dirname+'/public/'));

const methodOverride = require('method-override')
app.use(methodOverride('_method'))
const reactEngine = require('express-react-views').createEngine();
app.engine('jsx', reactEngine);
app.set('views', __dirname + '/views');
app.set('view engine', 'jsx');

// tell your app to use the module
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

//create new pokemon Part1 - page on browser
app.get('/pokemon/new', (request, response) => {
    jsonfile.readFile(file, (err, obj) => {
        let attributesObj = {
        attributes : Object.keys(obj.pokemon[0])
        }
        response.render('createPokemon', attributesObj);
        });
});

//create new pokemon Part2 - POST requests to /pokemon
app.post('/pokemon', function(request, response) {
    jsonfile.readFile(file, (err, obj) => {
        let newPokemon = {
            "id": obj.pokemon.length+1,
            "num": (obj.pokemon.length+1).toString(),
            "name": request.body.name,
            "img": request.body.img,
            "height": request.body.height,
            "weight": request.body.weight,
            "candy": null,
            "candy_count": null,
            "egg": null,
            "avg_spawns": null,
            "spawn_time": null
        }
        obj.pokemon.push(newPokemon);
        jsonfile.writeFile(file, obj, (err) => {
         console.error(err);
        response.send(newPokemon);
        });
    });
});

//home page for full list of pokemons, including the ability to sort
app.get('/', (request, response) => {
    jsonfile.readFile(file, (err, obj) => {
        let pokedex = {};
        pokedex.list= obj.pokemon;
        pokedex.sortby = request.query.sortby;
        response.render('home', pokedex);
    })
})

//edit pokemon Part1 - page on browser
app.get('/pokemon/:id/edit', (request, response) => {
    jsonfile.readFile(file, (err, obj) => {
        let pokemonInfo = obj.pokemon[parseInt(request.params.id)-1];
        response.render('editPokemon', {pokemonInfo});
    });
});


//edit pokemon Part2 - PUT requests into /pokemon/:id
app.put('/pokemon/:id', (request, response) => {
    jsonfile.readFile(file, (err, obj) => {

            if (err){
                console.log("an error happened!!!!");
                console.log(err);
            }
        obj.pokemon[parseInt(request.params.id) - 1] = {
            "id": parseInt(request.body.id),
            "num": request.body.num,
            "name": request.body.name,
            "img": request.body.img,
            "height": request.body.height,
            "weight": request.body.weight,
            "candy": request.body.candy,
            "candy_count": request.body.candy_count,
            "egg": request.body.egg,
            "avg_spawns": request.body.avg_spawns,
            "spawn_time": request.body.spawn_time
        }
        jsonfile.writeFile(file, obj, (err) => {
            console.error(err)
            response.send("edit successful!");
        })
    })

})


app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));


//obj[pokemon][id]