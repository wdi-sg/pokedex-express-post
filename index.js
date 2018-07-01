const express = require('express');
const jsonfile = require('jsonfile');
// this line below, sets a layout look to your express project
const reactEngine = require('express-react-views').createEngine();

// const methodOverride = require('method-override');





const FILE = 'pokedex.json';

/**
 * ===================================
 * Configurations and set up
 * ===================================
 */

// Init express app
const app = express();

// Set up express middleware: functions that are run before your handler functions for each end point are actually called
app.use(express.json()); // Allows express to parse json input
app.use(express.urlencoded({extended: true})) // Allows express to parse form data into request.body
// app.use(express.static('./public'))
app.engine('jsx', reactEngine);
// this tells express where to look for the view files
app.set('views', __dirname + '/views');
// this line sets react to be the default view engine
app.set('view engine', 'jsx');
app.use(express.static('public'));

/**
 * ===================================
 * Routes
 * ===================================
 */

app.get('/whee', (req, res) => {
  // running this will let express to run home.handlebars file in your views folder
  res.render('form');
})


app.get('/:id', (request, response) => {
  // get json from specified file
  jsonfile.readFile(FILE, (err, obj) => {
    // obj is the object from the pokedex json file
    // extract input data from request
    let inputId = request.params.id;

    // find pokemon by id from the pokedex json file
    // (note: find() is a built-in method of JavaScript arrays)
    let pokemon = obj.pokemon.find((currentPokemon) => {
      return currentPokemon.id === parseInt(inputId, 10);
    });

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



app.get('/pokemon/new', (request, response) => {
  let form = '<form method="POST" action="/pokemon">'
  //id
  let idText = 'Id:<br>'
  let idBox = '<input type="text" name="id" value="001"><br>'
  //num
  let numText = 'num:<br>'
  let numBox = '<input type="text" name="num" value="001"><br>'
  //name
  let nameText = 'First name:<br>'
  let nameBox = '<input type="text" name="name" value="Pikachu"><br>'
  //img
  let imgText = 'Img:<br>'
  let imgBox = '<input type="text" name="img" value=""><br>'
  //height
  let heightText = 'Height:<br>'
  let heightBox = '<input type="text" name="height" value=""><br>'
  //weight
  let weightText = 'Weight:<br>'
  let weightBox = '<input type="text" name="weight" value=""><br>'
  //submit
  let submit = '<br><br><input type="submit" value="Submit">'
  
  //adding everything up
  form = form + idText + idBox + numText + numBox + nameText + nameBox + imgText + imgBox + heightText + heightBox + weightText + weightBox + submit + '</form>'

  response.render('form');
});



app.post('/pokemon', (request, response) => {
  let num = request.body.num;
  let name = request.body.name;
  let img = request.body.img;
  let height = request.body.height;
  let weight = request.body.weight;

  let queryString = 'INSERT INTO pokemons (num, name, img, height, weight) VALUES ($1, $2, $3, $4, $5)';
  let values = [num, name, img, height, weight];

  response.send(request.body);
})

/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));
