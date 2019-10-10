const express = require('express');
const app = express();
const jsonfile = require('jsonfile');
const file = "pokedex.json";

const reactEngine = require('express-react-views').createEngine();
app.engine('jsx', reactEngine);
app.set('views', __dirname + '/views');
app.set('view engine', 'jsx');

const methodOverride = require('method-override')
app.use(methodOverride('_method'));

// tell your app to use the module
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

//able to change, but once change Id in data.json goes missing

app.put('/pokemon/:id',(request,response)=>{
    console.log("WOWOWOW");
    var newPokemon = request.body;

    console.log("about to get file");
    jsonfile.readFile(file,(err,obj)=>{
        if(err){
            console.log(err);
        }
        obj.pokemon[request.params.id] = newPokemon;
        console.log("about to write file");

        jsonfile.writeFile(file,obj,(err)=>{
            console.log("write file done");
            if(err){
                console.log(err);
                response.status(503).send("OH NO ERROR");
            }else{
                console.log("YAY");
                response.send("successful!");
            }
        });
    });
});

//show pokemon by id edit form
app.get('/pokemon/:id/edit',(request,response)=>{
    jsonfile.readFile(file,(err,obj)=>{
        if(err){
            console.log(err);
        }
        var id = request.params.id;
        var newPokemon = obj.pokemon[id];
        // var output = `<p>Edit Form<p><form action=/something><input name ="name" value= ${newPokemon.name}></form>`;
        var data ={
            pokemonKey : newPokemon,
            pokemonId : id

        }

        response.render('edit',data);
    });
});
/////////////////////////////////////////////////////////

//show the details of pokemon keyed in. //working!!
app.get('/pokemon/:id',(request,response)=>{
    jsonfile.readFile(file,(err,obj)=>{
        if(err){
            console.log(err);
        }
        var id = request.params.id;
        var newPokemon = obj.pokemon[id];
        response.send(newPokemon);
    });
});

app.get('/pokemon/:id/delete',(request,response)=>{
    jsonfile.readFile(file,(err,obj)=>{
        if(err){
            console.log(err);
        }
        var id = request.params.id;
        var newPokemon = obj.pokemon[id];
        // var output = `<p>Edit Form<p><form action=/something><input name ="name" value= ${newPokemon.name}></form>`;
        var data ={
            pokemonKey : newPokemon,
            pokemonId : id

        }

        response.render('delete',data);
    });
});


//to delete
app.delete('/pokemon/:id',(request,response)=>{
    console.log("WOWOWOW");
    var newPokemon = request.body;

    console.log("about to get file");
    jsonfile.readFile(file,(err,obj)=>{
        if(err){
            console.log(err);
        }
        obj.pokemon[request.params.id] = newPokemon;
        console.log("about to write file");

        jsonfile.writeFile(file,obj,(err)=>{
            console.log("write file done");
            if(err){
                console.log(err);
                response.status(503).send("OH NO ERROR");
            }else{
                console.log("YAY");
                response.send("successful!");
            }
        });
    });
});


//showing form //working!!
app.get('/pokemon', (request, response) => {
    jsonfile.readFile(file,(err,obj)=>{
        if(err){
            console.log(err);
        }else{
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
         }
     })
});

//create details of pokemon into json file //working!!
app.post('/pokemondetails',(req, res) => {
  jsonfile.readFile(file,(err,obj)=> {
    if(err){
      console.log("There's an error")
    }
    obj.pokemon.push(req.body);
    // console.log(newPokemon);
    jsonfile.writeFile(file,obj,(err)=>{
      if(err){console.log("error")}
        console.log("how is it done")
      response.send("pokemonAdded");
    });
  });
})
// app.post('/pokemondetails', (request,response) => {
//   jsonfile.readFile(file, (err, obj) => {
//     //creating empty object
//     var pokemondetail = {};
//     //checking current pokedexId
//     const pokemonLength = obj.pokemon.length;
//     //assign new pokemon to new Id
//     const pokemonId = pokemonLength+1;
//     //creating Id in object
//     pokemondetail.id = pokemonId;
//     //combining the Id first then userinput later
//     const newPokemon = Object.assign(pokemondetail, request.body)

//     // save data //push only array
//     obj.pokemon.push(newPokemon);

//     if( err ){
//       console.log("error reading file");
//       console.log(err);
//   }

//   jsonfile.writeFile(file, obj, (err) => {
//       if( err ){
//         console.log("error writing file");
//         console.log(err)
//         response.status(503).send("no!");
//     }else{
//         console.log( "send response");
//         response.send("Submitted!");
//     }
// });
// });
// });


app.listen(2000, () => console.log('~~~ Tuning in to the waves of port 2000 ~~~'));