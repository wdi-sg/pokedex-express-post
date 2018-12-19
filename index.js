const express = require('express');
const jsonfile = require('jsonfile');
const file = 'pokedex.json';


const app = express();
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

app.get('/:id', (request, response) => {

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
    let allpokemon = [];
        for (let i=0; i < pokemon.length; i++) {
            allpokemon.push(pokemon[i].name);
         }
        response.send('<h1>This is all the list of pokemons:</h1> <br>' + allpokemon.join('<br>'));
    });
});

app.get('/pokemon/new', (request, response) => {
        let form = `
        <html>
        <body>
        <form action="/pokemon" method="POST">
            Id: <input name="id" placeholder="enter id"><br>
            Name: <input name="name" placeholder="enter name"><br>
            Number:<input name="num" placeholder="enter number"><br>
            Image:<input name="img" placeholder="enter image"><br>
            Height:<input name="height" placeholder="enter height in metre"><br>
            Wight:<input name="weight" placeholder="enter weight in kg"><br>
        <button type="submit"/>Submit</button>
        </form>
        </body>
        </html>`;

        response.send(form);
});

app.post('/pokemon', (request, response) => {

    jsonfile.readFile(file, (err, obj) => {
        let pokemon = obj.pokemon;
        let newObj = {
            "id": parseInt(request.body.id),
            "num": request.body.num,
            "name": request.body.name,
            "img": request.body.img,
            "height": request.body.height + ' m',
            "weight":request.body.weight + ' kg'
            };

        response.send('New id is ' + newObj.id + '<br>New num is ' + newObj.num + '<br>New name is ' +  newObj.name);

        console.log(newObj);
        pokemon.push(newObj);

        jsonfile.writeFile(file, obj, (err) => {

            console.log(err);
        });
    });
});

// function newPokemon (id,num,name,img,height,weight) {
//     this.id = id;
//     this.num = num;
//     this.name = name;
//     this.img = img;
//     this.height = height;
//     this.weight = weight;
// };

/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));
