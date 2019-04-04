const _ = require('lodash');
const express = require('express');
const jsonfile = require('jsonfile');
const reactEngine = require('express-react-views').createEngine();

const methodOverride = require('method-override');

const FILE = 'pokedex.json';

/**
 * ===================================
 * Configurations and set up
 * ===================================
 */
// Init express app
const app = express();
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
app.use(methodOverride('_method'));

app.engine('jsx', reactEngine);
// this tells express where to look for the view files
app.set('views', __dirname + '/views');
// this line sets handlebars to be the default view engine
app.set('view engine', 'jsx');

/**
 * ===================================
 * Routes
 * ===================================
 */



app.get('/pokemon/:id', (request, response) => {
  // get json from specified file
  jsonfile.readFile(FILE, (err, obj) => {
    let inputId = parseInt( request.params.id );
    let chooseType =        '<form method="POST" action="/pokemon/test">'+
                            'What type is this? ' + '<br>' +
                            'Type:     <input type="text" name="type">'+ '<br>' +
                            'ID:     <input type="text" name="id" value="'+ inputId +'">'+ '<br>' +
                            '<input type="submit" value="Submit">'+ '<br>' +
                            '</form>';

    let chooseTypeDrop = '<form method="POST" action="/pokemon/test2"> '+
                    '<select name="addType">' +
                    '<option value="">Choose an Option</option>' +
                    '<option value="fire">Fire</option>' +
                    '<option value="water">Water</option>'+
                    '<option value="ghost">Ghost</option>'+
                    '</select>'+ '<br>' +
                    'ID:     <input type="text" name="id" value="'+ inputId +'">'+ '<br>' +
                    '<input type="submit" value="Choose a type">'+
                    '</form>';
    // obj is the object from the pokedex json file
    // extract input data from request


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
        console.log(pokemon.id);
      response.send(chooseTypeDrop+ '<br>'+ 'Name: '+pokemon.name +'<br>' +'id: '+pokemon.id);
      // chooseType + '<br>' +
    }
  });
});

app.post('/pokemon/test', (request,response)=>{

    jsonfile.readFile(FILE, (err,obj)=>{

        let pokemonId = parseInt(request.body.id)-1;
        let target = obj.pokemon[pokemonId];
        console.log(target);
        if(target === undefined){
            response.send('Id not found. Is this a new pokemon?');
        }
        obj.pokemon[pokemonId].type = request.body.type;


    response.send('Added type:' + request.body.type + '. To ' + obj.pokemon[pokemonId].name +'. Gotta catch some more?');
    jsonfile.writeFile(FILE, obj, (err)=>{
            if(err !== null){
                console.log(err);
            }
        });
    });
})

app.post('/pokemon/test2', (request,response)=>{
    console.log(request.body);
    jsonfile.readFile(FILE, (err,obj)=>{
        let pokemonId = parseInt(request.body.id)-1;
        let target = obj.pokemon[pokemonId];
        console.log(target);
        if(target === undefined){
            response.send('Id not found. Is this a new pokemon?');
        }
        obj.pokemon[pokemonId].type = request.body.addType;
        response.send('Added type:' + request.body.addType + '. To ' + obj.pokemon[pokemonId].name +'. Guess you gotta catch some more....');
    jsonfile.writeFile(FILE, obj, (err)=>{
            if(err !== null){
                console.log(err);
            }
        });
    });
})




// root, home path. Retrieves render, handles sorting logic
app.get('/', (request, response) => {
    console.log(request.query.sortby);

    jsonfile.readFile(FILE, (err,obj)=>{
        let pokemonObjList = obj.pokemon;
        if(request.query.sortby == undefined){
            response.render('home', {obj: []});
        }else if(request.query.sortby == 'id') {
            response.render('home', {obj: pokemonObjList});
        }else if(request.query.sortby =='name') {

            let pokemonObjList = obj.pokemon;
            let pokemonListArr =[];
            for(i=0; i<pokemonObjList.length ;i++){
                //creates a new object. for id and name.
                let pokemonListObj = {};
                pokemonListObj.id = obj.pokemon[i].id;
                pokemonListObj.name = obj.pokemon[i].name;
                pokemonListObj.type = obj.pokemon[i].type;
                pokemonListObj.img = obj.pokemon[i].img;
                // pushes object into arr.
                pokemonListArr.push(pokemonListObj);
            }
        //sorts based on alphabet
        pokemonListArr.sort(function(a, b) {
          return a.name.localeCompare(b.name);
        });
        console.log(pokemonListArr);
            response.render('home', {obj: pokemonListArr});
        }
        });
});
app.get('/pokemon/newentry', (request,response)=>{

    response.render('new');
});
//post: stores new pokemon entry
app.post('/pokemon/added', (request,response)=>{

    let postArrReqBody =[];
    postArrReqBody.push(request.body);

    response.render('home', {obj: postArrReqBody});

    jsonfile.readFile(FILE, (err,obj)=>{
        let pokemonEntry = {};

        pokemonEntry.id = request.body.id;
        pokemonEntry.num = parseInt(request.body.num);
        pokemonEntry.name = request.body.name;
        pokemonEntry.img = request.body.img;
        pokemonEntry.height = request.body.height;
        pokemonEntry.weight = request.body.weight;
        pokemonEntry.Type = request.body.type;

        obj.pokemon.push(pokemonEntry);

        jsonfile.writeFile(FILE, obj, (err)=>{
            if(err !== null){
                console.log(err);
            }
        });
    });
})
//set a get /edit to a put /:id &&& ////exposes a put path to change(edit) pokemon details. Put request are Idempotent
app.get('/pokemon/:id/edit', (request,response)=>{

    let arrayIndex = parseInt(request.params.id);
    jsonfile.readFile(FILE, (err, obj)=>{

    let pokemonObjList = obj.pokemon[arrayIndex-1];

    response.render('edit', pokemonObjList);
    });
})
app.put('/pokemon/:id', (request,response)=>{

    let arrayIndex = parseInt( request.params.id );

    jsonfile.readFile(FILE, (err,obj)=>{
    let pokemonObjList = obj.pokemon[arrayIndex-1];

        pokemonObjList.name = request.body.pokeName;
        pokemonObjList.num = request.body.pokeName;
        pokemonObjList.img = request.body.pokeImg;
        pokemonObjList.weight = request.body.pokeWeight;
        pokemonObjList.height = request.body.pokeHeight;
        pokemonObjList.egg = request.body.pokeEgg;

        jsonfile.writeFile(FILE, obj, (err) => {
      console.error(err)
      // response.render('')
      response.send(request.body);
    });
    });
})

//exposes a get path to post a delete request && //picks up on delete request
app.get('/pokemon/:id/delete', (request,response)=>{
    let arrayIndex = parseInt( request.params.id )-1;
    jsonfile.readFile(FILE, (err, obj)=>{

    let pokemonObjList = obj.pokemon[arrayIndex];

    response.render('delete', pokemonObjList);
    });
})
app.delete('/pokemon/:id', (request, response) => {

  let arrayIndex = parseInt( request.params.id );
  console.log("in the delete thinggg: " + arrayIndex);
  jsonfile.readFile(FILE, (err, obj) => {
    obj.pokemon.splice( arrayIndex -1 , 1);

    const changedObj = obj;
    console.log(changedObj);
    jsonfile.writeFile(FILE, changedObj, (err) => {
      console.error(err)
      // response.send(request.body);
      response.render('home', {obj: []});
    });
  });
});


/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));