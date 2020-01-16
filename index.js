const express = require('express');
const jsonfile = require('jsonfile');
const methodOverride = require('method-override')
const reactEngine = require('express-react-views').createEngine();
const FILE = 'pokedex.json';

/**
 * ===================================
 * Configurations and set up
 * ===================================
 */

const app = express();
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

app.use(methodOverride('_method'));
app.engine('jsx', reactEngine);
app.set('views', __dirname + '/views');
app.set('view engine', 'jsx');
/**
 * ===================================
 * Routes
 * ===================================
 */
 app.get('/pokemon/new', (request, response)=>{
response.render("new");
})

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
      response.redirect(301, '/pokemon/new');

    } else {

      response.render('pokemon' , pokemon);
    }
  });
});

app.get('/', (request, response) => {
  response.send("yay");
});


app.post('/pokemon', (request, response) => {
    // console.log(request)
        jsonfile.readFile(FILE, (err, obj) =>{
        var input = {
            id: parseInt(request.body.id),
            num: request.body.num,
            name: request.body.name,
            img: request.body.img,
            height: request.body.height,
            weight: request.body.weight
        };
            // var errorArr = [];
            // var dataerror = {};
            //     for(var i in input){
            //         console.log(i); // alerts key
            //         console.log(input[i]); //alerts key's value
            //         if(input[i] === ''){
            //             errorArr.push(i);
            //         }
            //     }
            //     dataerror = {errorArr}
            //     console.log(dataerror)

      //debug code (output request body)
        console.error(err);
        obj["pokemon"].push(input);
        jsonfile.writeFile(FILE, obj, (err) => {

        });
    response.send(input);
    })
    // body...
})

app.put('/pokemon/:id/edit', (request, response) => {

    const inputId = parseInt(request.params.id) - 1

    console.log("This is the index: " + inputId);
    console.log("name " + request.body.name);
    console.log("img " + request.body.img);
    console.log("height " + request.body.height);
    console.log("weight " + request.body.weight);

    jsonfile.readFile(FILE, (err, obj)=>{

        console.log("reading OBJECTTTTTT" , obj)
        console.log("FIRST ERROROOEROEORE", err)

        obj.pokemon[inputId].name = request.body.name
        obj.pokemon[inputId].img = request.body.img
        obj.pokemon[inputId].height = request.body.height
        obj.pokemon[inputId].weight = request.body.weight

        var object = obj.pokemon[inputId]
        console.log("FINSIHING CHANING", obj)

        jsonfile.writeFile(FILE, obj, (err)=>{

            console.log("Writing file HERERERE: " ,obj)

            console.log("EROEOREREOREOR", err);
            response.render('pokemon' , object)

        })

    })
});


app.get('/pokemon/:id/edit', (request,response) =>{
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
      response.redirect(301, '/pokemon/new');

    } else {
        var data = {
            index:inputId,
            name:pokemon.name,
            img:pokemon.img,
            height:pokemon.height,
            weight:pokemon.weight
            }
        console.log(data);
        response.render('edit' , data)
        }
    });
});

app.delete('/pokemon/:id/delete', (request,response)=> {
    let inputId = parseInt( request.params.id ) - 1;
    jsonfile.readFile(FILE, (err,obj) => {
        console.log("hahshahha" ,obj)
        var remove = obj.pokemon
        remove.splice(inputId, 1)
        jsonfile.writeFile(FILE, obj, (err)=>{
            console.log("delete pokemon HERERERE: " ,obj)

            console.log("EROEOREREOREOR", err);
            response.send(obj)
        })
    })
})

app.get('/pokemon/:id/delete', (request,response) => {
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
      response.redirect(301, '/pokemon/new');

    } else {
        var data = {
            index:inputId,
            name:pokemon.name
            }
        }
        // console.log(data);
        response.render('delete' , data)
   });
});
/*
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));