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
app.use(express.static('public'))

// To get request.body
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

//react template
const reactEngine = require('express-react-views').createEngine();
app.engine('jsx', reactEngine);
app.set('views', __dirname + '/views');
app.set('view engine', 'jsx');
const methodOverride = require('method-override')
app.use(methodOverride('_method'));


/**
 * ===================================
 * Routes
 * ===================================
 */

var updateData = function (request, response) {
  //console.log("editData");

  jsonfile.readFile(file, (err, obj) => {
    if( err ){
      console.log("error reading file");
      console.log(err)
    }

    //console.log(obj);
    var id = request.params.id;

    var data = {
      pokemonId : obj.pokemon[id]
    }

    response.render('update', data);
  });
};


var updated = function (request, response) {

    var newEntry = request.body;

    jsonfile.readFile(file, (err, obj) => {
    if( err ){
      console.log("error reading file");
      console.log(err)
    }

    obj.pokemon[request.params.id-1].name = newEntry.name;
    obj.pokemon[request.params.id-1].id = parseInt(newEntry.id);
    obj.pokemon[request.params.id-1].num = newEntry.num;
    obj.pokemon[request.params.id-1].height = newEntry.height;
    obj.pokemon[request.params.id-1].weight = newEntry.weight;
            console.log(newEntry);

            jsonfile.writeFile(file, obj, (err) => {

              if( err ){
                console.log("error writing file");
                console.log(err);

              }else{
                response.redirect('/pokemon/'+request.params.id);
            }
        });
    });
};


var deleteData = function (request, response){
    jsonfile.readFile(file, (err, obj) => {
        if( err ){
          console.log("error reading file");
          console.log (err);
          }

       var id = request.params.id;

        var pokemon = obj.pokemon[id];

        var output = "" +
        "<h1>Edit Pokemon</h1>"+
          '<form method = "POST" action="/pokemon/deleted/'+id+'?_method=delete">'+
          '<p>Name</p><input name="name" value="'+pokemon.name+'" readonly>'+
          '<br><br><input type="submit" value="Delete"/>'+
          "</form>";

        response.send(output);
    });
};

var deleted = function (request, response){
    jsonfile.readFile(file, (err, obj) => {
        if( err ){
          console.log("error reading file");
          console.log(err);
        }

        var id = request.params.id;
        obj.pokemon.splice(id,1)

        jsonfile.writeFile(file, obj, (err) => {

          if( err ){
            console.log("error writing file");
            console.log(err);

          }else{
            response.redirect('/pokemon');
            }
        });
    });
}

var checkPokemon = function (request, response) {

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
};


var makeForm = function (request, response) {

  let form = '';
  form = '<html>' +
    '<body>'+
    '<h1>Create New Pokemon</h1>'+
    '<form method="POST" action="/pokemon">'+
    '<p>ID:</p><input name="id"/>'+
    '<p>Num:</p><input name="num"/>'+
    '<p>Name:</p><input name="name"/>'+
    '<p>Image:</p><input name="img"/>'+
    '<p>Height:</p><input name="height"/>'+
    '<p>Weight:</p><input name="weight"/>'+
    '<br><br><input type="submit"/>'+
    '</form>'+
    '</body>'+
    '</html>';

  response.send(form);
};


var submitData = function (request,response) {

    var newEntry = request.body;
    let found = false;

    // //save in data file
    jsonfile.readFile(file, (err, obj) => {
        if( err ){
            console.log("error reading file");
            console.log(err)
        }
        else{
            if(newEntry.id > obj["pokemon"].length){
                let pokemonToAdd = {
                      "id": parseInt(newEntry.id),
                      "num": newEntry.num,
                      "name": newEntry.name,
                      "img": newEntry.img,
                      "height": newEntry.height,
                      "weight": newEntry.weight
                }
                obj.pokemon.push(pokemonToAdd);

                jsonfile.writeFile(file, obj, (err) => {
                    if( err ){
                        console.log("error writing file");
                        console.log(err)
                        response.status(503).send("no!");
                    }else{
                        console.log("~~~~~~~yay");
                        console.log( "send response");
                        response.send("New Pokemon added!");
                    }
                });
            }
            else {
                response.send("<h1>Pokemon already exists</h1>");
            }
        }
    });
};


var defaultHome = function (request, response){
    //var fullNameList = [];

    jsonfile.readFile(file, (err, obj) => {
        if (err){
            console("ERRRORRR~~");
        }

        // else {
        //     for (let i = 0; i < obj["pokemon"].length; i++) {
        //         fullNameList.push(`${obj["pokemon"][i]["name"]}`);
        //     }

        //     let displayList = ""
        //     if (request.query.sortby === "name") {
        //         var sort = fullNameList.sort();
        //         displayList = sort.join("<br>")
        //     }

        //     else if (request.query.sortby === undefined){
        //         var fullNameListJoin = fullNameList.join("<br>");
        //         displayList = fullNameListJoin;
        //     };
        // }
        else{
            const data = {
                fullNameList : obj["pokemon"]
            }
            response.render('home', data);
        }
    });
}


app.get('/pokemon/:id', checkPokemon);
app.post('/pokemon', submitData);
app.get('/pokemon/:id/edit', updateData);
app.get('/pokemon/:id/delete', deleteData);
app.delete('/pokemon/deleted/:id', deleted);
app.put('/pokemon/:id', updated);
app.get('/pokemon/new', makeForm);
app.get('/pokemon', defaultHome);


/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));