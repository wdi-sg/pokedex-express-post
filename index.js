console.log('In the beginning');
const express = require('express');
const jsonfile = require('jsonfile');
const FILE = 'pokedex.json';
const app = express();

// tell your app to use the module
app.use(express.json());

app.use(express.urlencoded({
  extended: true
}));



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
  // '<input type="submit" value="Submit">'+
'</br>'+
'</br>'+
 'Number:&nbsp;'+
  '<input type="text" name="num">'+
  // '<input type="submit" value="Submit">'+
  '</br>'+
  '</br>'+
 'Name:&nbsp;&nbsp;&nbsp;&nbsp;'+
  '<input type="text" name="name">'+
  // '<input type="submit" value="Submit">'+
  '</br>'+
  '</br>'+
 'Image:&nbsp;&nbsp;&nbsp;&nbsp;'+
  '<input type="text" name="img">'+
  // '<input type="submit" value="Submit">'+
  '</br>'+
  '</br>'+
 'Height:&nbsp;&nbsp;&nbsp;'+
  '<input type="text" name="height">'+
  // '<input type="submit" value="Submit">'+
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

      // save in data file
  jsonfile.readFile(FILE, (err, obj) => {
    if( err ){
      console.log("error reading file");
      console.log(err)
    }

    // console.log("what i currently have");
    // console.log(obj.pokemon);

    // save data
    obj.pokemon.push(animal);
    // obj[key] = value;

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

  //debug code (output request body)
  // console.log(request.body);


  // save the request body


  // jsonfile.writeFile('pokedex.json', request.body, (err) => {
  //   console.error(err)
  //   response.send(request.body);
  // });
});


app.listen(3000, () => console.log('~~~ Local host love you 3000 ~~~'));