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

const methodOverride = require('method-override')
app.use(methodOverride('_method'));

/**
 * ===================================
 * Routes
 * ===================================
 */


app.get('/pokemon/:id/edit',(request, response) => {

  jsonfile.readFile(FILE, (err, obj) => {

    let inputId = parseInt( request.params.id );

    let url = `/pokemon/${obj.pokemon[inputId-1].id}?_method=put`

    let html = `
    <form method="POST" action=${url}>
        <h1> edit this pokemon's name </h1>
        <p>number: ${obj.pokemon[inputId-1].num}</p>
        <p>name: ${obj.pokemon[inputId-1].name}</p>
        <p>img: <img src="${obj.pokemon[inputId-1].img}"></p>
        <p>height: ${obj.pokemon[inputId-1].height}</p>
        <p>weight: ${obj.pokemon[inputId-1].weight}</p>
        <p><input name="num" type="number" value="${obj.pokemon[inputId-1].num}"/></p>
        <p><input name="name" type="text" value="${obj.pokemon[inputId-1].name}"/></p>
        <p><input name="img" type="text" value="${obj.pokemon[inputId-1].img}"/></p>
        <p><input name="height" type="number" step="0.01" min="0" value="${obj.pokemon[inputId-1].height}"/> m</p>
        <p><input name="weight" type="number" step="0.01" min="0" value="${obj.pokemon[inputId-1].weight}"/> kg</p>
        <input type="submit" value="edit this"/>
    </form>`;

    response.send(html);
  })


});

app.put("/pokemon/:id", (request, response) => {

    //console.log(request);
  let inputId = parseInt( request.params.id );
  let newCont = request.body;
  //let newWeight = request.body.weight;
  console.log('newName: ' + newCont.name);
  console.log('request body:' + request.body);
  //read the file in and write out to it
  jsonfile.readFile(FILE, (err,obj) => {
    obj.pokemon[inputId-1].name = newCont.name;
    obj.pokemon[inputId-1].num = newCont.num;
    obj.pokemon[inputId-1].img = newCont.img;
    obj.pokemon[inputId-1].height = newCont.height + " m";
    obj.pokemon[inputId-1].weight = newCont.weight + " kg";


    jsonfile.writeFile(FILE,obj, (err) => {
        response.send(newCont.name + ' updated!');
    })
    })
});


app.get('/:id', (request, response) => {

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
});

app.post('/pokemon', (request,response) => {

  console.log("YAY WOW");
  let pokemonNew = request.body;
  console.log("new pokemon");
  console.log( pokemonNew );

  // save in data file
  jsonfile.readFile(FILE, (err, obj) => {
    if( err ){
      console.log("error reading file");
      console.log(err)
    }

    // console.log("what i currently have");
    // console.log(obj.pokemon);


    // save data
    obj.pokemon.push(pokemonNew);
    // obj[key] = value;

    jsonfile.writeFile(FILE, obj, (err) => {
      if( err ){
        console.log("error writing file");
        console.log(err)
        response.status(503).send("no!");
      } else {
        console.log("~~~~~~~yay");
        //sends response after saving it in the file. for user to know if it was saved in the file.
        console.log( "send response");
        response.send("yes! New pokemon added!");
      }

    });
  });
});

app.get('/pokemon/new', (request, response) => {
    // render a template form here
    //response.send("hello world");
    console.log("getting form");
    let form = '';
    form = '<html>' + '<body>' +
    '<form method="POST" action="/pokemon">' +
    '<p>Pokemon Id</p>' +
    '<input type="number" name="id">' +
    '<p>Pokemon number</p>' +
    '<input type="number" name="num">' +
    '<p>Pokemon name</p>' +
    '<input type="text" name="name">' +
    '<p>Pokemon image</p>' +
    '<input type="number" name="img">' +
    '<p>Pokemon height</p>' +
    '<input type="number" name="height">' +
    '<p>Pokemon weight</p>' +
    '<input type="number " name="weight">' +
    '<input type="submit" value="Submit">' +
    '</form>' +
    '</body>' + '</html>';
    response.send(form);
});



