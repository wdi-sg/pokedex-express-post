const express = require('express');
const jsonfile = require('jsonfile');

const file = 'pokedex.json';

/**
 * ===================================
 * Configurations and set up
 * ===================================
 */

// Init and set up of express app
const app = express();
const reactEngine = require('express-react-views').createEngine();
app.engine('jsx', reactEngine);
app.set('views', __dirname + '/views');
app.set('view engine', 'jsx');
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

/**
 * ===================================
 * Routes
 * ===================================
 */

app.get("/pokemon/new", (request, response) =>{
    response.render('new-pokemon-form');
});

app.get('/pokemon/:id', (request, response) => {

  // get json from specified file
  jsonfile.readFile(file, (err, obj) => {

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

app.post("/pokemon",(request, response) => {
        jsonfile.readFile(file,(err,obj) => {
            console.log("error of readfile is: =============");
            console.log(err);

            const addNewPoke = {
                id: parseInt(request.body.id),
                num: request.body.num,
                name: request.body.name,
                img: request.body.img,
                height: request.body.height,
                weight: request.body.weight
            }
            obj.pokemon.push(addNewPoke);

            jsonfile.writeFile(file, obj, (err)=>{
            console.log("error of writefile is: ==========")
            console.log(err);
            console.log(obj.pokemon);
        })
            /*
            {
              "id": 1,
              "num": "001",
              "name": "Bulbasaur",
              "img": "http://www.serebii.net/pokemongo/pokemon/001.png",
              "height": "0.71 m",
              "weight": "6.9 kg",
              "candy": "Bulbasaur Candy",
              "candy_count": "25",
              "egg": "2 km",
              "avg_spawns": "69",
              "spawn_time": "20:00"
            },
            */
            // jsonfile.writeFile('file', obj, (err)=>{
            // console.log("error of writefile is: ==========")
            // console.log(err);
            // console.log(obj);
            // })
        });
});

// Setting up the route to render a separete site for input details


app.get('/', (request, response) => {
  response.send("yay");
});

/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));