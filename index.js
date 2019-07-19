/**
 * ===================================
 * Configurations and set up
 * ===================================
 */

// Init express app
const express = require('express');
const app = express();

// Init jsonfile
const jsonfile = require('jsonfile');
const file = 'pokedex.json';


// this line below, sets a layout look to your express project
const reactEngine = require('express-react-views').createEngine();
app.engine('jsx', reactEngine);

// this tells express where to look for the view files
app.set('views', __dirname + '/views');

// this line sets react to be the default view engine
app.set('view engine', 'jsx');

// this tells express where to look for the public files
app.use(express.static(__dirname+'/public/'));

const methodOverride = require('method-override')
app.use(methodOverride('_method'));


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
////////////////////////////////////////////////////////////////////////////////////////////
//Shows all Pokemon
app.get('/pokemon', (request, response) => {

    let sortby = request.query.sortby;
    let content = `<html>
                <head>
                <style>
                    body{
                        display=flex;
                    }
                    div{
                        width:150px;
                        display:flex;
                        flex-direction:column;
                        justify-content:center;
                        align-items: center;
                        float: left;
                    }
                    img{
                        display:flex;
                    }
                </style>
                </head>
                <body>
                    <p>
                    <h2><a href = "/pokemon/new">Create new Pokemon</a></h2>
                    </p>
                <h2>List of Pokemon</h2>
                    <form>
                        <select name="sortby">
                            <option disabled selected>Select an option</option>
                            <option value="id">ID</option>
                            <option value="name">Name</option>
                            <option value="weight">Weight</option>
                            <option value="height">Height</option>
                        </select>
                        <button>Sort by</button>
                    </form>
                </body>
                <html>`;


    jsonfile.readFile(file, (err, obj) => {
        if (err){
            console.log(err);
        }
        else {
            let pokedex = obj.pokemon;

            if (sortby) {
                content+='<h4>Sorted by '+sortby+'</h4>';
                switch (sortby) {
                    case "id":
                        pokedex.sort(sortByID);
                        break;
                    case "name":
                        pokedex.sort(sortByName);
                        break;
                    case "weight":
                        pokedex.sort(sortByWeight);
                        break;
                    case "height":
                        pokedex.sort(sortByHeight);
                        break;
                }
            }
            for (let pokemon of pokedex){
                    // content += `<a href="/pokemon/<p>${pokemon.id}"><p>${pokemon.name}</a><br>`;
                    content += `<div class="img">
                                    <a href="/pokemon/${pokemon.id}"><img src ="${pokemon.img}" width="120px" height="120px"></a><br>
                                    <p>${pokemon.name}</p>
                                    <p>${pokemon.weight}</p>
                                </div>`
            }
        }
        // let wrapper = document.querySelector('#wrapper')
        // wrapper.innerContent = wrapper;
        response.send(content);
    });
});

////////////////////////////////////////////////////////////////////////////////////////////
//Shows form for new Pokemon entry
app.get('/pokemon/new', (request, response) => {

  // get json from specified file
  jsonfile.readFile(file, (err, obj) => {

    // let form = `<html>
    //             <head>
    //             </head>
    //             <body>
    //                 <h1>Pokemon Details</h1>
    //                 <form method="POST" action="/pokemon">
    //                   ID: <input type="text" name="id"> <br>
    //                   Num: <input type="text" name="num"> <br>
    //                   Pokemon Name: <input type="text" name="name"> <br>
    //                   Image: <input type="text" name="img"> <br>
    //                   Height: <input type="text" name="height"> <br>
    //                   Weight: <input type="text" name="weight"> <br>
    //                   <input type="submit" value="Submit">
    //                 </form>
    //              </body>
    //             <html>`;
    var id = request.params.id;
    var pokey = obj.pokemon[id];
    var num = obj.pokemon.length+1;

    var data = {
      pokeId : parseInt(id),
      pokey : pokey,
      num : num
    }
      // response.send(form);
      response.render('new',data);

  });
});

///////////////////////////////////////////////////////////////////////////////////////////
//Write and creates new Pokemon to JSON
app.post('/pokemon', function(request, response) {

    //debug code (output request body)
    console.log(request.body);

    let newPokemon = request.body;

    newPokemon.id = parseInt(request.body.id);

    //read file
    jsonfile.readFile(file, (err, obj) => {
        if (err){
            console.log(err);
        }
        else {
            if (newPokemon.id === obj.pokemon.length+1){

                obj.pokemon.push(newPokemon);

                    //write file
                jsonfile.writeFile(file, obj, (err) => {
                    if (err !== null) {
                        console.log(err);
                    }
                    else{
                        var pokemonId = request.body.id;
                        response.send(`Pokemon added!`);
                    }
                });
            }
            else{
                response.send(`ID number should be ${obj.pokemon.length+1}`)
            }
        }
    });
});

