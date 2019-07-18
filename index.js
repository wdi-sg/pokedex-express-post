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
  jsonfile.readFile(file, function(err,obj){
    // console.log(request.body)
    var bodyInfo = request.body;
    var list = obj["pokemon"];
    var responseSet = {
      flagstate : false,
      idstate : false
    }
    if (parseInt(bodyInfo["id"]) <= list.length){
      responseSet.idstate = true
    }else {
      for (var i = 0; i < list.length; i++){
        if (list[i]["name"] === bodyInfo["name"]){
          console.log("duplicatefound")
          responseSet.flagstate = true
          break;
        }
      }
    }
    if (responseSet.flagstate === false && responseSet.idstate === false){
      list.push(bodyInfo);
    }
    response.render("addPokemon",responseSet)
    jsonfile.writeFile(file,obj,(err) => {
      if(err){
        console.error(err)
      };
    });
  })
});

app.get('/pokemon', function(request, response){
  jsonfile.readFile(file, function (err,obj){
    
    if (request.query.sortby === "name"){
      var list = obj["pokemon"].sort(compareValues("name"));
      var dataSet = {
        data : list
      }
      response.render("sortByName",dataSet)
    }else if (request.query.sortby === "weight"){
      var list = obj["pokemon"].sort(compareValues("weight"));
      var dataSet = {
        data : list
      }
      response.render("sortByWeight",dataSet)
    }else if (request.query.sortby === "height"){
      var list = obj["pokemon"].sort(compareValues("height"));
      var dataSet = {
        data : list
      }
      response.render("sortByHeight",dataSet)
    }else {
      var dataSet = {
        data : obj
      }
      response.render("home",dataSet)
    }
  })
});

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
    obj["pokemon"][parseInt(request.params.id)-1] = upDatePokemon;
    jsonfile.writeFile(file, obj, (err)=>{
      if(err){
        console.log(err)
      }else{
        response.render("updatedPokemon")
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


//function that does the sorting by name, weight or height
function compareValues(key){
  var varA, varB, compare;
  return function (a,b){
    if(!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
    return 0;
    }
    if (hasNumber(a[key]) === true && hasNumber(b[key]) === true){
      // console.log("is a number")
      varA = parseFloat(a[key])
      varB = parseFloat(b[key])
      return varA-varB;
    }else {
      // console.log("is a string")
      varA = a[key].toUpperCase()
      varB = b[key].toUpperCase()
      if (varA > varB){
        compare = 1;
      }else if (varA < varB){
        compare = -1;
      }
      return compare;
    }
  }
}
function hasNumber(input){
  return /\d/.test(input);
}
