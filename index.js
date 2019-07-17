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



app.get("/pokemon/new", (request,response) =>{
    let form = '';
        form = '<html>' +
        '<body>'+
        '<h1>New Pokemon Entries</h1>'+
        '<form method="POST" action="/new">'+
        '<p>Name of Pokemon</p><input name="name"/>'+
        '<p>Id of Pokemon</p><input name="id"/>'+
        '<p>Num of Pokemon</p><input name="Num"/>'+
        '<p>Img link of Pokemon</p><input name="Img"/>'+
        '<p>Weight of Pokemon</p><input name="Weight"/>'+
        '<p>Height of Pokemon</p><input name="Height"/>'+
        '<input type="submit"/>'+
        '</form>'+
        '</body>'+
        '</html>';
      // response.send(form);
});

app.post("/new", (request,response) => {
    // console.log("wow");
    var newPokemon = request.body
    jsonfile.readFile(file,(err,obj)=>{
        console.log(newPokemon);
        if(err){
            console.log("ERROR");
        }
        else{
            if((parseInt(newPokemon.id) - 1) < obj.pokemon.length){
                console.log("id exist. select another");
            }
            else{
                obj.pokemon.push(newPokemon);
                console.log(obj.pokemon.length);
            }
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
        }
    });
});

var homePage = (request,response)=>{
    var pokemonName = [];
    jsonfile.readFile(file,(err,obj)=>{
        for (let i = 0; i < obj.pokemon.length;i++){
            console.log(obj.pokemon[i].name);
            pokemonName.push(obj.pokemon[i].name);
        }
        console.log("is it showing???")
        var stringPokemonName = pokemonName.join("<br>");
        // response.send(stringPokemonName);
        let form = '';
            form = '<html>' +
            '<body>'+
            '<h1>Welcome to the walking pokedex</h1>'+
            '<form method="GET" action="/sortbyname">'+
            '<button type="submit">Sortbyname</button>'+
            '</form>'+
            '<form method="GET" action="/sortbyheight">'+
            '<button type="submit">Sortbyheight</button>'+
            '</form>'+
            '<form method="GET" action="/sortbyweight">'+
            '<button type="submit">Sortbyweight</button>'+
            '</form>'+
            `<p>${stringPokemonName}</p>`+
            '</body>'+
            '</html>';
        // response.send(form);
    })
}

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
    var index = request.params.id;
    jsonfile.readFile(file,(err,obj)=>{
        obj.pokemon.splice(index);
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



app.get('/', homePage);
app.get('/sortbyname', sortByName);
// app.get('/sortbyheight', sortByHeight);
// app.get('/sortbyweight', sortByWeight);

app.get('/pokemon/:id/edit', edit);
app.put('/pokemon/:id', update);
app.get('/pokemon/:id/delete', remove);
app.put('pokemon/:id',removeUpdate);


/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));