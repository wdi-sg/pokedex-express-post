const express = require('express');
const jsonfile = require('jsonfile');
const app = express();
const file = "pokedex.json"

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

//search for pokemon
app.get('/pokemon/search', (request, response) => {
  //allows case-insensitive entry
  var smallLetter = request.query.q.toLowerCase();
  var capsFirst = smallLetter.charAt(0).toUpperCase();
  var combined = capsFirst+smallLetter.slice(1);
  //flags if search for pokemon name turns up negative
  var search = false;
  jsonfile.readFile(file, function(err,obj){
    for (var i = 0; i < obj["pokemon"].length; i++){
      if (obj["pokemon"][i]["name"] === combined){
        response.write(`
          Name: ${obj["pokemon"][i]["name"]} <br>
          Height: ${obj["pokemon"][i]["height"]} <br>
          Weight: ${obj["pokemon"][i]["weight"]} <br>
        `);
        response.end();
        search = true;
      }
    }
    if (combined === ""){
      response.send(`Welcome to the online Pokedex!`)
      search = true;
    }
    if (!search){
      response.status(404).send(
        `Could not find information about ${request.query.q} - Is that a new pokemon? Gotta catch em' all!`
      );
    }
  });
})
//allows user to enter in new pokemon
app.get('/pokemon/new',(request,response)=>{
  response.send(`
    <form method="POST" action="/pokemon">
      ID:
      <input type="text" name="id" placeholder="1"><br>
      Num:
      <input type="text" name="num" placeholder="001"><br>
      Name:
      <input type="text" name="name" placeholder="Bulbasaur"><br>
      Image:
      <input type="text" name="image" placeholder="image url goes here"><br>
      Height:
      <input type="text" name="height" placeholder="height in m"><br>
      Weight:
      <input type="text" name="weight" placeholder="weight in kg"><br>
      <br><br><br>
      <input type="submit" value="Submit">
    </form>
`);
});

app.post('/pokemon', function(request, response) {
  jsonfile.readFile(file, function(err,obj){
    console.log(request.body);
    obj["pokemon"].push(request.body);
    jsonfile.writeFile(file,obj,(err) => {
      if(err){
        console.error(err)
      };
      response.send("New pokemon added!");
    });
  })
});

app.get('/', function(request, response){
  var list = [];
  var listHolder = "";
  var form = `
    <form method="GET" action="/">
    <select name ="sortby" action="/" onchange="this.form.submit()">
      <option disabled selected value>Select an option</option>
      <option value="weight">Sort by weight</option>
      <option value="height">Sort by height</option>
      <option value="name">Sort by name</option>
    </select>
    </form>`
  if (request.query.sortby === "name"){


    jsonfile.readFile(file, function(err,obj){
      for (var i = 0; i < obj["pokemon"].length; i++){
        list.push(obj["pokemon"][i]["name"]);
      }
      list.sort();
      for (var j = 0; j < list.length; j++){
        listHolder += `<li>${list[j]}</li>`
      }
      response.send(`<h1>List of pokemon sorted by name:</h1>${form}<br><ul>${listHolder}</ul>`)
    });
  }else if (request.query.sortby === "weight"){
    jsonfile.readFile(file, function(err,obj){
    function compareValues(key){
      return function (a,b){
        if(!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
        return 0;
        }
        let varA = parseFloat(a[key])
        let varB = parseFloat(b[key])
        return varA-varB;
      }
    }
      list = obj["pokemon"].sort(compareValues("weight"));
      for (var i = 0; i < list.length; i++){
        listHolder += `<li>${list[i]["name"]} - ${list[i]["weight"]}</li>`
      }
      response.send(`<h1>List of pokemon sorted by weight:</h1>${form}<br><ul>${listHolder}</ul>`)
    });
  }else if (request.query.sortby === "height"){
    jsonfile.readFile(file, function(err,obj){
    function compareValues(key){
      return function (a,b){
        if(!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
        return 0;
        }
        let varA = parseFloat(a[key])
        let varB = parseFloat(b[key])
        return varA-varB;
      }
    }
      list = obj["pokemon"].sort(compareValues("height"));
      for (var i = 0; i < list.length; i++){
        listHolder += `<li>${list[i]["name"]} - ${list[i]["height"]}</li>`
      }
      response.send(`<h1>List of pokemon sorted by height:</h1>${form}<br><ul>${listHolder}</ul>`)
    });
  }else {
    var list = "";
    jsonfile.readFile(file, function(err,obj){
      for (var i = 0; i < obj["pokemon"].length; i++){
        list += `<li>${obj["pokemon"][i]["name"]}</li>`;
      }
      response.send(`<h1>List of pokemon:</h1>${form}<br><ul>${list}</ul>`)
    });
  }
});

app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));
