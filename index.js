const express = require('express');
const jsonfile = require('jsonfile');

const FILE = 'pokedex.json';

const app = express();

const reactEngine = require('express-react-views').createEngine();
app.engine('jsx', reactEngine);

app.set('views', __dirname + '/views');
app.set('view engine', 'jsx');

app.use(express.json());
app.use(express.urlencoded({
  extended: true,
}))

app.get('/:id', (request, response) => {

  let searchId = parseInt(request.params.id);

  jsonfile.readFile(FILE, (err, obj) => {

    response.render('id', {search: searchId, pokedex: obj.pokemon});
  })
})


app.get('/pokemon/new', (request, response) => {

  let html = "";
  html += "<html><body>";
  html += `<form method="POST" action="/pokemon">`;
  html += "<h1>Make a new Pokemon:</h1>";
  html += `Name: <input type="text" name="name"><br>`;
  html += `Image: <input type="text" name="img"><br>`;
  html += `Height: <input type="text" name="height"><br>`;
  html += `Weight: <input type="text" name="weight"><br>`;
  html += '<input type="submit" value="Submit"><br>';
  html += "</form>";

  response.send(html);
})

app.post('/pokemon', (request, response) => {


  jsonfile.readFile(FILE, (err, obj) => {

    let newPokemon = {};
    let pokedex = obj;

    newPokemon["id"] = parseInt(obj.pokemon.length + 1);
    newPokemon["num"] = obj.pokemon.length + 1;
    newPokemon["name"] = request.body.name;
    newPokemon["img"] = request.body.img;
    newPokemon["height"] = request.body.height;
    newPokemon["weight"] = request.body.weight;

    pokedex.pokemon.push(newPokemon);

    jsonfile.writeFile(FILE, pokedex, (err) => {
      if (err) console.log(err);

      response.redirect("/?sortby=id");
    })
  })
})

app.get('/', (request, response) => {

  let sortBy = request.query.sortby;

  if (sortBy) {

    jsonfile.readFile(FILE, (err, obj) => {
      if (err) console.log(err);

      let pokedex = obj.pokemon;

      for (let i in pokedex) {
        if (sortBy === "spawn_time") {
          let value = pokedex[i][sortBy].split(":");
          value = parseInt(value[0]*60) + parseInt(value[1]);
          pokedex[i][sortBy] = value;
        } else {
          let value = pokedex[i][sortBy].toString();
          value = value.replace(/"m"|"kg"/gi, "");
          value = parseFloat(value);
          pokedex[i][sortBy] = value;
        }
      }

      let sorted = pokedex.sort((a, b) => {
        return a[sortBy] - b[sortBy];
      })

      let html = "";

      html += "<html><body>";
      html += "<h2>Listing all Pokemon sorted by: " + sortBy + "</h2>";
      html += "<ol>";

      for (let i in sorted) {
        html += `<li><br>${sorted[i].name}<br><img src="${sorted[i].img}"></li>`;
      }

      html += "</ol>";
      html += "<h2>Sort by:</h2>"
      html += `<form method="GET" action="/">`;
      html += `<select name="sortby">`;
      html += `<option value="id" selected>ID Number</option>`;
      html += `<option value="height">Height</option>`;
      html += `<option value="weight">Weight</option>`;
      html += `<option value="avg_spawns">Average Spawns</option>`;
      html += `<option value="spawn_time">Spawn Time</option>`;
      html += "</select>";
      html += '<input type="submit" value="Submit"><br>';
      html += `</form>`
      html += "</body></html>"

      response.send(html);
    })


  } else {

    let html = "";

    html += "<html><body>";
    html += "<h2>Sort By:</h2>"
    html += `<form method="GET" action="/">`;
    html += `<select name="sortby">`;
    html += `<option value="id" selected>ID Number</option>`;
    html += `<option value="height">Height</option>`;
    html += `<option value="weight">Weight</option>`;
    html += `<option value="avg_spawns">Average Spawns</option>`;
    html += `<option value="spawn_time">Spawn Time</option>`;
    html += "</select>";
    html += '<input type="submit" value="Submit"><br>';
    html += `</form>`
    html += "</body></html>";

    response.send(html);
  }

})

const PORT = 3000;
app.listen(PORT, () => console.log("Listening on port: " + PORT));
