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

// this line below, sets a layout look to your express project
const reactEngine = require('express-react-views').createEngine();
app.engine('jsx', reactEngine);

// this tells express where to look for the view files
app.set('views', __dirname + '/views');

// this line sets react to be the default view engine
app.set('view engine', 'jsx');

// tell your app to use the module
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

// Set up method-override for PUT and DELETE forms
const methodOverride = require('method-override');

app.use(methodOverride('_method'));

//function
var idIndex = (id, obj)=>{
    let pokemon;
    let pokemonIndex;

    console.log(pokemonIndex);
    for( let i=0; i<obj.pokemon.length; i++ ){
      let currentPokemon = obj.pokemon[i];
      if( currentPokemon.id === id){
        pokemon = currentPokemon;
        pokemonIndex=i;
      }
    }
        return pokemonIndex;
}
const sort = (request,response)=>{
    jsonfile.readFile(file, (err,obj)=>{
        let pokemonElements = obj.pokemon;
        let sortType = request.params.sort;
        let property;
        if(sortType === "sortByName"){
            property = "name";
        }else if(sortType === "sortByNum"){
            property = "num";
        }
        else{
            property = "id";
        }
            pokemonElements.sort(function(a, b){
                return a[property] == b[property] ? 0 : +(a[property] > b[property]) || -1;
            });
        const data ={
            pokemonList : pokemonElements,
        }
         response.render("Home",data);
    });
}
const edit = (request,response)=>{
     jsonfile.readFile(file, (err,obj)=>{
        let pokemonIndex = parseInt(request.params.id);
        if(idIndex(pokemonIndex, obj)!== undefined){
            pokemonIndex = idIndex(pokemonIndex, obj);
            let currentPokemon = obj.pokemon[pokemonIndex];
        response.render("Edit",currentPokemon);}
        else{
            response.send('Index does not exist');
        }
    });
}
const showPokemon = (request,response)=>{
     jsonfile.readFile(file, (err,obj)=>{
        let pokemonIndex = parseInt(request.params.id);
        if(idIndex(pokemonIndex, obj)!== undefined){
            console.log("Show pokemon");
            pokemonIndex = idIndex(pokemonIndex, obj);
            let currentPokemon = obj.pokemon[pokemonIndex];

        response.render("showPokemon",currentPokemon);}
        else{
            response.send('Index does not exist');
        }
    });
}
const writeEdit = (request,response)=>{
    jsonfile.readFile(file, (err,obj)=>{
        let pokemonIndex = parseInt(request.params.id);
        pokemonIndex= idIndex(pokemonIndex, obj);
        let contents = request.body;
        obj.pokemon[pokemonIndex].name = contents.name;
        obj.pokemon[pokemonIndex].id = parseInt(contents.id);
        obj.pokemon[pokemonIndex].num = contents.num;
        obj.pokemon[pokemonIndex].weight = contents.weight;
        obj.pokemon[pokemonIndex].height = contents.height;
        console.log("In write edit");
    jsonfile.writeFile(file, obj, (err) => {
      console.error(err);
            response.render("Home");
        });
    });
}

const DELETE = (request,response)=>{
  let pokemonIndex = parseInt(request.params.id);
  jsonfile.readFile(file, (err, obj) => {
    pokemonIndex = idIndex(pokemonIndex, obj);
    obj.pokemon.splice(pokemonIndex, 1);
    jsonfile.writeFile(file, obj, (err) => {
      console.error(err);
      response.send('DELETED');
    });
  });
}
const showDeletePokemon = (request, response)=>{
    let pokemonIndex = parseInt(request.params.id);
      jsonfile.readFile(file, (err, obj) => {
        if(idIndex(pokemonIndex,obj)!== undefined){
            pokemonIndex = idIndex(pokemonIndex,obj);
        let pokemon = obj.pokemon[pokemonIndex];
        response.render("deletePokemon", pokemon);
    }else{
        response.send("Pokemon does not exist");
    }
  });
}
const add = (request, response)=>{
    let alreadyExist = false;
    console.log("posting");
    jsonfile.readFile(file, (err, obj) => {
     if( err ){
       console.log("error with json read file:",err);
       response.status(503).send("error reading file");
       return;
      }
        let id = parseInt(request.body.id);
        let name = request.body.name;
        console.log("reading file");
        if(isNaN(id)|| name ==="" || idIndex(id, obj)!== undefined)
        {
            let currentError = isNaN(id)?" Please enter a valid ID.":"";
            currentError += idIndex(id, obj)!== undefined?"ID already exist!":"";
            currentError+= name===""? " Please enter valid name.": "";
            console.log(currentError);
                const data ={
            classDisplay: "alert alert-danger",
            errorMsg: currentError}

        response.render("addForm",data);
        }
      else{
        let newPokemon = request.body;
        newPokemon.id = id;
        obj.pokemon.push(newPokemon);
    jsonfile.writeFile(file , obj, (err) => {
      console.error(err);
    });
        console.log("Done reading");
        response.send("Added");
    }
    });
}
/**
 * ===================================
 * Routes
 * ===================================
 */
 //home
app.get('/pokemon/home/:sort',sort);
app.get('/pokemon/home/pokemon/:id',showPokemon);
 //edit pokemon
app.get('/pokemon/:id/edit',edit);
app.put('/pokemon/:id',writeEdit);
app.get('/pokemon/:id/delete', showDeletePokemon)
app.get('/pokemon/new', (request,response) => {
    console.log("sending add form");
    response.render("addForm");
});

app.delete('/pokemon/:id',DELETE);
app.get('/pokemon',(request,response)=>{
    jsonfile.readFile(file, (err,obj)=>{
        const data ={
            pokemonList : obj.pokemon,
        }
     response.render("Home", data);
    });
})
app.post('/pokemon',add);

/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));