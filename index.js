const express = require('express');
const jsonfile = require('jsonfile');
const file = 'pokedex.json';
const app = express();

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

app.get('pokemon/:id/edit', (request, response) => {

  // get json from specified file
  jsonfile.readFile(file, (err, obj) => {
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

app.get('/', (request, response) => {

    jsonfile.readFile(file, (err, obj) => {

    let pokemon = obj.pokemon;
    // let allNames = new getAllByName(pokemon);
        // if(request.query.sortby === "name" ) {
        //     allNames.sort();
        // } //else if ()



        // console.log(sortByNames);

        // console.log(obj);
       // response.send(allNames);
        response.render('home', {test:pokemon});
           jsonfile.writeFile(file, obj, (err) => {

            console.log(err);
        });
    });
});

app.get('/pokemon/new', (request, response) => {

    response.render('new');
});

app.post('/pokemon', (request, response) => {

    jsonfile.readFile(file, (err, obj) => {
        let pokemon = obj.pokemon;
        let body = request.body;
        let newObj = new newPokemon(body.id, body.num, body.name, body.img, body.height, body.weight);

            console.log("value of newObj " + newObj);

        response.send(`
            New id is  ${newObj.id}<br>
            New num is  ${newObj.num}<br>
            New name is  ${newObj.name}<br>
            New Image is ${newObj.img}<br>
            New Height is ${newObj.height}<br>
            New Weight is ${newObj.weight}`);

        pokemon.push(newObj);

        jsonfile.writeFile(file, obj, (err) => {

            console.log(err);
        });
    });
});

function getAllPokemonObj (obj) {
    return obj.pokemon;
}

function getAllByName (pokemon){
    let pokemonName = [];
    for(let i = 0; i < pokemon.length; i++) {
        let tempArray = {}
        tempArray.push(pokemon[i].num);
        tempArray.push(pokemon[i].name);
        tempArray.push(pokemon[i].img);
        pokemonName.push(tempArray);
    }return pokemonName;
}



function newPokemon (newId, newNum, newName, newImg, newHeight,newWeight) {
    this.id = newId;
    this.num = newNum;
    this.name = newName;
    this.img = newImg;
    this.height = newHeight;
    this.weight = newWeight;
};

function getByType (pokemon, element) {
    let typeArray = [];

    for(let i = 0; i < pokemon.length; i++) {
        for(let j=0; j < pokemon[i].type.length; i ++) {
                typeArray.push(pokemon[i].name);
        }
    } return typeArray;
}

app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));
