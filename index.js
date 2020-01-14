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



/**
 * ===================================
 * Routes
 * ===================================
 */


/*app.post('/pokemon', function(request, response) {

  //debug code (output request body)
  console.log(request.body);


  // save the request body
  jsonfile.writeFile('data.json', request.body, (err) => {
    console.error(err)

    // now look inside your json file
    response.send(request.body);
  });
});*/



app.get('/pokemon/new', (request, response) => {

  // get json from specified file
  jsonfile.readFile(FILE, (err, obj) => {

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

app.get('/', (request, response) => {
  response.send("yay");
});


// Deliverables:
// Expose a new endpoint that intercepts GET requests to /pokemon/new, which responds with a HTML page with a form that has these fields: id, num, name, img, height, and weight
//Point the form to submit data to the (/pokemon) route using POST method



/*app.get('/pokemon/', (request, response) => {

  let myForm  ='<form method="POST" action="/pokemon">id:<input type="text" name="name"><br/>num:<input type="text" name="name"><br/>name:<input type="text" name="name"><br/>img:<input type="text" name="name"><br/>height:<input type="text" name="name"><br/>weight:<input type="text" name="name"></br><input type="submit" value="Submit"></form>';

  response.send(myForm);

});*/



// Expose a new endpoint that accepts POST requests to /pokemon, which parses the form data and saves the new pokemon data into pokedex.json


/*app.post('/pokemon', (request, response)=>{
  console.log("HEY POST REQUEST", request.body)
  console.log('*******');

  jsonfile.readFile(file, (err, obj) => {
    // save the request body

    let contents = request.body.stuff;

    obj.pokemon.push( contents );

    jsonfile.writeFile('/pokedex.json', obj, (err) => {
      console.error(err)

      // now look inside your json file
      // response.send(request.body);
      response.send('WOW WORKSS!!!');
    });
  });
})*/



app.post('/pokemon/', (request, response) => {
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

    jsonfile.readFile(FILE, (err, obj) => {

        // check to make sure the file was properly read
        if (err) {

            console.log("There is an error", err);
            response.status(503).send("Error");
            return;
        }

        obj.pokemon.push(newPokemon);

        jsonfile.writeFile(FILE, obj, (err) => {
            if (err) console.log(err);
            console.log('New ' + newPokemon);
            response.send('The following pokemon related information has been added: ' + newPokemon.name);
            return;
        })
    })
})


app.get('/pokemon/', (request, response) => {

  let myForm  ='<form method="POST" action="/pokemon">id:<input type="text" name="id"><br/>num:<input type="text" name="num"><br/>name:<input type="text" name="name"><br/>img:<input type="text" name="img"><br/>height:<input type="text" name="height"><br/>weight:<input type="text" name="weight"></br><input type="submit" value="Submit"></form>';

  response.send(myForm);

});








/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));
