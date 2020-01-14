const express = require('express');
const jsonfile = require('jsonfile');

// Init express app
const app = express();
const FILE = 'pokedex.json';

/**
 * ===================================
 * Configurations and set up
 * ===================================
 */

// tell your app to use the module
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

// this line below, sets a layout look to your express project
const reactEngine = require('express-react-views').createEngine();
app.engine('jsx', reactEngine);

// this tells express where to look for the view files
app.set('views', __dirname + '/views');

// this line sets react to be the default view engine
app.set('view engine', 'jsx');

/**
 * ===================================
 * Functions
 * ===================================
 */


/**
 * ===================================
 * Routes
 * ===================================
 */

app.get('/pokemon/new', (request, response) => {
  // id, num, name, img, height, weight
  response.render("form");
});

app.get('/pokemon', (request,response) => {
  console.log("hello");
  //obj.pokemon.push(data);
  jsonfile.readFile(FILE, (err, obj) => {
    let allPokemon = [];
    let listOfPokemon = obj.pokemon;
    for (i = 0; i < listOfPokemon.length; i++) {
      let currentPokemon = listOfPokemon[i].name;
      allPokemon.push(currentPokemon);
      //console.log(currentPokemon);
    }

    let data = {
      name: allPokemon
    }

    response.render('all', data);
  });
});

app.get('/pokemon/?', (request,response) => {
  const sortBy = request.query.sortby;

  jsonfile.readFile(FILE, (err, obj) => {
    let allPokemonByName = [];
    let allPokemonByWeight = [];
    let allPokemonByHeight = [];
    let sortAll = [];
    let listOfPokemon = obj.pokemon;
    console.log(sortBy);

    if (sortBy === "weight") {
      for (i = 0; i < listOfPokemon.length; i++) {
        let currentPokemonWeight = listOfPokemon[i].weight;
        let currentPokemon = listOfPokemon[i].name;
        sortAll.push({
          name: currentPokemon,
          weight: currentPokemonWeight
        })
      }
      sortAll.sort((a,b) => {
        return parseFloat(a.weight)-parseFloat(b.weight);
      });
      for (let i = 0; i < sortAll.length; i++) {
        allPokemonByWeight.push(sortAll[i].name + " " + sortAll[i].weight);
      }
      let data = {
        name: allPokemonByWeight
      }
      response.render('all', data);
    } else if (sortBy === "name") {
      for (i = 0; i < listOfPokemon.length; i++) {
        let currentPokemon = listOfPokemon[i].name;
        allPokemonByName.push(currentPokemon);
        //console.log(currentPokemon);
      }
      let data = {
        name: allPokemonByName.sort()
      }
      console.log(data);
      response.render('all', data);
    } else if (sortBy === "height") {
      for (i = 0; i < listOfPokemon.length; i++) {
        let currentPokemonHeight = listOfPokemon[i].height;
        let currentPokemon = listOfPokemon[i].name;
        sortAll.push({
          name: currentPokemon,
          height: currentPokemonHeight
        })
      }
      sortAll.sort((a,b) => {
        return parseFloat(a.height)-parseFloat(b.height);
      });
      for (let i = 0; i < sortAll.length; i++) {
        allPokemonByHeight.push(sortAll[i].name + " " + sortAll[i].height);
      }
      let data = {
        name: allPokemonByHeight
      }
      response.render('all', data);
    }
  });
});

app.post('/pokemon', (request,response) => {
  let newPokemonName = request.body.name;
  let newPokemonId = parseInt(request.body.id);
  let newPokemonNum = parseInt(request.body.num);
  let newPokemonImgUrl = request.body.img;
  let newPokemonHeight = request.body.height;
  let newPokemonWeight = request.body.weight;
  let data = {
    "id": newPokemonId,
    "num": newPokemonNum,
    "name": newPokemonName,
    "img": newPokemonImgUrl,
    "height": newPokemonHeight,
    "weight": newPokemonWeight,
  }

  jsonfile.readFile(FILE, (err, obj) => {
    // save the request body

    if (newPokemonName === "") {
      console.log("WRONG")
      response.redirect(301, '/pokemon/new');
      return false;
    }

    jsonfile.writeFile(FILE, obj, err => {
      console.error(err)
      // now look inside your json file
      // response.send(request.body);
      response.send('WOW WORKSS!!!');
    });
  });
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
      let data = {
        "id": currentPokemon.id,
        "num": currentPokemon.num,
        "name": currentPokemon.name,
        "img": currentPokemon.img,
        "height": currentPokemon.height,
        "weight": currentPokemon.weight,
      }

      if( currentPokemon.id === inputId ){
        pokemon = currentPokemon;
        response.render('pokemon', data);
      }
    }

    if (pokemon === undefined) {
      // send 404 back
      response.status(404);
      response.send("not found");
    } else {

      //response.send(pokemon);
    }
  });
});

app.get('/', (request, response) => {
  //response.send("yay");
  response.render("home");
});

/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));
