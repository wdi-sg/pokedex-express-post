#########################################

const jsonfile = require('jsonfile');
const file = 'pokedex.json';
const express = require('express');
const app = express();
var listOfOptions = [];

// tell your app to use the module
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

// Expose a new endpoint that intercepts GET requests to /pokemon/new, which responds with a HTML page with a form that has these fields: id, num, name, img, height, and weight
// Point the form to submit data to the (/pokemon) route using POST method
app.get('/pokemon/new', (request, response) => {
      // render a template form here
    let form =
        "<html>" +
        "<body>" +
            "<form method='POST' action='/pokemon'>" +
            "ID:<br><input type='text' name='id'><br><br>" +
            "Num:<br><input type='text' name='num'><br><br>" +
            "Name:<br><input type='text' name='name'><br><br>" +
            "Img:<br><input type='text' name='img'><br><br>" +
            "Height:<br><input type='text' name='height'><br><br>" +
            "Weight:<br><input type='text' name='weight'><br><br>" +
            "<input type='submit' value='Submit'>" +
        "</form>" +
        "</body>" +
        "</html>"
    response.send(form);
});

// Expose a new endpoint that accepts POST requests to /pokemon, which parses the form data and saves the new pokemon data into pokedex.json
app.post('/pokemon', function(request, response) {
    //debug code (output request body)
    console.log(request.body);

    jsonfile.readFile(file, (err, obj) => {
        let newPokemon = {
              "id": obj.pokemon.length+1,
              "num": (obj.pokemon.length+1).toString(),
              "name": request.body.name,
              "img": request.body.img,
              "height": request.body.height,
              "weight": request.body.weight,
        }
        obj.pokemon.push(newPokemon);
        // save the request body
        jsonfile.writeFile(file, obj, (err) => {
         console.error(err)
        // now look inside your json file
        response.send(newPokemon);
        });
    });
});

//// At the root route (GET request) / display a list of all the pokemons in the pokedex
//// Add a "Sort by name" button to the homepage (/ route) that when clicked, sends a GET request with a query parameter specifying "?sortby=name" ( this requests a whole new page )
//// Implement this sort functionality as a drop down (select input) of all the sorting fields the user can choose to sort by.
app.get('/', (request, response) => {
    jsonfile.readFile(file, (err, obj) => {
        let htmlHome =
            "<!DOCTYPE html>" +
            "<html>" +
                "<body>" +
                    "<form action='/' method='GET'>" +
                    "<select name='sortby' style='font-size: 20px; padding: 10px 50px; margin-left: 20px;'>" +
                    // listOfOptions.join("") +
                ////manual key in of option value for this assignment instead of using listOfOptions array.
                    "<option value='numasc' style='font-size:15px;'>Id # (ascending)</option>" +
                    "<option value='numdesc' style='font-size:15px;'>Id # (descending)</option>" +
                    "<option value='nameasc' style='font-size:15px;'>Name (ascending)</option>" +
                    "<option value='namedesc' style='font-size:15px;'>Name (descending)</option>" +
                    "</select>" +
                    "<input type='submit' value='Sort' id='sort' style='background-color: DeepSkyBlue; padding: 5px 25px; margin-left: 10px; display: inline-block; border-radius: 5px; color: white; font-size: 15px'>" +
                    "</form><br>";

    ////sort objects based on drop-down selected
        console.log(request.query.sortby);
        switch (request.query.sortby) {
            case "numasc":
            obj.pokemon.sort((numA, numB) =>{
                if (numA.num > numB.num) {
                    return 1;
                } else if (numA.num < numB.num) {
                    return -1;
                }
            })
            break;
            case "numdesc":
            obj.pokemon.sort((numA, numB) =>{
                if (numA.num > numB.num) {
                    return -1;
                } else if (numA.num < numB.num) {
                    return 1;
                }
            })
            break;
            case "nameasc":
            obj.pokemon.sort((nameA, nameB) =>{
                if (nameA.name > nameB.name) {
                    return 1;
                } else if (nameA.name < nameB.name) {
                    return -1;
                }
            })
            break;
            case "namedesc":
            obj.pokemon.sort((nameA, nameB) =>{
                if (nameA.name > nameB.name) {
                    return -1;
                } else if (nameA.name < nameB.name) {
                    return 1;
                }
            })
            break;
            }

    ////create html for list of Pokemons
        for (i = 0; i < obj.pokemon.length; i ++) {
        htmlHome = htmlHome +
            "<div id=" + obj.pokemon[i].num + " style='display: inline-block; margin: 20px; float: left;'>" +
            "<img src=" + obj.pokemon[i].img +  " style = 'background-color: gainsboro; width: 200px;''>" +
            "<p style='text-align: center'>#" + obj.pokemon[i].num + "</p>" +
            "<h1 style='font-size: 25px; text-align: center'>" + obj.pokemon[i].name + "</h1>" +
            "</div>"
        };
        // let listOfKeys = Object.keys(obj.pokemon[0]);
        // for (j = 0; j < listOfKeys.length; j++) {
        //     listOfOptions.push("<option value='" + listOfKeys[j] + "' style='font-size:20px;'>" + listOfKeys[j] + "</option>")
        // }
////create html for home page
    htmlHome = htmlHome + "</body>" + "</html>"
    response.send(htmlHome);
    })
})