///////////////////////////////////////////////////////////////////////////////////////////
//Get a specific Pokemon from ID
app.get('/pokemon/:id', (request, response) => {

    jsonfile.readFile(file, (err, obj) => {

        let id = parseInt(request.params.id)-1;
        let pokey = obj.pokemon[parseInt(id)];

        if (err){
            console.log(err);
        }
        else {
            // find pokemon by id from the pokedex json file
            for( let i=0; i<obj.pokemon.length; i++ ){
                // let currentPokemon = obj.pokemon[i];
                // if( currentPokemon.id === inputId ){
                //     pokemon = currentPokemon;
                // }
                if(pokey.id === id){
                    return pokey;
                }
            }
            if (pokey === undefined) {
              // send 404 back
              response.status(404);
              response.send("not found");
            }
            else {
                let data = {
                    id:id,
                    pokey:pokey
                }
                response.render('id',data);
            }
        }
    });
});

////////////////////////////////////////////////////////////////////////
//Request to edit a specific Pokemon
app.get('/pokemon/:id/edit', (request, response) => {

  jsonfile.readFile(file, (err, obj) => {
    if( err ){
      console.log("error reading file");
      console.log(err);
      // respond.send("Pokemon not found")
    }

    console.log(obj);
    var id = request.params.id;
    var pokey = obj.pokemon[parseInt(id)-1];

    var data = {
      pokeId : id,
      pokey : pokey
    }

    response.render('edit', data);
  });

});
////////////////////////////////////////////////////////////////////////
//Updates a specific Pokemon
app.put('/pokemon/:id', (request, response) => {

    var id = parseInt(request.params.id)-1;
    var newPokemon = request.body;

  jsonfile.readFile(file, (err, obj) => {
    if( err ){
      console.log("error reading file");
      console.log(err)
    }
    // save data
    obj.pokemon[id] = newPokemon;

    jsonfile.writeFile(file, obj, (err) => {
      if( err ){
        console.log("error writing file");
        console.log(err)
        response.status(503).send("Error writing file!");
      }else{

        console.log( "send response");
        response.send("<h1>Pokemon updated!!!</h1>  ");
      }
    });
  });
});
////////////////////////////////////////////////////////////////////////
//Request to delete a specific Pokemon
app.get('/pokemon/:id/delete', (request, response) => {

  jsonfile.readFile(file, (err, obj) => {
    if( err ){
      console.log("error reading file");
      console.log(err)
    }

    // console.log(obj);
    var id = request.params.id;
    var pokey = obj.pokemon[parseInt(id)-1];

    var data = {
      pokeId : parseInt(id),
      pokey : pokey
    }

    response.render('delete', data);
  });

});
////////////////////////////////////////////////////////////////////////
//Delete a specific Pokemon
app.delete('/pokemon/:id', (request, response) => {
    var pokeId = request.params.id;

  jsonfile.readFile(file, (err, obj) => {

    if( err ){
      console.log("error reading file");
      console.log(err)
    }
    // delete data
    obj.pokemon.splice(pokeId-1,1);
    console.log('Delete successful')

    const changedObj = obj;


    jsonfile.writeFile(file, changedObj, (err) => {
      if( err ){
        console.log("error writing file");
        console.log(err)
        response.status(503).send("Error writing file!");
      }else{
        console.log( "send response");
        response.send("Pokemon deleted!!!");
      }
    });
  });
});



////////////////////////////////////////////////////////////////////////////////////////////
//Sort Pokemon
//Sort alphabetically
function sortByName(a, b) {
  // Use toUpperCase() to ignore character casing
  const nameA = a.name.toUpperCase();
  const nameB = b.name.toUpperCase();

  let comparison = 0;
  if (nameA > nameB) {
    comparison = 1;
  } else if (nameA < nameB) {
    comparison = -1;
  }
  return comparison;
}

//Sort by ID
function sortByID(a, b) {
  const indexA = a.id;
  const indexB = b.id;

  let comparison = 0;
  if (indexA > indexB) {
    comparison = 1;
  } else if (indexA < indexB) {
    comparison = -1;
  }
  return comparison;
}
//Sort by Weight
function sortByWeight(a, b) {
  const indexA = parseFloat(a.weight);
  const indexB = parseFloat(b.weight);

  let comparison = 0;
  if (indexA > indexB) {
    comparison = 1;
  } else if (indexA < indexB) {
    comparison = -1;
  }
  return comparison;
}
//Sort by Height
function sortByHeight(a, b) {
  const indexA = parseFloat(a.height);
  const indexB = parseFloat(b.height);

  let comparison = 0;
  if (indexA > indexB) {
    comparison = 1;
  } else if (indexA < indexB) {
    comparison = -1;
  }
  return comparison;
}
/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));
