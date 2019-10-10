const express = require('express');
const jsonfile = require('jsonfile');

const FILE = 'data.json';

// Init express app
const app = express();

// tell your app to use the module
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));


const reactEngine = require('express-react-views').createEngine();
app.engine('jsx', reactEngine);

// this tells express where to look for the view files
app.set('views', __dirname + '/views');

// this line sets react to be the default view engine
app.set('view engine', 'jsx');
/**
 * ===============================================================================================================================================
 * ALL THAT SET UP
 * ===============================================================================================================================================
 */


//ON LOADING LOCALHOST:3000==================================================================================================================
app.get('/', (request, response) => {
  response.send("HI BANANA");
});

/*
====================
====================
    KEVIN'S EDITS
====================
====================
*/
app.get('/pokemon',(req,res)=>{
    jsonfile.readFile(FILE, (err, obj) => {
        const list = obj.pokemon.map((element)=>{
            return element["name"];
        });
        res.send(list);
    })
})
/*
====================
====================
    KEVIN'S EDITS
====================
====================
*/

//ON LOADING LOCALHOST:3000/POKEMON/NEW==================================================================================================================
app.get('/pokemon/new', (request, response) => {
  // render a template form here
  data={
      test:"test"
  }
  response.render('form.jsx',data);
});



//GETTING POKEMON VIA ID NO.==================================================================================================================
app.get('/pokemon/:id', (request, response) => {

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


//POSTING INPUT RESULTS INTO .JSON FILE, DISPLAYING OUTPUT IN /POKEMON======================================================
app.post('/pokemon', function(request, response) {

  //debug code (output request body)
  console.log("OMG there really is another Pokemon!" , request.body);

  // read the request body NOT WORKINGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG
  jsonfile.readFile(FILE, (err,obj) => {
    console.log(err);
    obj.pokemon.push(request.body);


  // save the request body
    jsonfile.writeFile( FILE, obj, (err) => {
      console.error(err);


    });
  });
        // now look inside your json file
        response.send(request.body);
});
/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));