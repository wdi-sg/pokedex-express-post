const express = require('express');
const app = express();
const jsonfile = require('jsonfile');
const file = "data.json";


// tell your app to use the module
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

//getting form
app.get('/pokemonform', (request, response) => {
  // render a template form here
  let form = '';
  form = '<html>' +
  '<body>'+
  '<h1>Pokemon form</h1>'+
  '<form method="POST" action="/pokemondetails">'+
  '<p>Name:</p><input name="name"/>'+
  '<p>Height:</p><input name="height"/>'+
  '<p>Weight:</p><input name="weight"/>'+
  '<input type="submit"/>'+
  '</form>'+
  '</body>'+
  '</html>';
  response.send(form);

});

app.post('/pokemondetails', (request,response) => {
  //console.log(request.body);
  // console.log(pokemondetail)
  // response.send(pokemondetail)

  //save in data file

  jsonfile.readFile(file, (err, obj) => {
    //creating empty object
    var pokemondetail = {};
    //checking current pokedexId
    const pokemonLength = obj.pokemon.length;
    //assign new pokemon to new Id
    const pokemonId = pokemonLength+1;
    //creating Id in object
    pokemondetail.id = pokemonId;
    //combining the Id first then userinput later
    const newPokemon = Object.assign(pokemondetail, request.body)

    // save data //push only array
    obj.pokemon.push(newPokemon);

    if( err ){
      console.log("error reading file");
      console.log(err)
    }



    jsonfile.writeFile(file, obj, (err) => {
      if( err ){
        console.log("error writing file");
        console.log(err)
        response.status(503).send("no!");
    }else{
        console.log("~~~~~~~yay");
        console.log( "send response");
        response.send("yes!");
    }
});
});
});

 app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));