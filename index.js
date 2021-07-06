/**
 * ===================================
 * Configurations and set up
 * ===================================
 */

const express = require('express');
const jsonfile = require('jsonfile');
const app = express();
const FILE = 'pokedex.json';

const reactEngine = require('express-react-views').createEngine();
app.engine('jsx', reactEngine);

// this tells express where to look for the view files
app.set('views', __dirname + '/views');

// this line sets react to be the default view engine
app.set('view engine', 'jsx');

// for request.body to work
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

// Set up method-override for PUT and DELETE forms
const methodOverride = require('method-override')
app.use(methodOverride('_method'));

/**
 * ===================================
 * Routes
 * ===================================
 */

const display = (request, response) => {
    let invalid = false;
    let info = request.body
    let data = {
    "height": info.height,
    "id": parseInt(info.id),
    "img": info.img,
    "weight": info.weight,
    "num": info.num,
    "name": info.name
    }

    for(let i = 0; i < Object.keys(info).length; i++){
        if (Object.values(info)[i] === "" || isNaN(Object.values(data)[i]) === true){
            invalid = true;
        }
    };

    jsonfile.readFile('pokedex.json', (err,obj) => {
        if(invalid === true){
            response.render('form')
        } else{
            obj.pokemon.push(data)
            response.send("worked!")
            console.log(data);
            jsonfile.writeFile('pokedex.json', obj, (err) => {
            });
        }
    });
}

const form = (request,response) => {
    response.render('form')
}

const edit = (request,response) => {
    jsonfile.readFile(FILE, (err,obj) => {
        console.log(obj.pokemon);
        let data = {
        id: request.params.id,
        pokemon: obj.pokemon
        }
    response.render('edit',data)
    })
}

const editPage = (request,response) => {
    let id = request.params.id;
    jsonfile.readFile(FILE, (err, obj) => {

      let pokemonId = request.body.id;
      let pokemonName = request.body.name;
      let pokemonNum = request.body.num;
      let pokemonImg = request.body.img;
      let pokemonWeight = request.body.weight;
      let pokemonHeight = request.body.height;

      obj.pokemon[id].id = parseInt(pokemonId);
      obj.pokemon[id].name = pokemonName;
      obj.pokemon[id].num = pokemonNum;
      obj.pokemon[id].img = pokemonImg;
      obj.pokemon[id].weight = pokemonWeight;
      obj.pokemon[id].height = pokemonHeight;

      jsonfile.writeFile(FILE, obj, (err) => {
      console.error(err)
      response.send('works');
    });
  });
}

const del = (request,response) =>{
    response.render("delete")
}

app.post('/pokemon', display);

app.get('/pokemon/:id/delete', del);

app.get('/pokemon/new', form);

app.get('/pokemon/:id/edit', edit);

app.put('/pokemon/:id', editPage);

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
      response.status(404);
      response.send("not found");
    } else {
      response.send(pokemon);
    }
  });
});

app.get('/pokemon/?', (request,response) => {
const sortBy = request.query.sortby;
  jsonfile.readFile(FILE, (err, obj) => {
    let pokemonByName = [];
    let sortAll = [];
    let listOfPokemon = obj.pokemon;

    if (sortBy === "name") {
      for (i = 0; i < listOfPokemon.length; i++) {
        let currentPokemon = listOfPokemon[i].name;
        pokemonByName.push(currentPokemon);
        //console.log(currentPokemon);
      }
      let data = {
        name: pokemonByName.sort()
      }
      response.send(data);
    }
  });
})

app.get('/', (request, response) => {
  response.render('home');
});

/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));