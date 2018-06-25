const express = require('express');
const jsonfile = require('jsonfile');

/**
 * ===================================
 * Configurations and set up
 * ===================================
 */

// Init express app
const app = express();

const path = require('path');

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded( {
  extended: true
}));

/**
 * ===================================
 * Routes
 * ===================================
 */

app.get('/pokemon/new', (request, response) => {
  response.sendFile(path.join(__dirname, '/public', 'form.html'))
});

app.post('/pokemon', function(request, response) {
  
  console.log(request.body);

  jsonfile.readFile('pokedex.json', (err,obj) => {
    
    let newPoke = {
            "id": request.body.id,
            "num": request.body.num,
            "name": request.body.name,
            "img": request.body.img,
            "height": request.body.height,
            "weight": request.body.weight,
    };
    
    obj.pokemon.push(newPoke)
    
    let updatedPokedex = obj;

    jsonfile.writeFile('pokedex.json', updatedPokedex, (err) => {

      response.send('pokemon added to pokedex!');

      });

  })
  


});


app.get('/', (request, response) => {
  response.send("yay");
});

/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));