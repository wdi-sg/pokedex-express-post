const express = require('express');
const jsonfile = require('jsonfile');

const FILE = 'pokedex.json';

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

/**
 * ===================================
 * Routes
 * ===================================
 */

app.get('/:id', (request, response) => {

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


app.get('/', (request, response) => {
    jsonfile.readFile(FILE, (err,obj) => {
        let sortBy =    '<form>'+
                    '<select name="sortby">' +
                    '<option value="none">Sort by</option>' +
                    '<option value="name">Name</option>' +
                    '<option value="id">Id</option>' +
                    '<option value="num">Number</option>' +
                    '</select>'+
                    '<input type="submit" value="Submit">'+
                    '</form>';

        if (request.query.sortby == undefined) {
            response.send(sortBy);
        } else if (request.query.sortby == "name") {
            obj.pokemon.sort(function(a, b) {
                return a.name.toLowerCase().localeCompare(b.name.toLowerCase());
            });
            response.send(obj.pokemon);
        } else if (request.query.sortby == "id") {
            obj.pokemon.sort(function(a, b) {
                return a.id - b.id;
            });
            response.send(obj.pokemon);
        } else if (request.query.sortby == "num") {
            obj.pokemon.sort(function(a, b) {
                return a.num.toLowerCase().localeCompare(b.num.toLowerCase());
            });
            response.send(obj.pokemon);
        }
    })
})

// app.get('/?sortby=name', (request, response) => {
//     jsonfile.readFile(FILE, (err,obj) => {
//         obj.pokemon.sort(function(a, b) {
//             return a.name.toLowerCase().localeCompare(b.name.toLowerCase());
//         });
//         response.send(obj.pokemon);
//     })
// })

// app.get('/?sortby=id', (request, response) => {
//     jsonfile.readFile(FILE, (err,obj) => {
//         obj.pokemon.sort(function(a, b) {
//             return a.id.toLowerCase().localeCompare(b.id.toLowerCase());
//         });
//         response.send(obj.pokemon);
//     })
// })

// app.get('/?sortby=num', (request, response) => {
//     jsonfile.readFile(FILE, (err,obj) => {
//         obj.pokemon.sort(function(a, b) {
//             return a.num.toLowerCase().localeCompare(b.num.toLowerCase());
//         });
//         response.send(obj.pokemon);
//     })
// })


app.get('/pokemon/new', (request, response) => {
    jsonfile.readFile(FILE, (err, obj) => {
        let lastId = obj.pokemon[obj.pokemon.length - 1].id;
        let newId = lastId + 1;
        let  respond =  '<h1>YOU FOUND A NEW POKEMON???/1!1!!! FOR REALSIES???</h1>'+
                          '<form method="POST" action="/pokemon/added">'+
                          'ID:<input type="text" name="id" value="'+newId+'"><br>'+
                          'Number:<input type="text" name="num" value="'+newId+'"><br>'+
                          'Pokemon Name:<input type="text" name="name"><br>'+
                          'Image:<input type="text" name="img"><br>'+
                          'Height:<input type="text" name="hight" value="0.00 m"><br>'+
                          'Weight:<input type="text" name="weight" value="0.0 kg"><br>'+
                          'Candy:<input type="text" name="candy" value="None"><br>'+
                          'Egg:<input type="text" name="egg" value="Not in Eggs"><br>'+
                          'Average spawns:<input type="text" name="avg_spawns" value="0"><br>'+
                          'Spawn time:<input type="text" name="spawn_time" value="N/A"><br>'+
                          '<input type="submit" value="Submit">'
                          '</form>';

        response.send(respond);
    });
});

app.post('/pokemon/added',(request, response)=>{

  // we are recieving data
  // console.log( "this is request body:",request.body );
  jsonfile.readFile(FILE, (err, obj) => {
    // request.body.id.parseInt();
    // request.body.spawn_time.parseInt();
    let newId = parseInt(request.body.id);
    let newSpawn = parseInt(request.body.avg_spawns);
    request.body.id = newId;
    request.body.avg_spawns = newSpawn;
    obj.pokemon.push(request.body);    // console.log(obj.pokemon);
    // console.log(request.body);

  // save the request body
      jsonfile.writeFile(FILE, obj, (err) => {

        console.error(err)

        // now look inside your json file
        response.send(request.body);
      });
  });



  // response.send('yay works');
})

/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));
