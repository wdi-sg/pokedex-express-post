//===================================
// Configurations and set up
//===================================
const _ = require('lodash');
const express = require('express');
const promise = require("bluebird");
const methodOverride = require('method-override')
const jsonfile = promise.promisifyAll(require('jsonfile'));
const file = 'pokedex.json';

const app = express();

let data;

app.use(express.static('public')) // use to serve static files using express
app.use(methodOverride('_method')); // use to overcome HTML issue with sending PUT and DELETE request

// tell your app to use the module. This is to enable request.body for post request
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

//===================================
// Server And Data Loader Function
//===================================
var startServer = function () {
    // read data before starting up server
    jsonfile.readFileAsync(file)
        .then((JSONContent) => {
            data = JSONContent;
        })
        .then(() => {
            app.listen(3000);
        })
        .catch((err) => {
            response.send("Error reading file! Please try again.");
            console.log(err);
        });
}


//===================================
// Helper Function
//===================================
var addZero = function(n) {
  let str = n.toString()

  if (str.length === 1) {
    str = "00" + str;
  } else if (str.length === 2) {
    str = "0" + str;
  }
  return str;
}

var getUniquePokemonType = function () {
    let uniqueTypes = [];

    _.forEach(data.pokemon, (p) => {
        _.forEach(p.type, (t) => {
            if (_.includes(uniqueTypes, t) === false) {
                uniqueTypes.push(t)
            }
        })
    });

    return uniqueTypes;
}

var getPokemonType = function (t) {
    let result = [];

    if (typeof t === "string") {
        result.push(t);
    } else {
        result = t;
    }

    return result;
}

var getPokemonWeakness = function (t) {
    let weakness = [];

    let weaknessMatrix = {
        "Normal": ["Fighting"],
        "Fighting": ["Flying", "Psychic"],
        "Flying": ["Rock", "Electric", "Ice"],
        "Poison": ["Ground", "Psychic"],
        "Ground": ["Water", "Grass", "Ice"],
        "Rock": ["Fighting", "Ground", "Water", "Grass"],
        "Bug": ["Flying", "Rock", "Fire"],
        "Ghost": ["Ghost", "Dark"],
        "Fire": ["Ground", "Rock", "Water"],
        "Water": ["Grass", "Electric"],
        "Grass": ["Fire", "Flying", "Poison", "Bug", "Ice"],
        "Electric": ["Ground"],
        "Psychic": ["Bug", "Ghost"],
        "Ice": ["Fighting", "Rock", "Fire"],
        "Dragon": ["Ice", "Dragon"]
    };

    // get weakness based on Pokemon type
    _.forEach(t, (o) => {
        weakness = _.uniq(weakness.concat(weaknessMatrix[o]));
    });

    // remove Pokemon type resistance. Example Grass Poison Pokemon should not have weakness against Poison
     _.forEach(t, (o) => {
        _.remove(weakness, function(n) {
            return o === n;
        });
    });

    return weakness;
}


// ===================================
// Request Handlers
// ===================================
var homeRequestHandler = function (request, response) {
    if (request.query.sortby === 'name') {
        response.render('home', { pokemon: _.sortBy(data.pokemon, ['name']) } );
    } else if (request.query.sortby === "id"){
        response.render('home', { pokemon: _.sortBy(data.pokemon, ['id']) } );
    } else {
        response.render('home', { pokemon: data.pokemon } );
    }
}

var getPokemonByIdRequestHandler = function (request, response) {
    let pokemon;

    _.forEach(data.pokemon, (o) => {
        if (o.id === Number(request.params.id)) {
            pokemon = o;
        }
    });

    if (pokemon !== undefined) {
        response.render('view', pokemon);
    } else {
        response.send(404, 'Not found!');
    }
}

var newPokemonRequestHandler = function (request, response) {
    let uniquePokemonType = getUniquePokemonType();

    response.render('add', {'uniquePokemonType': uniquePokemonType});
}

var addNewPokemonRequestHandler = function (request, response) {

    getPokemonWeakness(getPokemonType(request.body.type));

    let newPokemon = {
        id: data.pokemon.length + 1,
        num: addZero(data.pokemon.length + 1),
        name: request.body.name,
        img: `http://www.serebii.net/pokemongo/pokemon/${addZero(data.pokemon.length + 1)}.png` ,
        type: getPokemonType(request.body.type),
        height: request.body.height,
        weight: request.body.weight,
        candy: 'None',
        egg: 'Not in Eggs',
        avg_spawns: 0,
        spawn_time: 'N/A',
        multipliers: [],
        weaknesses: getPokemonWeakness(getPokemonType(request.body.type)),
        next_evolution: []
    };

    data.pokemon.push(newPokemon);

    jsonfile.writeFileAsync(file, data)
        .then(() => {
            response.redirect(`/pokemon/${ newPokemon.id }`);
        }).catch((err) => {
            response.send('There is an error adding a new Pokemon! Please try again.');
            console.log(err);
        });;
}

var editPokemonRequestHandler = function (request, response) {
    let pokemon;

    _.forEach(data.pokemon, (o) => {
        if (o.id === Number(request.params.id)) {
            pokemon = o;
        }
    });

    if (pokemon !== undefined) {
        response.render('edit', pokemon);
    } else {
        response.send(404, 'Not found!');
    }
}

var editExistingPokemonRequestHandler = function (request, response) {
    _.forEach(data.pokemon, (o) => {
        if (o.id === Number(request.params.id)) {
            o.name = request.body.name;
            o.height = request.body.height;
            o.weight = request.body.weight;
        }
    });

    jsonfile.writeFileAsync(file, data)
        .then(() => {
            response.redirect(`/pokemon/${ request.params.id }`);
        }).catch((err) => {
            response.send('There is an error updating the Pokemon! Please try again.');
            console.log(err);
        });;
}

var deletePokemonRequestHandler = function (request, response) {
    let pokemon;

    _.forEach(data.pokemon, (o) => {
        if (o.id === Number(request.params.id)) {
            pokemon = o;
        }
    });

    if (pokemon !== undefined) {
        response.render('delete', pokemon);
    } else {
        response.send(404, 'Not found!');
    }
}

var deleteExistingPokemonRequestHandler = function (request, response) {
    _.remove(data.pokemon, (o) => {
        return o.id === Number(request.params.id);
    });

    jsonfile.writeFileAsync(file, data)
        .then(() => {
            response.redirect('/pokemon');
        }).catch((err) => {
            response.send('There is an error updating the Pokemon! Please try again.');
            console.log(err);
        });;
}


// ===================================
// Routes
// ===================================
app.get('/pokemon/new', newPokemonRequestHandler);
app.post('/pokemon', addNewPokemonRequestHandler);

app.get('/pokemon/:id/edit', editPokemonRequestHandler);
app.put('/pokemon/:id', editExistingPokemonRequestHandler);

app.get('/pokemon/:id/delete', deletePokemonRequestHandler);
app.delete('/pokemon/:id', deleteExistingPokemonRequestHandler);

app.get('/', homeRequestHandler);
app.get('/pokemon', homeRequestHandler);
app.get('/pokemon/:id', getPokemonByIdRequestHandler);


// ===================================
// Start Server
// ===================================
startServer();