app.get('/', (request, response) => {
  //response.send("yay");
    console.log("getting form");
    let form = '';
    form = '<form method = "get" action = "/">' +
    //'<input type="submit" name="sortby" value="name">' +
    '<select name="sortby" onchange="this.form.submit()">' +
    '<option name="" value="0" selected>Sort by</option>' +
    '<option value="name">Name</option>' +
    '<option value="weight">Weight</option>' +
    '<option value="height">Height</option>' +
    '</select>' +
    //'<input type="submit" />' +
    '</form>';

    console.log(request.query.sortby);

    if (request.query.sortby === 'name'){ //sort by name
        console.log("sorting names");
    jsonfile.readFile(FILE, (err, obj) => {
        if( err ){
            console.log("error reading file");
            console.log(err)
        } else {
            let pokemonArr = [];
            var sortedPokemon = [];
            var sortedPokemonList = '<ul>';
            for( let i=0; i<obj.pokemon.length; i++ ){
                pokemonArr.push(obj.pokemon[i].name);
            }
            sortedPokemon = pokemonArr.sort();
            //console.log(sortedPokemon);
            pokemonArr.forEach(function(poke) {
                sortedPokemonList += '<li>'+ poke + '</li>'
            });
            sortedPokemonList += '</ul>';
            response.send(form + '<h2>Pokemon sorted by name</h2>' + sortedPokemonList);
        }
    })
    } else if (request.query.sortby === 'weight'){ //sort by weight
        console.log("sorting weight");
    jsonfile.readFile(FILE, (err, obj) => {
        if( err ){
            console.log("error reading file");
            console.log(err)
        } else {
            let pokemonArr = [];
            var sortedPokemon = [];
            var sortedPokemonList = '<ul>';
            for( let i=0; i<obj.pokemon.length; i++ ){
                pokemonArr.push({
                        name: obj.pokemon[i].name,
                        weight: parseFloat(obj.pokemon[i].weight)
                    });
            }
            console.log(pokemonArr);
            sortedPokemon = pokemonArr.sort(function(a, b){
                const weightA = a.weight;
                const weightB = b.weight;
                let comparison = 0;
                if (weightA > weightB) {
                    comparison = 1;
                } else if (weightA < weightB) {
                    comparison = -1;
                }
            return comparison;
            });
            console.log(sortedPokemon);
            pokemonArr.forEach(function(poke) {
                sortedPokemonList += '<li>'+ 'Name: ' + poke.name +', weight: ' + poke.weight + '</li>'
            });
            sortedPokemonList += '</ul>';
           response.send(form + '<h2>Pokemon sorted by weight</h2>' + sortedPokemonList);
        }
    })
    } else if (request.query.sortby === 'height'){ //sort by height
        console.log("sorting height");
    jsonfile.readFile(FILE, (err, obj) => {
        if( err ){
            console.log("error reading file");
            console.log(err)
        } else {
            let pokemonArr = [];
            var sortedPokemon = [];
            var sortedPokemonList = '<ul>';
            for( let i=0; i<obj.pokemon.length; i++ ){
                pokemonArr.push({
                        name: obj.pokemon[i].name,
                        height: parseFloat(obj.pokemon[i].height)
                    });
            }
            console.log(pokemonArr);
            sortedPokemon = pokemonArr.sort(function(a, b){
                const heightA = a.height;
                const heightB = b.height;
                let comparison = 0;
                if (heightA > heightB) {
                    comparison = 1;
                } else if (heightA < heightB) {
                    comparison = -1;
                }
            return comparison;
            });
            console.log(sortedPokemon);
            pokemonArr.forEach(function(poke) {
                sortedPokemonList += '<li>'+ 'Name: ' + poke.name +', height: ' + poke.height + '</li>'
            });
            sortedPokemonList += '</ul>';
           response.send(form + '<h2>Pokemon sorted by height</h2>' + sortedPokemonList);
        }
    })
    } else { //show all pokemon



  jsonfile.readFile(FILE, (err, obj) => {
    if( err ){
      console.log("error reading file");
      console.log(err)
    } else {
        let pokemonArr = [];
        var pokemonList = '<ul>';
        for( let i=0; i<obj.pokemon.length; i++ ){
            pokemonArr.push(obj.pokemon[i].name);
        }
        //console.log(pokemonArr);
        pokemonArr.forEach(function(poke) {
            pokemonList += '<li>'+ poke + '</li>';
        });
        pokemonList += '</ul>';
        response.send(form + pokemonList);
    }
  })
  }
});



/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));