app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));


################################################

const express = require('express');
const app = express();
const jsonfile = require('jsonfile');
const file = 'pokedex.json';

const newPokemonForm =  "<html>" +
                            "<body>" +
                                "<form method='POST' action='/pokemon'>" +
                                    "<input type='text' name='name' placeholder='Name'><br/><br/>" +
                                    "<input type='text' name='img' placeholder='Image URL'><br/><br/>" +
                                    "<input type='text' name='height' placeholder='Height'><br/><br/>" +
                                    "<input type='text' name='weight' placeholder='Weight'><br/><br/>" +
                                    "<input type='submit'><br/><br/>" +
                                "</form>" +
                            "</body>" +
                        "</html>";

const dropdownMenu =    "<form method='GET' action='/'>" +
                            "<select name='sortby'>" +
                                "<option>Number</option>" +
                                "<option value='name'>Name</option>" +
                                "<option value='height'>Height</option>" +
                                "<option value='weight'>Weight</option>" +
                            "</select>" +
                            "<input type='submit'>" +
                        "</form>";

const cssString =   `<style>
                        div{
                            display: inline-block;
                            width: 120px;
                            height: 120px;
                            text-align:center;
                            margin: 10px 20px 10px 20px;
                        }
                        h1{
                            font-family: "Verdana", sans-serif;
                            font-size: 16pt;
                            margin: 3px auto;
                        }
                        img{
                            width: 100%;
                            height: 100%;
                        }
                        p{
                            font-family: "Arial", sans-serif;
                            font-size: 12pt;
                            margin: 3px auto;
                        }
                    </style>`

var pokedex = [];

app.use(express.json());

app.use(express.urlencoded({
  extended: true
}));

app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));

app.get('/pokemon/new', (request, response) => {
    jsonfile.readFile(file, (err,obj) => {
        initializeRead(err, obj);
        response.send(newPokemonForm);
    });
});

app.get('/', (request, response) => {
    let sortMethod = request.query.sortby;
    jsonfile.readFile(file, (err,obj) => {
        initializeRead(err, obj);
        response.send(dropdownMenu + cssString + sortPokedex(sortMethod));
    });
});

function sortPokedex(sortMethod){
    switch(sortMethod){
        case "name":
            return getHTMLString(pokedex.sort(stringComparator));
        case "weight":
            return getHTMLString(numberComparator(pokedex, "weight"));
        case "height":
            return getHTMLString(numberComparator(pokedex, "height"));
        default:
            return getHTMLString(pokedex);
    }
}

function getHTMLString(array){
    let resultString =  "";
    array.forEach(pokemon => {
        resultString+= `
            <div>
                <img src="${pokemon.img}">
                <h1>${pokemon.name}</h1>
                <p>#${pokemon.num}</p>
            </div>
            `
    });
    return resultString;
}

function stringComparator(first,second){
    if (first.name < second.name){
        return -1;
    } else if (first.name > second.name){
        return 1;
    } else {
        return 0;
    }
}

