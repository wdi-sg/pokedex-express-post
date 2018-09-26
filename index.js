const express = require('express');
const jsonfile = require('jsonfile');

const FILE = 'pokedex.json';

const app = express();

// ENCODING STUFF
app.use(express.json());
app.use(express.urlencoded({
  extended: true,
}));

// REACT
// this line below, sets a layout look to your express project
const reactEngine = require('express-react-views').createEngine();
app.engine('jsx', reactEngine);

// this tells express where to look for the view files
app.set('views', __dirname + '/views');

// this line sets react to be the default view engine
app.set('view engine', 'jsx');

app.get('/', (req, res) => {
  if (req.query.sortby === 'name') {
    jsonfile.readFile(FILE, (readErr, obj) => {
      res.render('select-name', obj);
    })
  } else if (!res.headersSent)
    res.render('home');
});

// NEW STUFF
app.get('/pokemon/new', (req, res) => {
  let content = '<html><head>';
  content += '<style> body{font-family:monospace; margin: 0 auto; width: 500px; text-align:center;} h1{font-size:10vw; padding-bottom:0; margin-bottom:0;} h3{font-size:25px; margin-top:0px;} input{display:block; height:50px; width:100%; margin:5px; font-size:20px;} input[type=submit]{background:red; color:white; font-weight: bold;}div{}';
  content += '</style></head><body><div>';
  content += '<h1>Pokedex</h1>';
  content += '<h3>Add New Pokemon</h3>';
  content += '<form method="POST" action="/pokemon" autocomplete="off">';
  content += '<input type="number" name="id" placeholder="Enter ID here.">';
  content += '<input type="text" name="num" placeholder="Enter number here.">';
  content += '<input type="text" name="name" placeholder="Enter name here.">';
  content += '<input type="text" name="img" placeholder="Enter image link here.">';
  content += '<input type="text" name="height" placeholder="Enter height in meters here.">';
  content += '<input type="text" name="weight" placeholder="Enter weight in meters here.">';
  content += '<input type="submit" value="Submit">';
  content += '</form></div></body></html>';
  res.send(content);
});

app.post('/pokemon', (req, res) => {
  const data = req.body;
  jsonfile.readFile(FILE, (readErr, obj) => {
    if (readErr) res.send(readErr);
    else {
      const pokedex = obj;
      pokedex.pokemon.push(data);

      jsonfile.writeFile(FILE, pokedex, (writeErr) => {
        if (writeErr) res.send(writeErr);
        else {
          res.send('Thank You & Come again.');
        }
      });
    }
  });
});

// STOCK STUFF
app.get('/:id', (request, response) => {
  // get json from specified file
  jsonfile.readFile(FILE, (err, obj) => {
    // obj is the object from the pokedex json file
    // extract input data from request
    const inputId = parseInt(request.params.id, 10);

    let pokemon;

    // find pokemon by id from the pokedex json file
    for (let i = 0; i < obj.pokemon.length; i++) {
      const currentPokemon = obj.pokemon[i];

      if (currentPokemon.id === inputId) {
        pokemon = currentPokemon;
      }
    }

    if (pokemon === undefined) {
      // send 404 back
      response.status(404);
      response.send('not found');
    } else {
      response.send(pokemon);
    }
  });
});



app.listen(3000);
