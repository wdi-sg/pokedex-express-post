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

app.get('/', (req, res) => {
  // running this will let express to run home.handlebars file in your views folder
  res.render('home')
})

const methodOverride = require('method-override')
app.use(methodOverride('_method'));

/**
 * ===================================
 * Routes
 * ===================================
 */

// app.get('/:id', (request, response) => {

//   // get json from specified file
//   jsonfile.readFile(FILE, (err, obj) => {
//     // obj is the object from the pokedex json file
//     // extract input data from request
//     let inputId = parseInt( request.params.id );

//     var pokemon;

//     // find pokemon by id from the pokedex json file
//     for( let i=0; i<obj.pokemon.length; i++ ){

//       let currentPokemon = obj.pokemon[i];

//       if( currentPokemon.id === inputId ){
//         pokemon = currentPokemon;
//       }
//     }

//     if (pokemon === undefined) {

//       // send 404 back
//       response.status(404);
//       response.send("not found");
//     } else {

//       response.send(pokemon);
//     }
//   });
// });

// let form = '';
//         form = '<html>' +
//         '<body>'+
//         '<h1>New Pokemon Entries</h1>'+
//         '<form method="POST" action="/new">'+
//         '<p>Name of Pokemon</p><input name="name"/>'+
//         '<p>Id of Pokemon</p><input name="id"/>'+
//         '<p>Num of Pokemon</p><input name="Num"/>'+
//         '<p>Img link of Pokemon</p><input name="Img"/>'+
//         '<p>Weight of Pokemon</p><input name="Weight"/>'+
//         '<p>Height of Pokemon</p><input name="Height"/>'+
//         '<input type="submit"/>'+
//         '</form>'+
//         '</body>'+
        // '</html>';


var newEntry = (request,response) =>{
    console.log("HELLO");
    jsonfile.readFile(file,(err,obj)=>{
        var data = {
            pokemonId: obj.pokemon.length
        };
        console.log(data);
        response.render("new",data);
    });
};

var newUpdate = (request,response) => {
    // console.log("wow");
    var newPokemon = request.body
    jsonfile.readFile(file,(err,obj)=>{
        console.log(newPokemon);
        obj.pokemon.push(newPokemon);
        jsonfile.writeFile(file, obj, (err) => {
            console.log("Added new pokemon")
            if( err ){
                console.log("error writing file");
                console.log(err)
                // response.status(503).send("no!");
            }
            else{
                console.log("~~~~~~~yay");

                console.log( "send response");
                // response.send("yes!");
            }
        })
    });
};

var homePage = (request,response)=>{
    jsonfile.readFile(file,(err,obj)=>{
        let data = {
            "pokemonData": obj.pokemon
        };
        response.render("show", data);
    });
};

var individual = (request,response) =>{
    var id = request.params.id;
    jsonfile.readFile(file,(err,obj)=>{
        var pokemonDetail = obj.pokemon[id-1];

        var data = {
            pokemon: pokemonDetail,
            pokemonId: id
        };
        console.log("YOOOOO");
        response.render('individual', data);
    });
};

var sortByName = (request,response) =>{
    var pokemonName =[];
        jsonfile.readFile(file,(err,obj)=>{
        for (let i = 0; i < obj.pokemon.length;i++){
            console.log(obj.pokemon[i].name);
            pokemonName.push(obj.pokemon[i].name);
        }
        pokemonName = pokemonName.sort();
        // console.log("is it showing???")
        var stringPokemonName = pokemonName.join("<br>");
        console.log(stringPokemonName);
        // response.send(stringPokemonName);
    })
}

var sortByHeight = (request,response) =>{
    var pokemonName = [];
    // console.log("YOOO");
    jsonfile.readFile(file,(err,obj)=>{
        let i = 0;
        for(let i = 0; i < obj.pokemon.length; i++){
            pokemonName.push([obj.pokemon[i].name, obj.pokemon[i].height])
            // console.log(pokemonName);
                // for (var name in obj.pokemon[i]){
                //     console.log("Name: ", name.name);
                //     //pokemonName.push([name, obj.pokemon[i].height]);
                //     // break;
                // }

        // pokemonName = pokemonName.height.sort();
        // // console.log("is it showing???")
        // var stringPokemonName = pokemonName.join("<br>");
        // console.log(stringPokemonName);
        // response.send(stringPokemonName);
        }
        // pokemonName.sort(function(a, b) {
        //     return parseFloat(a[1]) - parseFloat(b[1]);
        console.log(pokemonName);
        // })
        // response.send(pokemonName);
    })
}
var edit = (request,response)=>{
    jsonfile.readFile(file,(err,obj)=>{
        // console.log("YOOOO");
        var id = request.params.id;
        var pokemonIndex;
        // console.log(obj.pokemon[id]);
        pokemonIndex = obj.pokemon[id];
        // console.log(pokemonIndex);

        var data = {
            pokemon : pokemonIndex,
            pokemonId : id
        }
        response.render('edit', data);
    });
};

var update = (request,response)=>{
    var newUpdate = request.body;
    var id = request.params.id;
    console.log(newUpdate);
    newUpdate.id = parseInt(newUpdate.id);
    // response.send("YOOOOOOO");
    jsonfile.readFile(file,(err,obj)=>{
        obj.pokemon[id] = newUpdate;
        //////update jsonfile
        jsonfile.writeFile(file,obj,(err)=>{
            if(err){
                console.log("error in saving");
                response.status(503).send("NO!!!!!!");
            }
            else{
                console.log("pokemon data updated");
                response.send("pokemon data updated");
            };
        });
    });
};

var remove = (request,response)=>{
    // console.log("accessing remove functions");
    jsonfile.readFile(file,(err,obj)=>{
        var id = request.params.id

        var pokemonIndex = obj.pokemon[id];
        console.log(pokemonIndex);
        var data = {
            pokemon : pokemonIndex,
            pokemonId : id
        }
        console.log("YOOOO");
        response.render("delete", data);
    })
}

var removeUpdate = (request,response)=>{
    var index = parseInt(request.params.id);
    jsonfile.readFile(file,(err,obj)=>{
        obj.pokemon.splice(index,1);
        jsonfile.writeFile(file,obj,(err)=>{
            if(err){
                console.log("error in deleting");
                response.status(503).send("NO!!!!!!");
            }
            else{
                console.log("pokemon data delete");
                response.send("pokemon data delete");
            };
        })
    })
}


/*
jsonfile.writeFile(file, obj, (err) => {
            console.log("write file done");
            if( err ){
            console.log("error writing file");
            console.log(err)
            response.status(503).send("no!");
            }
            else{
            console.log("~~~~~~~yay")
            response.send("Successfully updated the pokemon");
        };
{
  id: 1,
  num: '001',
  name: 'Bulbasaur',
  img: 'http://www.serebii.net/pokemongo/pokemon/001.png',
  height: '0.71 m',
  weight: '6.9 kg',
  candy: 'Bulbasaur Candy',
  candy_count: '25',
  egg: '2 km',
  avg_spawns: '69',
  spawn_time: '20:00'
}
*/
app.get('/pokemon/new', newEntry);
app.post('/pokemon',newUpdate);
app.get('/pokemon/:id/edit', edit);
app.get('/pokemon/:id/delete', remove);
app.put('/pokemon/:id', update);
app.delete('/pokemon/:id',removeUpdate);
app.get('/pokemon/:id',individual);
app.get('/pokemon', homePage);

/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(8080, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));