function numberComparator(array, category){
    return array.sort((first, second) => {
        return (parseFloat(first[category]) > parseFloat(second[category])) ? 1 : -1;
    });
}

app.post('/pokemon', (request, response) => {
    jsonfile.readFile(file, (err, obj) => {
        initializeRead(err, obj);
        let userInput = request.body;
        let newPokemon = generateNewPokemon(userInput);
        pokedex.push(newPokemon);
        jsonfile.writeFile(file, obj, (err) => {
            if (err) { console.error(err) };
            response.send(dropdownMenu + cssString + sortPokedex("default"));
        });
    });
});

function initializeRead(err, obj){
    if (err) { console.error(err) };
    pokedex = obj.pokemon;
}

function getPokemonName(pokemon){
    return pokemon.name;
}

function generateNewPokemon(userInput){
    let obj = {
            "id": pokedex.length + 1,
            "num": (pokedex.length + 1).toString(),
            "name": userInput.name,
            "img": userInput.img,
            "height": userInput.height,
            "weight": userInput.weight,
            "candy": "None",
            "egg": "Not in Eggs",
            "avg_spawns": 0,
            "spawn_time": "N/A"
        }
    return obj;
}

####################################################

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

################################################

/**
 * ===================================
 * Configs
 * ===================================
 */
const express = require('express');
const jsonfile = require('jsonfile');
const pokedex = 'pokedex.json';
const app = express();
const Request = require("request");
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
// this line below, sets a layout look to your express project
const reactEngine = require('express-react-views').createEngine();
app.engine('jsx', reactEngine);
// this tells express where to look for the view files
app.set('views', __dirname + '/views');
// this line sets react to be the default view engine
app.set('view engine', 'jsx');

/**
 * ===================================
 * Routes
 * ===================================
 */

// app.get('/:id', (request, response) => {
//   // get json from specified file
//   jsonfile.readFile(pokedex, (err, obj) => {
//     // obj is the object from the pokedex json file
//     // extract input data from request
//     let inputId = parseInt( request.params.id );
//     var pokemon;
//     // find pokemon by id from the pokedex json file
//     for( let i=0; i<obj.pokemon.length; i++ ){
//       let currentPokemon = obj.pokemon[i];
//       if( currentPokemon.id === inputId ){
//         pokemon = currentPokemon;
//       }
//     }
//     if (pokemon === undefined) {
//       // send 404 back
//       response.status(404);
//       response.send("not found");
//     } else {
//       let html =
//       `<!DOCTYPE html>
//         <html>
//         <head>
//           <meta charset="utf-8">
//           <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
//           <title>GA Pokedex</title>
//           <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous">
//           <link href="https://fonts.googleapis.com/css?family=Thasadith" rel="stylesheet">
//           <link rel="stylesheet" type="text/css" href="styles.css">
//         </head>
//         <body>
//             <div class="container">
//                     <img src=${pokemon.img}>
//                     <ul>
//                         <li>Number: #${pokemon.num}</li>
//                         <li>Name: ${pokemon.name}</li>
//                         <li>Height: ${pokemon.height}</li>
//                         <li>Weight: ${pokemon.weight}</li>
//                         <li>Type: ${pokemon.type}</li>
//                     </ul>
//                 <form name="type" method="POST" action='/pokemon/${pokemon.id}''>
//                     Pokemon Type: <select name='type'>
//                              <option value='normal'>Normal</option>
//                              <option value='fire'>Fire</option>
//                              <option value='water'>Water</option>
//                              <option value='electric'>Electric</option>
//                              <option value='grass'>Grass</option>
//                              <option value='ice'>Ice</option>
//                              <option value='fighting'>Fighting</option>
//                              <option value='poison'>Poison</option>
//                              <option value='ground'>Ground</option>
//                              <option value='flying'>Flying</option>
//                              <option value='psychic'>Psychic</option>
//                              <option value='bug'>Bug</option>
//                              <option value='rock'>Rock</option>
//                              <option value='ghost'>Ghost</option>
//                              <option value='dragon'>Dragon</option>
//                              <option value='dark'>Dark</option>
//                              <option value='steel'>Steel</option>
//                              <option value='fairy'>Fairy</option>
//                              </select>
//                     <input type='submit'/>
//                 </form>
//             </div>
//         </body>
//         </html>`
//       response.send(html);
//     }
//   });
// });

