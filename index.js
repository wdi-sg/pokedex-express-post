const express = require('express');
const app = express();
const jsonfile = require('jsonfile');

const methodOverride = require('method-override')

app.use(methodOverride('_method'));

const FILE = 'pokedex.json';

app.use(express.json());
app.use(express.urlencoded({
extended: true
}));

// this line below, sets a layout look to your express project
const reactEngine = require('express-react-views').createEngine();
app.engine('jsx', reactEngine);

// this tells express where to look for the view files
app.set('views', __dirname + '/views');

// this line sets handlebars to be the default view engine
app.set('view engine', 'jsx');
// *

app.get('/pokemon/:id/edit',(request, response)=>{

    jsonfile.readFile(FILE,(err,obj)=>{
        console.log("simi-err:", err);

        let userRequestPokemonId = parseInt(request.params.id);

        for (var x = 0; x < obj.pokemon.length; x++){

            if(obj.pokemon[x].id === userRequestPokemonId){

                var foundPokemon = obj.pokemon[x];

            }
        }

        if (foundPokemon){

            console.log("finallyFound", foundPokemon);

            response.render('pokemonedit', {pokemon: foundPokemon})
        }else{
            response.send("no such pokemon");
        }
    })

})


app.put('/pokemon/:id', (request, response) => {

    console.log("REQ BODY:", request.body )


    jsonfile.readFile( FILE, (err, obj) => {

    let userRequestPokemonId = parseInt(request.params.id);

        for (var x = 0; x < obj.pokemon.length; x++){

            if(obj.pokemon[x].id === userRequestPokemonId){
                var foundPokemonIndex = x;
                //var name correct??
                var foundPokemon = obj.pokemon[x];
            }
        }

            if(foundPokemon){
                console.log("found:",foundPokemon);
                obj.pokemon[foundPokemonIndex] = request.body;
                obj.pokemon[foundPokemonIndex].id = parseInt(obj.pokemon[foundPokemonIndex].id)

                jsonfile.writeFile(FILE, obj, function (err) {
                        if (err) console.log("ERROR:",err)


                        response.send("FOUND, WORKS")
                        // response.send(request.body);
                        // response.send(request.body);
                    })
            }else{
                      response.send("not a pokemon");
                  }
    });
})
// app.get('/', (request, response) => {
//   // giving home.jsx file an object/context with `name` as a property
//   response.render('home');
// });

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

app.get('/', (request, response) => {
  response.send("It good to be home!");
});
//form post from user
app.post('/pokemon', function(request, response) {

    let myObj = {
            id: parseInt(request.body["id"]),
            num: request.body['num'],
            name: request.body['name'],
            img: request.body['img'],
            height: request.body['height'],
            weight: request.body['weight'],
        }
        console.log("myObj",myObj);

    jsonfile.readFile(FILE, (err, obj) => {
        //bring in the file
        // let testfile = 'data.json';

        obj["pokemon"].push(myObj);
        //debug code (output request body)
       // console.log(request.body);


        // save the request body
  jsonfile.writeFile('pokedex.json', /*the pokedex obj*/obj, (err) => {
    console.error(err)

    // now look inside your json file
    //response.send is like a console.log
    response.send(myObj);//change to the var myObj
        });
    });
});
//form get info from user
app.get('/pokemon/new', (request, response) => {


    // let html = "<html>";
    // // html += '<head><link rel="stylesheet" href="public/main.css"></head>'
    // html += "<body>";
    // html += '<form name="myPokemon" method="POST" action="/pokemon">';
    // html += "<h2>Creat A New Pokemon:</h2>";
    // html += 'ID: <input type="text" name="id"/></br>';
    // html += 'Num: <input type="text" name="num"/></br>';
    // html += 'Name: <input type="text" name="name"/></br>';
    // html += 'Upload Image: <input type="file" name="img"/></br>';
    // html += 'Height: <input type="text" name="height"/></br>';
    // html += 'Weight: <input type="text" name="weight"/></br>';
    // html += '<input type="submit" value="Submit">';
    // html += "</form>";
    // html += "</body>";
    // html += "</html>";

    response.render('home', request.body)//html render in home.jsx
    // response.send( html );

  // render a template form here
  //response.send("hello world");
});
/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));
