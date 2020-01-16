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
// tell your app to use the module
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

// Init Method-Override for PUT and DELETE
const methodOverride = require('method-override')
app.use(methodOverride('_method'));

// Init REACT
const reactEngine = require('express-react-views').createEngine();
app.engine('jsx', reactEngine);
// this tells express where to look for the view files
app.set('views', __dirname + '/views');
// this line sets react to be the default view engine
app.set('view engine', 'jsx');

//Check if a string only contains alphanumeric characters
//$ npm install --save is-alphanumeric
var isAlphanumeric = require('is-alphanumeric');

/**
 * ===================================
 * Routes
 * ===================================
 */

app.post('/pokemon', (request, response) => {
    console.log('Received POST');
    console.log(request.body);
    const newPokemon = {
        id: request.body.id,
        num: request.body.num,
        name: request.body.name,
        img: request.body.img,
        height: request.body.height,
        weight: request.body.weight
    }

    jsonfile.readFile(file, (err, obj) => {

        // check to make sure the file was properly read
        if (err) {

            console.log("There is an error :", err);
            response.status(503).send("error reading file");
            return;
        }

        obj.pokemon.push(newPokemon);

        jsonfile.writeFile(file, obj, (err) => {
            if (err) console.log(err);
            console.log('Manage to add ' + newPokemon);
            response.send('Hey you added new pokemon ' + newPokemon.name);
            return;
        })
    })
})

app.get('/pokemon/new', (request, response) => {

  let myForm = '<html><form method="POST" action="/pokemon">ID:<input type="text" name="id"><br>Number:<input type="text" name="num"><br>Name:<input type="text" name="name"><br>Image:<input type="text" name="img"><br>Height:<input type="text" name="height"><br>Weight:<input type="text" name="weight"><br><input type="submit" value="Submit"></form></html>';

  response.send(myForm);

});

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

// add the ability to edit the data for a given pokemon
// install react templates for your app
// add a form at the path: /pokemon/:id/edit
// add each field as an input and pre-populate the current data for that pokemon
// the form should make a request ( the form action ) to the correct route ( a PUT request to /pokemon/:id )


app.get('/pokemon/:id/edit', (request, response) => {

  let pokemonIndex = request.params.id;

  jsonfile.readFile(file, (err, obj) => {

    console.log(obj);
    let currentPokemon = obj.pokemon[pokemonIndex];
    const data = {
      indexPokemon: currentPokemon,
    };
    response.render('edit', data);
  })
});

app.put('/pokemon/:id',(request, response)=>{
  console.log("request body WEWEWRWEWRWEWRWEW");

  console.log(request.body);

  let pokemonIndex = request.params.id;
  response.send('hey put '+request.params.id);

  jsonfile.readFile(file, (err, obj) => {
    // save the request body
    let file = request.body;

    obj.pokemon[pokemonIndex] = request.body;

    jsonfile.writeFile(file, obj, (err) => {
      console.error(err)

      // now look inside your json file
      // response.send(request.body);
      response.send('WOW WORKSS!!!');
    });
  });

})


// app.delete('/fruits/:id',(request, response)=>{
//   // response.send("FHJHFHJHJHF");

//   let fruitsIndex = request.params.id;
//   // response.send('hey put '+request.params.id);


//   jsonfile.readFile(file, (err, obj) => {
//     // save the request body

//     let contents = request.body.stuff;

//     // obj.fruits.push( contents );
//     // obj.fruits[fruitsIndex] = contents;
//     obj.fruits.splice(fruitsIndex, 1);

//     jsonfile.writeFile('data.json', obj, (err) => {
//       console.error(err)

//       // now look inside your json file
//       // response.send(request.body);
//       response.send('WOW WORKSS!!!');
//     });
//   });


// });

// app.get('*', (request, response) => {
//   response.send("Nothing here!");
// });

/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));