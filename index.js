const express = require('express');

const jsonfile = require('jsonfile');

const file = 'pokedex.json'

// testing

// jsonfile.readFile(file,(err,obj) => {

//     console.log(obj.pokemon[3].type[0].toLowerCase());

// });

// Init express app
const app = express();

// tell your app to use the module
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

// ===================================
// Routes
// ===================================

app.get('/', (request,response)=>{

    response.send("Welcome to Pokedex!");

});

app.get('/newpokemon',(request,response)=>{

    let form =
        '<html>' +
        '<body>' + '<h1>Create a New Pokemon!</h1>' +
        '<form action = "/pokemon" method= "POST">' +
        'ID : <input type="number" name="id"> <br><br>' +
        'Number : <input type="number" name="num"> <br><br>' +
        'Name : <input type="text" name="name"> <br><br>' +
        'Img URL : <input type="text" name="img"> <br><br>' +
        'Height : <input type="text" name="height"> <br><br>' +
        'Weight :<input type="text" name="weight"> <br><br>' +
        '<input type="submit" value="Submit">' +

        '</form>' +
        '</body>' +
        '</html>'

        response.send(form);

});

app.get('/pokemon/:search',(request,response)=>{

    //remove case sensitivity
    var search = request.params.search.toLowerCase();

    jsonfile.readFile(file,(err,obj)=>{
        for (i = 0; i < obj.pokemon.length; i ++){
            if (obj.pokemon[i].name.toLowerCase() == search){
                var pokemon = obj.pokemon[i];
                response.send("This is " + pokemon.name + ". It's weight is " + pokemon.weight + ". His favorite candy is " +  pokemon.candy + ". His next evolution is " + pokemon.next_evolution[0].name + " !");
                break;
            }
        }
        response.send("Not found");
    })
});

app.post('/pokemon', (request, response) => {
    jsonfile.readFile(file,(err,obj)=>{
        obj.pokemon.push(request.body);

        jsonfile.writeFile(file, obj, { spaces: 1 }, (err)=>{
            response.send("saved");
        })
    });
});

// ===================================
// Listen to requests on port 3000
// ===================================

app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));
