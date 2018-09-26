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
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
// *
//  * ===================================
 // app.use('/', express.static(__dirname + '/public'));
 // * ===================================


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

app.get('/', (request, response) => {
  response.send("yay");
});
//form post from user
app.post('/pokemon', function(request, response) {

    let myObj = {
            id: parseInt(request.body["id"]),
            num: request.body['num'],
            name: request.body['name'],
            img: request.body['img'],
            height: request.body['height'],
            weight: request.body['weight'],
        }
        console.log("myObj",myObj);

    jsonfile.readFile(FILE, (err, obj) => {
        //bring in the file
        // let testfile = 'data.json';

        obj["pokemon"].push(myObj);
        //debug code (output request body)
       // console.log(request.body);


        // save the request body
  jsonfile.writeFile('pokedex.json', /*the pokedex obj*/obj, (err) => {
    console.error(err)

    // now look inside your json file
    //response.send is like a console.log
    response.send(myObj);//change to the var myObj
        });
    });
});
//form get info from user
app.get('/pokemon/new', (request, response) => {


    let html = "<html>";
    // html += '<head><link rel="stylesheet" href="public/main.css"></head>'
    html += "<body>";
    html += '<form name="myPokemon" method="POST" action="/pokemon">';
    html += "<h2>Creat A New Pokemon:</h2>";
    html += 'ID: <input type="text" name="id"></br>';
    html += 'Num: <input type="text" name="num"></br>';
    html += 'Name: <input type="text" name="name"></br>';
    html += 'Upload Image: <input type="file" name="img"></br>';
    html += 'Height: <input type="text" name="height"></br>';
    html += 'Weight: <input type="text" name="weight"></br>';
    html += '<input type="submit" value="Submit">';
    html += "</form>";
    html += "</body>";
    html += "</html>";

    response.send( html );

  // render a template form here
  //response.send("hello world");
});
/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));
