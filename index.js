const express = require('express');
const jsonfile = require('jsonfile');
const FILE = 'pokedex.json';

// *
//  * ===================================
//  * Configurations and set up
//  * ===================================

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

//Form to create new pokemon
app.get('/pokemon/new', (request, response) => {
  console.log("getting form");

  let form = '';
  form = '<html>' +
    '<body>'+
    '<h1>Pokedex Form</h1>'+
    '<form method="POST" action="new">'+
    '<p>id</p><input name="id"/>'+
    '<p>num</p><input name="num"/>'+
    '<p>name</p><input name="name"/>'+
    '<p>img</p><input name="img"/>'+
    '<p>height</p><input name="height"/>'+
    '<p>weight</p><input name="weight"/>'+
    '<input type="submit"/>'+
    '</form>'+
    '</body>'+
    '</html>';
  response.send(form);
});

//Posting function to push the new "Pokemon" to pokedex.json
app.post('/pokemon/new/', (request,response) => {
  console.log("posting inside form");
  var newPokemon = request.body;
  console.log( newPokemon );

  // save in data file
  jsonfile.readFile(FILE, (err, obj) => {
    if( err ){
      console.log("error reading file");
      console.log(err)
    }

    // console.log("what i currently have");
    // console.log(obj.pokemon);

    // save data
    obj.pokemon.push(newPokemon);
    // obj[key] = value;

    jsonfile.writeFile(FILE, obj, (err) => {
      if( err ){
        console.log("error writing file");
        console.log(err)
      }

      console.log( "Send response");
      response.send("Your Pokemon has been received");
    });
  });

});

//Root of directory. Displays all the pokemon/ Button to sort all the pokemon.
app.get('/pokemon/pokedex', (request, response) => {

    let form = '';
    form = '<html>' +
    '<body>'+
    '<h1>Pokedex Sorter</h1>'+
    '<form method="POST" action="new">'+
    '<input type="submit"/>'+
    '</form>'+
    '</body>'+
    '</html>';

  // get data from the file
    jsonfile.readFile(FILE, ( err, obj ) => {

        var array = [];
        var str = '<ul>';

        for (let i = 0; i < obj['pokemon'].length; i++) {

            array.push(obj['pokemon'][i].name);

        }

            array.forEach(function(poke) {

                str += '<li>'+ poke + '</li>';

                // console.log(array);
                // console.log(str);
            });

            str += '</ul>';
            // console.log(array);

        // console.log(str);
      response.send("Here are all the pokemon" + str);
    })
});

//Further 2: Button to sort all the pokemon.
app.get('/', (request, response) => {
  //response.send("yay");
    console.log("getting form");
    let form = '';
    form = '<form method = "get" action = "/" >' +
    '<input type="submit" name="sortby" value="name">' +
    '</form>';

    if (request.query.sortby === 'name'){
        console.log("sorting names");
    jsonfile.readFile(FILE, (err, obj) => {
        if( err ){
            console.log("error reading file");
            console.log(err)
        } else {

after the else, do the sorting, and output
then } }) }else { then whatever you had originally


//Other Stuff. No need to edit.
app.get('/', (request, response) => {
  response.send("yay");
});

/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));
