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

app.get('*', (request, response) => {

        jsonfile.readFile(file,(err,obj) => {

            for (i = 0; i < obj.pokemon.length; i ++){

                if (request.path == "/" ){

                    response.send("Welcome to Pokedex!");

                } else if (request.path.substring(1) == obj.pokemon[i].name.toLowerCase()){

                    response.send("This is " + obj.pokemon[i].name + ". It's weight is " + obj.pokemon[i].weight + ". His favourite candy is " +  obj.pokemon[i].candy + ". His next evoluation is " + obj.pokemon[i].next_evolution[0].name + " !");

                }

                // else if ( request.path.substring(6) == obj.pokemon[i].type[0].toLowerCase() ){

                //         //response.send('yo');

                // }

                else if (request.path == "/pokemon/new"){

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
                }

                else {response.send("Could not find information about pokemon " + request.path.substring(1) + ". Is that a new pokemon? Gotta catch em' all!" );}
                //what is set status code??
            }
        });
});

app.post('/pokemon', function(request, response) {

  //debug code (output request body)
  console.log(request.body);

    jsonfile.readFile(file,(err,obj) => {

      // save the request body
      jsonfile.writeFile('pokedex.json', obj.pokemon, (err) => {
        console.error(err)

        // now look inside your json file
        response.send(request.body);
      });

    });
});

// ===================================
// Listen to requests on port 3000
// ===================================

app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));
