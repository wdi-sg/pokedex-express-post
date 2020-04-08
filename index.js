// Load modules and set up
const express = require('express');
const jsonfile = require('jsonfile');
const FILE = 'pokedex.json';

// load a cache copy
// update only when needed
// then write it to file
let filePromise = jsonfile.readFile(FILE);
let pokedex;
filePromise
  .then((obj) => pokedex = obj.pokemon)
  .catch((err) => console.error(err));

// init express app
// add some stuff to help with forms
// that we want to parse
const app = express();
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

// add react
const reactEngine = require('express-react-views').createEngine();
app.engine('jsx', reactEngine);
app.set('views', __dirname + '/views');
app.set('view engine', 'jsx');

// Functions
const writePokedex = function (file) {
  let obj = {pokemon: pokedex};
  let writePromise = jsonfile.writeFile(file, obj);

  writePromise.catch((err) => console.error(err));
};

const getPokemon = function (req, res) {
  let pokemon;
  let inputId = Number(req.params.id);

  for (let mon of pokedex) {
    if(mon.id === inputId ) {
      pokemon = mon;
    }
  }
  if (pokemon === undefined) {
    // send 404 back
    res.status(404);
    res.send("not found");
  } else {
    res.send(pokemon);
  }
};

const sortPokemon = function (sortby) {
  const descSort = function (a, b) {
    if (a > b) {
      return -1;
    } else if (a < b) {
      return 1;
    }
    return 0;
  };
  const ascSort = function (a, b) {
    if (a < b) {
      return -1;
    } else if (a > b) {
      return 1;
    }
    return 0;
  };
  const magicSort = function (list, dir, keycallback) {
    let sortFn = (dir === "asc") ? ascSort : descSort;
    list.sort((a, b) => {
      a = keycallback(a);
      b = keycallback(b);
      return sortFn(a, b);
    });
  };

  let sortedDex = [...pokedex];
  let order = "asc";
  if (sortby.includes("desc")) {
    sortby = sortby.slice(0, -4);
    order = "desc";
  }

  switch (sortby) {
  case "name":
    magicSort(sortedDex, order, e => e.name);
    break;
  case "weight":
    magicSort(sortedDex, order, e => Number(e.weight.slice(0, -3)));
    break;
  case "height":
    magicSort(sortedDex, order, e => Number(e.height.slice(0, -3)));
    break;
  default:
    magicSort(sortedDex, order, e => e.id);
  }
  return sortedDex;
};

const listPokemon = function (req, res)  {
  let dexObj = {dex: pokedex};
  if (req.query.sortby) {
    dexObj.dex = sortPokemon(req.query.sortby);
  }
  res.render('list', dexObj);
};

//id, num, name, img, height, and weight
const sendForm = function (req, res) {
  let formFields = [
    '<form method="POST" action="/pokemon">',
    '<label for="monid">Pokemon ID</label>',
    '<input type="text" id="monid" name="monid">',

    '<label for="monnum">Pokemon Number</label>',
    '<input type="text" num="monnum" name="monnum">',

    '<label for="monname">Pokemon Name</label>',
    '<input type="text" name="monname" name="monname">',

    '<label for="monimg">Pokemon Image</label>',
    '<input type="url" img="monimg" name="monimg">',

    '<label for="monheight">Pokemon Height</label>',
    '<input type="text" height="monheight" name="monheight">',

    '<label for="monweight">Pokemon Weight</label>',
    '<input type="text" weight="monweight" name="monweight">',

    '<input type="submit" value="Submit">',
    '</form>'
  ];

  res.send(formFields.join('<br>'));
};

const addPokemon = function (req, res) {
  console.log("got form");
  console.log(req.body);
  let form = req.body;
  const newMon = {
    id: Number(form.monid),
    num: form.monnum,
    name: form.monname,
    img: form.monimg,
    height: form.monheight,
    weight: form.monweight
  };

  pokedex.push(newMon);

  writePokedex(FILE);
  res.send(newMon);
};

// Routes

app.get('/pokemon/new', sendForm);

app.get('/pokemon/:id', getPokemon);

app.post('/pokemon', addPokemon);

app.get('/', listPokemon);

// Listen on 3000
app.listen(3000, () => console.log('~~~ Tuning to port 3000 ~~~'));
