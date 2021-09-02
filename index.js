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

// this line below, sets a layout look to your express project
const reactEngine = require('express-react-views').createEngine();
app.engine('jsx', reactEngine);

// this tells express where to look for the view files
app.set('views', __dirname + '/views');

// this line sets react to be the default view engine
app.set('view engine', 'jsx');

// Set up method-override for PUT and DELETE forms
const methodOverride = require('method-override')
app.use(methodOverride('_method'));

/**
 * ===================================
 * Routes
 * ===================================
 */

app.get('/pokemon/:id', (request, response) => {

  // get json from specified file
  jsonfile.readFile(FILE, (err, obj) => {
    
    // check to make sure the file was properly read
    if( err ){
      
      console.log("error with json read file:",err);
      response.status(503).send("error reading filee");
      return; 
    }
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
        // let sortBy =    '<form>'+
        //             '<select name="sortby">' +
        //             '<option value="none">Sort by</option>' +
        //             '<option value="name">Name</option>' +
        //             '<option value="id">Id</option>' +
        //             '<option value="num">Number</option>' +
        //             '</select>'+
        //             '<input type="submit" value="Submit">'+
        //             '</form>';

        if (request.query.sortby == undefined) {
            response.render('sortby');
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


app.get('/pokemon/new', (request, response) => {
    jsonfile.readFile(FILE, (err, obj) => {
        // let lastId = obj.pokemon[obj.pokemon.length - 1].id;
        // let newId = lastId + 1;
        // let  respond =  '<h1>YOU FOUND A NEW POKEMON???/1!1!!! FOR REALSIES???</h1>'+
        //                   '<form method="POST" action="/pokemon/added">'+
        //                   'ID:<input type="text" name="id" value="'+newId+'"><br>'+
        //                   'Number:<input type="text" name="num" value="'+newId+'"><br>'+
        //                   'Pokemon Name:<input type="text" name="name"><br>'+
        //                   'Image:<input type="text" name="img"><br>'+
        //                   'Height:<input type="text" name="height" value="0.00 m"><br>'+
        //                   'Weight:<input type="text" name="weight" value="0.0 kg"><br>'+
        //                   'Candy:<input type="text" name="candy" value="None"><br>'+
        //                   'Egg:<input type="text" name="egg" value="Not in Eggs"><br>'+
        //                   'Average spawns:<input type="text" name="avg_spawns" value="0"><br>'+
        //                   'Spawn time:<input type="text" name="spawn_time" value="N/A"><br>'+
        //                   '<input type="submit" value="Submit">'
        //                   '</form>';

        response.render('newpokemon', obj);
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
    obj.pokemon.push(request.body);

  // save the request body
      jsonfile.writeFile(FILE, obj, (err) => {

        console.error(err)

        // now look inside your json file
        response.send(request.body);
      });
  });
})

app.get('/pokemon/:id/edit', (request, response) => {
    jsonfile.readFile(FILE, (err, obj) => {
        let index = parseInt(request.params.id) - 1;
        obj["paramsKey"] = index;
        // let pokeId = obj.pokemon[index].id;
        // let pokeNum = obj.pokemon[index].num;
        // let pokeName = obj.pokemon[index].name;
        // let pokeImg = obj.pokemon[index].img;
        // let pokeHeight = obj.pokemon[index].height;
        // let pokeWeight = obj.pokemon[index].weight;
        // let pokeCandy = obj.pokemon[index].candy;
        // let pokeEgg = obj.pokemon[index].egg;
        // let pokeAvgSpawn = obj.pokemon[index].avg_spawns;
        // let pokeSpawnTime = obj.pokemon[index].spawn_time;

        // let respond =  '<h1>YOUR POKEMAN GREW??? TEL ME ABOUT IT!1!!</h1>'+
        //                   '<form method="POST" action="/pokemon/:id/edit?_method=PUT">'+
        //                   'ID:<input type="text" name="id" value="'+pokeId+'"><br>'+
        //                   'Number:<input type="text" name="num" value="'+pokeNum+'"><br>'+
        //                   'Pokemon Name:<input type="text" name="name" value="'+pokeName+'"><br>'+
        //                   'Image:<input type="text" name="img" value="'+pokeImg+'"><br>'+
        //                   'Height:<input type="text" name="height" value="'+pokeHeight+'"><br>'+
        //                   'Weight:<input type="text" name="weight" value="'+pokeWeight+'"><br>'+
        //                   'Candy:<input type="text" name="candy" value="'+pokeCandy+'"><br>'+
        //                   'Egg:<input type="text" name="egg" value="'+pokeEgg+'"><br>'+
        //                   'Average spawns:<input type="text" name="avg_spawns" value="'+pokeAvgSpawn+'"><br>'+
        //                   'Spawn time:<input type="text" name="spawn_time" value="'+pokeSpawnTime+'"><br>'+
        //                   '<input type="submit" value="Submit">'
        //                   '</form>';
        // response.render(respond);
        response.render('edit', obj);
    })
})

app.put('/pokemon/:id/edit',(request, response)=>{

  // we are recieving data
  // console.log( "this is request body:",request.body );
  jsonfile.readFile(FILE, (err, obj) => {
        let index = request.body.id - 1;
        obj.pokemon[index].id = parseInt(request.body.id);
        obj.pokemon[index].num = request.body.num;
        obj.pokemon[index].name = request.body.name;
        obj.pokemon[index].img = request.body.img;
        obj.pokemon[index].height = request.body.height;
        obj.pokemon[index].weight = request.body.weight;
        obj.pokemon[index].candy = request.body.candy;
        obj.pokemon[index].egg = request.body.egg;
        obj.pokemon[index].avg_spawns = parseInt(request.body.avg_spawns);
        obj.pokemon[index].spawn_time = request.body.spawn_time;

  // save the request body
      jsonfile.writeFile(FILE, obj, (err) => {
        console.error(err)
        // now look inside your json file
        response.send(obj.pokemon[index]);
      });
  });
})

app.get('/pokemon/:id/delete', (request, response) => {
  jsonfile.readFile(FILE, (err, obj) => {
        let id = parseInt(request.params.id);
        console.log(id);
        let index = id - 1;
        console.log(index);
        obj["paramsIndex"] = index;
        obj["paramsId"] = id;
        // let respond =    '<form method="POST" action="/pokemon/:id/delete?_method=DELETE">'+
        //             '<input type="hidden" name="id" value="'+index+'">'+
        //             '<input type="submit" value="Submit">'+
        //             '</form>';
        response.render('delete', obj);
    })
})

app.delete('/pokemon/:id/delete' ,(request, response)=>{
  // we are recieving data
  // console.log( "this is request body:",request.body );
  jsonfile.readFile(FILE, (err, obj) => {
        let index = request.body.id;
        console.log(index);
        obj.pokemon.splice(index, 1);

  // save the request body
      jsonfile.writeFile(FILE, obj, (err) => {

        console.error(err)

        // now look inside your json file
        response.send(obj.pokemon);
      });
  });
})
/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));
