/**
 * ===================================
 * Configs
 * ===================================
 */
const express = require('express');
const jsonfile = require('jsonfile');
const pokedex = 'pokedex.json';
const app = express();
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

/**
 * ===================================
 * Routes
 * ===================================
 */

app.get('/:id', (request, response) => {
  // get json from specified file
  jsonfile.readFile(pokedex, (err, obj) => {
    // obj is the object from the pokedex json file
    // extract input data from request
    let inputId = parseInt( request.params.id );
    var pokemon;
    // find pokemon by id from the pokedex json file
    for( let i=0; i<obj.pokemon.length; i++ ){
      let currentPokemon = obj.pokemon[i];
      if( currentPokemon.id === inputId ){
        pokemon = currentPokemon;
      }
    }
    if (pokemon === undefined) {
      // send 404 back
      response.status(404);
      response.send("not found");
    } else {
      response.send(`<img src=${pokemon.img}>`);
    }
  });
});

//pokemon/new
app.get("/pokemon/new", (request,response) => {
    let form = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
      <title>GA Pokedex</title>
      <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous">
      <link href="https://fonts.googleapis.com/css?family=Thasadith" rel="stylesheet">
      <link rel="stylesheet" type="text/css" href="http://10.193.240.192:8080/style.css">
    </head>
    <body>
      <form action="/pokemon" method="POST">
          <h2 class="abc">Id</h2>
          <input type="" name="id">
          <h2>Num</h2>
          <input type="" name="num">
          <h2>Name</h2>
          <input type="" name="name">
          <h2>Img</h2>
          <input type="" name="img">
          <h2>Height</h2>
          <input type="" name="height">
          <h2>Weight</h2>
          <input type="" name="weight">
          <br><br>
          <input type="submit" class="btn btn-primary">
      </form>
    </body>
    </html>`;
    response.send(form);
});

//add new pokemon
app.post("/pokemon", (request,response) => {

    jsonfile.readFile(pokedex, (err, obj) => {
        let currentPokedex = obj.pokemon;
        let newPokemon = {
          "id": obj.pokemon.length+1,
          "num": (obj.pokemon.length+1).toString(),
          "name": request.body.name,
          "img": request.body.img,
          "height": request.body.height,
          "weight": request.body.weight,
          "candy": "",
          "candy_count": "",
          "egg": "",
          "avg_spawns": "",
          "spawn_time": ""
        }
        currentPokedex.push(newPokemon);
        jsonfile.writeFile("pokedex.json", currentPokedex, (err) => {
            console.log(err);
            response.send(newPokemon);
        });
    });
});


app.get('/', (request, response) => {
    jsonfile.readFile(pokedex, (err, obj) => {
        let html =
        `<!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
          <title>GA Pokedex</title>
          <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous">
          <link href="https://fonts.googleapis.com/css?family=Thasadith" rel="stylesheet">
          <link rel="stylesheet" type="text/css" href="http://10.193.240.192:8080/style.css">
        </head>
        <body>
        <div class="container">
            <div class="row">`;
        for (let i = 0; i < obj.length; i++) {
            html = html + `<div class-"col"><img src=${obj[i].img}><h3>${obj[i].num}</h3><h4>${obj[i].name}</h4></div>`;
        };
        html = html + "</div></div></body></html>";
        response.send(html);
    });
});

/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));
