const express = require('express');
const jsonfile = require('jsonfile');

const file = 'pokedex.json';


const app = express();

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

const reactEngine = require('express-react-views').createEngine();
app.engine('jsx', reactEngine);
app.set('views', __dirname + '/views');
app.set('view engine', 'jsx');

app.get('/', (req, res) => {
    const data = {
        welcome: "Welcome to my Pokedex"
    }
    res.render('home', data)
})



app.get('/pokemon', (request, response) => {
  response.send("yay");
});


app.post('/pokemon', (req, res) => {
jsonfile.readFile(file, (err, obj) => {
    console.log(obj)
    console.log(obj.pokemon.length);
    const pokemonObj = obj.pokemon;

    const {id, num, name, img, height, weight} = req.body;
    //const id = req.body.id
    //const num = req.body.num
    //const name = req.body.name
    let pokemon = {id, num, name, img, height, weight};
    //let pokemon = {id: id, num: num, name: name}
    res.send("WORKING");
    let addPokemon = JSON.stringify(pokemon);
    pokemonObj.push(pokemon);

    jsonfile.writeFile(file, obj, (err) => {
        console.log(err);
    })
})
})

app.get('/pokemon/new', (req, res) => {
    res.send(`<form method="POST" action="/pokemon">
 <label for="id">Id:</label>
  <input type="text" name="id" value="hello"><br></br>

  <label for="num">Num:</label>
  <input type="text" name="num"><br></br>

  <label for="name">Name:</label>
  <input type="text" name="name"><br></br>

  <label for="img">Img:</label>
  <input type="text" name="img"><br></br>

  <label for="height">Height:</label>
  <input type="text" name="height"><br></br>

  <label for="weight">Weight:</label>
  <input type="text" name="weight"><br></br>

  <button type="submit" value="Submit">Submit</button>
</form>`)
})

app.get('/pokemon/:id', (request, response) => {


  jsonfile.readFile(file, (err, obj) => {
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




app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));