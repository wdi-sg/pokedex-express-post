const express = require('express');
const jsonfile = require('jsonfile');
const app = express();
const file = "pokedex.json"
const methodOverride = require('method-override')
const reactEngine = require('express-react-views').createEngine();

app.use(methodOverride('_method'));
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

// this line below, sets a layout look to your express project
app.engine('jsx', reactEngine);
// this tells express where to look for the view files
app.set('views', __dirname + '/views');
// this line sets react to be the default view engine
app.set('view engine', 'jsx');


//search for pokemon
app.get('/pokemon/search', (request, response) => {
  jsonfile.readFile(file, function(err,obj){
    //allows case-insensitive entry
    var smallLetter = request.query.q.toLowerCase();
    var capsFirst = smallLetter.charAt(0).toUpperCase();
    var combined = capsFirst+smallLetter.slice(1);
    var list = obj["pokemon"];
    var dataSet = {
      data: list,
      qstring: combined
    }
      response.render('searchPokemon',dataSet)
  })
});

//allows user to enter in new pokemon
app.get('/pokemon/new',(request,response)=>{
  jsonfile.readFile(file, function(err,obj){
    var list = obj["pokemon"];
    var dataSet = {
      data: list
    }
    response.render('newPokemon',dataSet);
  })
});

app.post('/pokemon/added', function(request, response) {
  jsonfile.readFile(file,(err,obj)=>{
    var dataSet = {
      pokemon : request.body,
      data: obj["pokemon"]
    }
    console.log(dataSet.pokemon.id)
    console.log(dataSet.pokemon)
    // var redirection = '/pokemon/'+dataSet.pokemon.id
    response.render("addPokemon", dataSet)
    // response.redirect(redirection)
  })
});

app.get('/pokemon', function(request, response){
  jsonfile.readFile(file, function (err,obj){
    var list = obj["pokemon"]
    var dataSet = {
      data : list,
      requestQuery: request.query.sortby
    }
    response.render("home",dataSet)
  })
});

app.get('/pokemon/:id', function(request,response){
  jsonfile.readFile(file, function (err,obj){
    var pokemonId = obj["pokemon"][parseInt(request.params.id)-1]
    console.log(pokemonId)
    var list = obj["pokemon"];
    var dataSet = {
      data: list,
      pokemon: pokemonId
    }
    response.render("pokemonpage",dataSet)
  })
})

app.get('/pokemon/:id/edit', function(request, response){
  jsonfile.readFile(file, function (err,obj){
    var pokemonId = obj["pokemon"][parseInt(request.params.id)-1]
    var dataSet = {
      data : pokemonId
    }
    response.render("editPokemon",dataSet)
  })
});

app.put('/pokemon/:id', function(request, response){
  jsonfile.readFile(file, function (err,obj){
    var upDatePokemon = request.body;
    var dataSet = {
      pokeinfo: upDatePokemon
    }
    obj["pokemon"][parseInt(request.params.id)-1] = upDatePokemon;
    response.render("updatedPokemon",dataSet)
    jsonfile.writeFile(file, obj, (err)=>{
      if(err){
        console.log(err)
      }
    });
  })
});

app.get('/pokemon/:id/delete', function(request, response){
  jsonfile.readFile(file, function (err,obj){
    var pokemonId = obj["pokemon"][parseInt(request.params.id)-1]
    var dataSet = {
      data : pokemonId
    }
    response.render("deletePokemon",dataSet)
  })
});

app.delete('/pokemon/:id', function(request, response){
  jsonfile.readFile(file, function (err,obj){
    obj["pokemon"].splice(parseInt(request.params.id)-1,1);
    response.render("pokeDeleted") //the pokemon is deleted but page is not rendered.
    jsonfile.writeFile(file, obj, (err)=>{
      if(err){
        console.log(err)
      }

    });
  })
});


app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));
