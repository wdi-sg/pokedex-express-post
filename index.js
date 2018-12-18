const express = require('express');
const jsonfile = require('jsonfile');
const FILE = 'pokedex.json';
const app = express();
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

app.get('/', (request, response) => {
  jsonfile.readFile(FILE, (err, obj) => {
    let pokeNameArr = [];
    let pokeImgArr = [];
    let pokeNumArr = [];
    for (let i=0; i<obj.pokemon.length; i++) {
      pokeNameArr.push(`${obj.pokemon[i].name}<br>`)
      pokeImgArr.push(obj.pokemon[i].img)
      pokeNumArr.push(obj.pokemon[i].num)
    }
    if (request.query.sortby == "nameAescend") {
      pokeNameArr = pokeNameArr.sort();      
    }
    if (request.query.sortby == "indexAescend") {
      pokeNameArr == pokeNameArr;
    }
    if (request.query.sortby == "indexDescend") {
      pokeNameArr = pokeNameArr.reverse();
    }
      response.send(`
      <html>
      <body>
      <h1>Welcome to the online Pokedex!<br><br></h1>
      <form action="/" method="GET">
      <select type='text' name='sortby'>
        <option value="nameAescend">Sort by Ascending Name</option>
        <option value="indexAescend">Sort by Aescending Index</option>
        <option value="indexDescend">Sort by Descending Index</option>
      </select>
        <input type="submit"/>
      </form><br>
      <p>
      Here is a list of all pokemons:<br><br>
        ${pokeNameArr.join("")}
      </p>
      </body>
      </html>
      `)

  })
})

app.get("/:pokemon", (request, response) => {
  jsonfile.readFile(FILE, (err, obj) => {
    for (let i=0; i<obj.pokemon.length; i++) {
      if (obj.pokemon[i].name.toLowerCase() == request.params.pokemon.toLowerCase()) {
        if (obj.pokemon[i].type == undefined) {
          response.send(`
          <h1>${obj.pokemon[i].name} #${obj.pokemon[i].num}</h1>
          <div><img src="${obj.pokemon[i].img}"></div><br>
          Height: ${obj.pokemon[i].height}<br>
          Weight: ${obj.pokemon[i].weight}<br>`);
        } else {
          response.send(`
          <h1>${obj.pokemon[i].name} #${obj.pokemon[i].num}</h1>
          <div><img src="${obj.pokemon[i].img}"></div><br>
          Height: ${obj.pokemon[i].height}<br>
          Weight: ${obj.pokemon[i].weight}<br>
          Type: ${obj.pokemon[i].type.join(", ")}<br>`);
        }
      };
      if (err) {
        response.status(404);
        response.send(`Could not find information about ${request.params.pokemon} - Is that a new pokemon? Gotta catch em' all!`);
      };
    };
  });
});

app.get('/:pokemon/newtype', (request, response) => {
  jsonfile.readFile(FILE, (err, obj) => {
    for (let i=0; i<obj.pokemon.length; i++) {
      if (obj.pokemon[i].name.toLowerCase() == request.params.pokemon.toLowerCase()) {
        let form = `
        <html>
        <body>
        <h1>Add a type to the pokemon ${obj.pokemon[i].name}!</h1>
        <form action="/pokemontype" method="POST">
          <select type='text' name="pokemon">
            <option>${obj.pokemon[i].name}</option>
          </select>
          <select type='text' name="poketype">
            <option>Fire</option>
            <option>Ice</option>
            <option>Water</option>
            <option>Normal</option>
            <option>Grass</option>
            <option>Electric</option>
            <option>Psychic</option>
            <option>Rock</option>
          </select>
          <input type="submit"/>
        </form>
        </body>
        </html>`;
        response.send(form);
      }
      
      if (err) {
        response.status(404);
        response.send(`Could not find the pokemon ${request.params.pokemon} to add a type.<br>Is that a new pokemon? Gotta catch 'em all!`)
      }
    }
  })

})

app.post('/pokemontype', (request, response) => {
  let addType = request.body.poketype
  let addToPoke = request.body.pokemon
  jsonfile.readFile(FILE, (err, obj) => {
    for (let i=0; i<obj.pokemon.length; i++) {
      if (obj.pokemon[i].name == addToPoke) {
        if (obj.pokemon[i].type == undefined) {
          obj.pokemon[i].type = [];
        }
        if (obj.pokemon[i].type.includes(addType)) {
          response.send(`<h1>No adding needed, ${addType} type have already been added to the pokemon ${addToPoke} previously!</h1><br><br>
          <p>Click <form action="/${addToPoke}" method="GET"><input type="submit" value="here"/></form> to see the pokemon's details!</p>`)
        } else {
          obj.pokemon[i].type.push(addType);
          jsonfile.writeFile(FILE, obj, (err) => {
            if (err) { console.log(err) };
          })
          response.send(`<h1>${addType} type have been added to the pokemon ${addToPoke}!</h1><br><br>
          <p>Click <span style="display: inline;"><form action="/${addToPoke}" method="GET"><input type="submit" value="here"/></form></span> to see the pokemon's details!</p>`)        
        }
      }
    }
  })
})


app.get('/pokemon/new', (request, response) => {
  let form = `
  <html>
  <body>
  <h1>Add your new pokemon!</h1>
  <form action="/pokemon" method="POST">
    <input name="pokeid" placeholder="New pokemon's ID"/><br>
    <input name="pokenum" placeholder="New pokemon's num"/><br>
    <input name="pokename" placeholder="New pokemon's name"/><br>
    <input name="pokeimg" placeholder="New pokemon's img"/><br>
    <input name="pokeheight" placeholder="New Pokemon's height"/><br>
    <input name="pokeweight" placeholder="New pokemon's weight"/><br>
    <input type="submit"/>
  </form>
  </body>
  </html>`;
  response.send(form);
});

app.post('/pokemon', (request, response) => {
  console.log(request.body.pokeid);
  let newId = parseInt(request.body.pokeid);
  let newNum = parseInt(request.body.pokenum);
  let newName = request.body.pokename;
  let newImg = request.body.pokeimg;
  let newHeight = request.body.pokeheight;
  let newWeight = request.body.pokeweight;
  jsonfile.readFile(FILE, (err, obj) => {
    for (let i=0; i<obj.pokemon.length; i++) {
      if (newId == obj.pokemon[i].id) {
        newId += 1;
        newNum += 1;
      }
    }
    newNum = ("00" + newNum).slice(-3);
    tempObj = {
      "id": `${newId}`,
      "num": `${newNum}`,
      "name": `${newName}`,
      "img": `${newImg}`,
      "height": `${newHeight}`,
      "weight": `${newWeight}`
    };
    obj.pokemon.push(tempObj);
    jsonfile.writeFile(FILE, obj, (err) => {
      if (err) { console.log(err) };
      console.log("New pokemon added!");
    });
    response.send(`
    <h1>New pokemon added!</h1><br>
    New pokemon Index: ${newId}<br>
    New pokemon Name: ${request.body.pokename}<br>
    New pokemon Height: ${request.body.pokeheight}<br>
    New pokemon Weight: ${request.body.pokeweight}
    `);
  })
})

app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));
