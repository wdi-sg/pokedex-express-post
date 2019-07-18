console.log('In the beginning');
const express = require('express');
const jsonfile = require('jsonfile');
const FILE = 'pokedex.json';
const app = express();
const reactEngine = require('express-react-views').createEngine();
app.engine('jsx', reactEngine);
app.set('views', __dirname + '/views');
app.set('view engine', 'jsx');

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

app.get('/pokemon/:id/edit', (request, response) =>{
    jsonfile.readFile(FILE, (err, obj) => {
        let inputId = parseInt( request.params.id );
        let pokemon;
        for( let i=0; i<obj.pokemon.length; i++ ){
            let currentPokemon = obj.pokemon[i];
            if( currentPokemon.id === inputId ){
                pokemon = currentPokemon;
            }
        }

        if (pokemon === undefined) {
            response.status(404);
            response.send("not found");
        } else {
            let data={
                pokemonEdit: pokemon
            };
            response.render('main', data);
        }
    });
});

app.post('/pokemon/:id', function(request, response) {

    console.log("Edit attempted");
    var animal = request.body;
    console.log( animal );

  jsonfile.readFile(FILE, (err, obj) => {
    if( err ){
      console.log("error reading file");
      console.log(err)
    }

    animal.id = parseInt(animal.id);

    const index = obj.pokemon.findIndex(i => i.id === request.body.id);
    obj.pokemon[index] = request.body;

    jsonfile.writeFile(FILE, obj, (err) => {
      if( err ){
        console.log("error writing file");
        console.log(err)
        response.status(503).send("no!");
      }else{
        console.log( "send response");
        response.send(animal);
      }

    });
  });

});

app.get('/:id', (request, response) => {

  jsonfile.readFile(FILE, (err, obj) => {

    let inputId = parseInt( request.params.id );

    var pokemon;

    for( let i=0; i<obj.pokemon.length; i++ ){

      let currentPokemon = obj.pokemon[i];

      if( currentPokemon.id === inputId ){
        pokemon = currentPokemon;
      }
    }

    if (pokemon === undefined) {

      response.status(404);
      response.send("not found");
    } else {

      response.send(pokemon);
    }
  });
});

app.get('/pokemon/new', (request, response) => {

    let form = '';
    form =
    '<html>'+
'<body>'+
'<form method="POST" action="/pokemon">'+
'<h1>Enter a new pokemon!</h1>'+
 'Id:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'+
  '<input type="text" name="id">'+
'</br>'+
'</br>'+
 'Number:&nbsp;'+
  '<input type="text" name="num">'+
  '</br>'+
  '</br>'+
 'Name:&nbsp;&nbsp;&nbsp;&nbsp;'+
  '<input type="text" name="name">'+
  '</br>'+
  '</br>'+
 'Image:&nbsp;&nbsp;&nbsp;&nbsp;'+
  '<input type="text" name="img">'+
  '</br>'+
  '</br>'+
 'Height:&nbsp;&nbsp;&nbsp;'+
  '<input type="text" name="height">'+
  '</br>'+
  '</br>'+
 'Weight:&nbsp;&nbsp;'+
  '<input type="text" name="weight">'+
  '<input type="submit" value="Submit">'+
'</form>'+
'</body>'+
'</html>';

  response.send(form);
});

app.post('/pokemon', function(request, response) {

    console.log("Posting attempted");
    var animal = request.body;
    console.log( animal );

  jsonfile.readFile(FILE, (err, obj) => {
    if( err ){
      console.log("error reading file");
      console.log(err)
    }

    animal.id = parseInt(animal.id);

    obj.pokemon.push(animal);

    jsonfile.writeFile(FILE, obj, (err) => {
      if( err ){
        console.log("error writing file");
        console.log(err)
        response.status(503).send("no!");
      }else{
        console.log( "send response");
        response.send(animal);
      }

    });
  });

});


app.listen(3000, () => console.log('~~~ Local host love you 3000 ~~~'));