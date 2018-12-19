const express = require('express');
const jsonfile = require('jsonfile');

const FILE = 'data.json';

/**
 * ===================================
 * Configurations and set up
 * ===================================
 */

// Init express app
const app = express();
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}))

/**
 * ===================================
 * Routes
 * ===================================
 */

app.post('/pokemon', function(request, response) {
    //debug code (output request body)
    var anyExistPoke = false;
    var errorMessage ='Pokemon entered: ' + '</br>';
    errorMessage = errorMessage + "id: " + request.body.id + '</br>';
    errorMessage = errorMessage + "num: " + request.body.num + '</br>';
    errorMessage = errorMessage + "name: " + request.body.name + '</br>' + '</br>';

    jsonfile.readFile(FILE, (err, obj) => {
        request.body.id = parseInt(request.body.id);

        for (var i = 0; i < obj.pokemon.length; i++) {
            if(obj.pokemon[i].id === request.body.id) {
                anyExistPoke = true;
                errorMessage = errorMessage + "id already exists" + '</br>'
                break;
            }
        }

        for (var i = 0; i < obj.pokemon.length; i++) {
            if(obj.pokemon[i].num === request.body.num) {
                anyExistPoke = true;
                errorMessage = errorMessage + "num already exists" + '</br>'
                break;
            }
        }

        for (var i = 0; i < obj.pokemon.length; i++) {
            if(obj.pokemon[i].name === request.body.name) {
                anyExistPoke = true;
                errorMessage = errorMessage + "name already exists" + '</br>'
                break;
            }
        }

        if (!anyExistPoke){
            //Display the pokemon added.
            let form = `
                <html>
                <body>
                    <h1> New Pokemon added </h1>
                    <img src = ${request.body.img}>
                    <p> num: ${request.body.num} </p>
                    <p> name: ${request.body.name} </p>
                    <p> height: ${request.body.height} </p>
                    <p> weight: ${request.body.weight} </p>
                </body>
                </html>`;

            response.send(form);

            // save the request body
            obj.pokemon.push(request.body);
            jsonfile.writeFile(FILE, obj, (err) => {
                console.log(err);
            });
        }

        else {
            response.send(errorMessage);
        }
    });
});


app.get('/pokemon/new', (request, response) => {
  // render a template form here

  response.send('<form method="POST" action="/pokemon">' +
    'Pokemon to be added:' + '</br>' + '</br>' +
    'Id :' +
   '<input type="text" name="id">' + '</br>' + '</br>' +
   'num :' +
   '<input type="text" name="num">' + '</br>' + '</br>' +
   'name :' +
   '<input type="text" name="name">' + '</br>' + '</br>' +
   'img :' +
   '<input type="text" name="img">' + '</br>' + '</br>' +
   'height :' +
   '<input type="text" name="height">' + '</br>' + '</br>' +
   'weight :' +
   '<input type="text" name="weight">' + '</br>' + '</br>' +
  '<input type="submit" value="Submit">' +
  '</form>');
});
/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));
