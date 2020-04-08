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
    res.render('pokemon', { mon: pokemon});
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

const sendForm = function (req, res) {
  res.render('newmonster', {mon: {}});
};

const validateMonster = function (monObj) {
  const getNumber = function (instr) {
    return (Number(instr)) ? Number(instr) : "Invalid, please enter a number.";
  };

  const newMon = {
    id: getNumber(monObj.monid),
    num: getNumber(monObj.monnum),
    name: monObj.monname,
    img: monObj.monimg,
    height: getNumber(monObj.monheight),
    weight: getNumber(monObj.monweight)
  };

  let oldIds = pokedex.map(mon => mon.id);
  if (oldIds.includes(newMon.id)) {
    newMon.id = "Invalid, ID number already in use.";
  }

  return newMon;
};

const isValid = function (val) {
  return !(String(val).toLowerCase().includes("invalid"));
};

const addPokemon = function (req, res) {
  let newMon = validateMonster(req.body);

  if (Object.values(newMon).every(isValid)) {
    newMon.num = String(newMon.num);
    newMon.height = String(newMon.height) + " m";
    newMon.weight = String(newMon.weight) + " kg";
    pokedex.push(newMon);
    let writePromise = jsonfile.writeFile(FILE, {pokemon: pokedex});
    writePromise
      .then(res.redirect('../pokemon/' + newMon.id))
      .catch(err => console.log(err));
  } else {
    res.render('newmonster', {mon: newMon});
  }
};

// Routes

app.get('/pokemon/new', sendForm);

app.get('/pokemon/:id', getPokemon);

app.post('/pokemon', addPokemon);

app.get('/', listPokemon);

// Listen on 3000
app.listen(3000, () => console.log('~~~ Tuning to port 3000 ~~~'));
