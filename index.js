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

/**
 * ===================================
 * FUNCTIONS
 * ===================================
 */

let createPokemon = (request, response) => {
    let form = '';
    form = `
    <form method="POST" action="/pokemon">
      Pokemon Name:<br>
      <br><input type="text" name="id" placeholder="id">
      <br><input type="text" name="num" placeholder="num">
      <br><input type="text" name="name" placeholder="name">
      <br><input type="text" name="img" placeholder="img">
      <br><input type="text" name="height" placeholder="height">
      <br><input type="text" name="weight" placeholder="weight">
      <br><input type="submit" value="Submit">
    </form>
    `
    response.send(form);
}

let addCreatedPokemon = (request, response) => {
    let newPoke = request.body;

    jsonfile.readFile(FILE, (err,obj) => {
        newPoke.num = obj.lastKey + 1;
        obj.lastKey++;
        obj.pokemon.push(newPoke);
        jsonfile.writeFile(FILE, obj, (err) => {
            if (err) {
                console.log('error in writing!');
            } else {
                response.send(`You have created a new Pokemon ${newPoke.name}!`);
            }
        })
    });
}

let showPokemonDetailsUsingInput = (request, response) => {
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
}

let showPokemonDetailsUsingLink = (request, response) => {
    // console.log(request.route.path);
    // console.log(request.route.body);
    // console.log(request.route);
    // console.log(request.url);

    jsonfile.readFile(FILE, (err, obj) => {
        for(let i=0; i<obj.pokemon.length; i++) {
            if ( request.url === `/poke/${obj.pokemon[i].id}`){
                response.send(
                    `${obj.pokemon[i].name}<br>
                    <img src="${obj.pokemon[i].img}"><br>Height: ${obj.pokemon[i].height}<br>Weight: ${obj.pokemon[i].weight}`)
            }
        }
    });
}

let sortAllPokemon = (request, response) => {
    let query = request.query.sortby;

    jsonfile.readFile(FILE, (err,obj) => {
        let content = '';
        let form = '';
        form = `
        <form action="/pokemon/new">
            <button type="submit">Create Pokemon </button>
        </form> <br>

        <form method="GET">
            <select name="sortby">
                <option value="id">Id</option>
                <option value="name">Name</option>
                <option value="weight">Weight</option>
                <option value="height">Height</option>
            </select>
            <input type="submit" value="Sort Pokemon">
        </form>
        `;

        content = form;

        if (query === 'name') {
            obj.pokemon.sort(compareName);
        } else if (query === 'weight') {
            obj.pokemon.sort(compareWeight);
        } else if (query === 'height') {
            obj.pokemon.sort(compareHeight);
        }

        //once sorted, display all pokemon to server
        for(let i=0; i<obj.pokemon.length; i++) {
            let eachPoke = obj.pokemon[i].name;
            content +=
            `<br><a href='/poke/${obj.pokemon[i].id}'>${obj.pokemon[i].name}</a>`;
        }
        response.send(content);
    });
}

let compareName = (a, b) => {
  // Use toUpperCase() to ignore character casing
  const nameA = a.name.toUpperCase();
  const nameB = b.name.toUpperCase();

  let comparison = 0;
  if (nameA > nameB) {
    comparison = 1;
  } else if (nameA < nameB) {
    comparison = -1;
  }
  return comparison;
}

let compareWeight = (a, b) => {
  // Use toUpperCase() to ignore character casing
  const weightA = parseFloat(a.weight);
  const weightB = parseFloat(b.weight);

  let comparison = 0;
  if (weightA > weightB) {
    comparison = 1;
  } else if (weightA < weightB) {
    comparison = -1;
  }
  return comparison;
}

let compareHeight = (a, b) => {
  // Use toUpperCase() to ignore character casing
  const heightA = parseFloat(a.height);
  const heightB = parseFloat(b.height);

  let comparison = 0;
  if (heightA > heightB) {
    comparison = 1;
  } else if (heightA < heightB) {
    comparison = -1;
  }
  return comparison;
}

/**
 * ===================================
 * ROUTING
 * ===================================
 */

app.get('/pokemon/new', createPokemon);
app.post('/pokemon', addCreatedPokemon);

app.get('/poke/:id', showPokemonDetailsUsingLink);
app.get('/:id', showPokemonDetailsUsingInput);
app.get('/', sortAllPokemon);

/**
 * ===================================
 * Listen to requests on port
 * ===================================
 */

let port = 1500;
app.listen(port, () => console.log(`~~~ Tuning in to the waves of port ${port} ~~~`));