// //add pokemon types
// app.post("/pokemon/:id", (request, response) => {
//     jsonfile.readFile(pokedex, (err, obj) => {
//         let currentPokedex = obj;
//         let currentPokemon = obj.pokemon[request.params.id -1];
//         if (currentPokemon["type"] === undefined) {currentPokemon["type"] = [];};
//         currentPokemon["type"].push(request.body.type);
//         currentPokedex.pokemon[request.params.id -1] = currentPokemon;
//         jsonfile.writeFile("pokedex.json", currentPokedex, (err) => {
//             console.log(err);
//             // response.send(currentPokemon);
//             response.redirect(`http://localhost:3000/${request.params.id}`);
//         });
//     });
// });

// //add new pokemon
// app.post("/pokemon", (request,response) => {

//     jsonfile.readFile(pokedex, (err, obj) => {
//         let currentPokedex = obj;
//         let newPokemon = {
//           "id": currentPokedex.pokemon.length+1,
//           "num": (currentPokedex.pokemon.length+1).toString(),
//           "name": request.body.name,
//           "img": request.body.img,
//           "height": request.body.height,
//           "weight": request.body.weight,
//           "candy": "",
//           "candy_count": "",
//           "egg": "",
//           "avg_spawns": "",
//           "spawn_time": ""
//         }
//         currentPokedex.pokemon.push(newPokemon);
//         jsonfile.writeFile("pokedex.json", currentPokedex, (err) => {
//             console.log(err);
//             response.send(newPokemon);
//         });
//     });
// });


//REACT REFACTORING
//homepage. display all with sort
app.get('/', (request, response) => {
    jsonfile.readFile(pokedex, (err, obj) => {

        let pokedexAndSort = {};
        pokedexAndSort.pokedex = obj.pokemon;
        pokedexAndSort.sortby = request.query.sortby;

        response.render("pokemons", pokedexAndSort);
    });
});

//new pokemon form page
app.get("/pokemon/new", (request,response) => {
    response.render("newpokemon");
});

//create new pokemon
app.post("/pokemon/new", (request,response) => {
    jsonfile.readFile(pokedex, (err, obj) => {
        let currentPokedex = obj;
        let randomPokemon;
        if (request.body.name === "random") {
            //I'm not stopping repeated pokemons
            console.log("HELLO");
            let randomNum = Math.floor(Math.random() * 809 + 1);
            Request.get("https://pokeapi.co/api/v2/pokemon/" + randomNum + "/", (error, response, body) => {
                if(error) {
                    return console.dir(error);
                }
                randomPokemon = body;
                console.log(randomPokemon);
            });

            let newPokemon = {
              "id": currentPokedex.pokemon.length+1,
              "num": (currentPokedex.pokemon.length+1).toString(),
              "name": randomPokemon.name,
              "img": `https://www.serebii.net/pokemongo/pokemon/${randomPokemon.id}.png`,
              "height": `${randomPokemon.height/10}.0 m`,
              "weight": `${randomPokemon.weight/10}.0 kg`,
              "candy": "",
              "candy_count": "",
              "egg": "",
              "avg_spawns": "",
              "spawn_time": ""
            };
        } else {
            let newPokemon = {
              "id": currentPokedex.pokemon.length+1,
              "num": (currentPokedex.pokemon.length+1).toString(),
              "name": request.body.name,
              "img": request.body.img,
              "height": request.body.height,
              "weight": request.body.weight,
              "candy": "",
              "candy_count": "",
              "egg": "",
              "avg_spawns": "",
              "spawn_time": ""
            };
        };

        currentPokedex.pokemon.push(newPokemon);
        jsonfile.writeFile("pokedex.json", currentPokedex, (err) => {
            console.log(err);
            response.render("pokemon", newPokemon);
        });
    });
});

/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));