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


//function
var idExist = (id, obj)=>{

    let pokemon;
    for( let i=0; i<obj.pokemon.length; i++ ){

      let currentPokemon = obj.pokemon[i];

      if( currentPokemon.id === id){
        pokemon = currentPokemon;
      }
    }

    if (pokemon === undefined) {
        return false;
    } else {
        return true;
    }
}
/**
 * ===================================
 * Routes
 * ===================================
 */

app.post('/pokemon',(request, response)=>{
    let alreadyExist = false;
    console.log("posting");
    jsonfile.readFile(file, (err, obj) => {
        let id = parseInt(request.body.id);
        let name = request.body.name;
        console.log("reading file");
        if((isNaN(id) || id === "")|| name !=="")
        {
            let errorType = "";
            if(isNaN(id)){
                errorType = 2;
            }else{
                errorType = 3;
            }
            let newPath = "pokemon/new/"+ errorType;
            response.redirect(newPath);
        }
      else if(idExist(id, obj)===false){
        let newPokemon = request.body;
        newPokemon.id = id;
        obj.pokemon.push(newPokemon);
    console.log(request.body);
    jsonfile.writeFile(file , obj, (err) => {
      console.error(err);
    });
    console.log("Done reading");
    response.send("Added");
    }else{
        let newPath = "pokemon/new/"+ 1;
        response.redirect(newPath);
    }
});
});

app.get('/pokemon/new/:error',(request,response) => {
    console.log("sending error");
    let errorType = parseInt(request.params.error);
    let currentError = request.params.error;
    if(errorType === 1){
        currentError = "Please enter a different ID number. It already exist!";
    }else{
        let missingInput = "";
        if(errorType === 2){
            missingInput = "id"
        }else if(errorType === 3){
            missingInput = "name"
        }
        currentError = "Please enter the "+missingInput+"!";
    }
    const data ={
            classDisplay: "alert alert-danger",
            errorMsg: currentError
        }
    response.render("addForm", data);
});


app.get('/pokemon/new', (request,response) => {
    console.log("sending form");
    response.render("addForm");
});
/*
app.get('/pokemon/:id', (request, response) => {

  // get json from specified file
  jsonfile.readFile(file, (err, obj) => {

    // check to make sure the file was properly read
    if( err ){

      console.log("error with json read file:",err);
      response.status(503).send("error reading file");
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
*/
/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));