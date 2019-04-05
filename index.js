
const express = require('express');
const jsonfile = require('jsonfile');

// Init express app


const app = express();
 
// const FILE = 'pokedex.json';

// Tell your app to use the module
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

const methodOverride = require('method-override')
app.use(methodOverride('_method'));


const reactEngine = require('express-react-views').createEngine();
app.engine('jsx', reactEngine);

// this tells express where to look for the view files
app.set('views', __dirname + '/views');

// this line sets react to be the default view engine
app.set('view engine', 'jsx');
/**
 * ===================================
 * Routes
 * ===================================
 */

// // Display a list of all pokemon
// app.get('/', (request, response)=>{
//     // response.send("YAY");
//     jsonfile.readFile(FILE, (err, obj)=>{
//         response.send(obj.pokemon);
//     })
// })

// Submit new Pokemon
app.get('/pokemon/:id/edit', (request, response)=>{

  let arrayindex = parseInt(request.params.id);

  jsonfile.readFile('pokedex.json', (err, obj) => {

  response.render(obj.pokemon[1].name);
  console.log(obj.pokemon[1].name);

});
});

//   for (i=0; i<contentsofFile.pokemon.length; i++)
//   if (request.params.id== contentsofFile.pokemon[i].id)
//   response.render(contentsofFile.pokemon[i].name);
//   console.log(contentsofFile.pokemon[1].name)
//   }); 
// });




app.put("/putrequest", (request, response) => {
    console.log(request.body);
    //read the file in and write out to it
    response.send('yes');
});



app.post('/pokemon', function(request, response) {

  //debug code (output request body)
  console.log(request.body.id);

// Coverts a string into a number
request.body.id = parseInt(request.body.id);

// This will read the pokedex.json
jsonfile.readFile(FILE, (err, obj)=>{

// This will push the submitted information into an array
    obj.pokemon.push(request.body)

// This will write to the pokedex.json
    jsonfile.writeFile(FILE, obj, (err) => {
    console.error(err)

    // now look inside your json file
    response.send(request.body);
  });
})

// save the request body

});

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


app.listen(3000,  () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));

