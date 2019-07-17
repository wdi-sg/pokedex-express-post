const express = require('express');
const jsonfile = require('jsonfile');
var currentId = 0;
const file = 'pokedex.json';
const app = express();

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
const reactEngine = require('express-react-views').createEngine();
app.engine('jsx', reactEngine);

app.set('views', __dirname + '/views');
app.set('view engine', 'jsx');
const methodOverride = require('method-override')
app.use(methodOverride('_method'));

app.get('/pokemon/new', (req, res) => {
  jsonfile.readFile(file,(err,obj)=> {
    if(err){
      console.log("There's an error")
    }

  
  let form = `<form action="/pokemon" method="post">
                <p>Name</p>
                <input name="lastname" />
                <p>Num</p>
                <input name="num" />
                <p>id</p>
                <input name="id" />
                <p>Image</p>
                <input name="img" />
                <p>height</p>
                <input name="height" />

                <input type="submit"/>
            </form>`

  res.send(form);
});
});

app.post('/pokemon',(req, res) => {
  jsonfile.readFile(file,(err,obj)=> {
    if(err){
      console.log("There's an error")
    }
    obj.pokemon.push(req.body);
    // console.log(newPokemon);
    jsonfile.writeFile(file,obj,(err)=>{
      if(err){console.log("error")}
        console.log("how is it done")
      res.send("pokemonAdded");
    });
  });
})

app.get('/',(req, res)=> {
  jsonfile.readFile(file,(err,obj)=>{
    if(err){console.log("error")}
    let pokemon = obj.pokemon;
  res.send(pokemon);
  })
});



//part 2
app.get('/pokemon/:id/edit',(request, response) => {
  //get data from json
  jsonfile.readFile(file, (err, obj) => {
    if( err ){
      console.log(err);
    } 
     console.log(obj);
    let id = request.params.id;
    console.log(id);
    let editedPokemon = obj.pokemon[id];
    console.log(editedPokemon);
    var output = "" +
      "<p>edit form</p>"+
      '<form action="/something">'+
      '<input name="name" >'+
      "</form>";
      var data = {
     editedPokemon : editedPokemon,
     editedPokemonId : id
    };

    response.render('home', data);

  });
});



app.put('/pokemon/:id', (request, response) => {
  console.log("WOW PUT");

  var newPokemon = request.body;

 // save in data file
  
  jsonfile.readFile(file, (err, obj) => {
    console.log("got file");
    if( err ){
     
      console.log(err);
    }
//      save data
    obj.pokemon[request.params.id] = newPokemon;
   
    jsonfile.writeFile(file, obj, (err) => {
      console.log("write file done");
      if( err ){
        console.log("error writing file");
       
        response.status(503).send("no!");
      }else{
        console.log("~~~~~~~yay");

        response.send("updated");
      }

    });
  });


});





















   
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));
