const express = require('express');
const jsonfile = require('jsonfile');

const FILE = 'pokedex.json';

const methodOverride = require('method-override')


// Init express app
const app = express();

app.use(methodOverride('_method'));



/**
 * ===================================
 * Configurations and set up
 * ===================================
 */
// this line below, sets a layout look to your express project
const reactEngine = require('express-react-views').createEngine();
app.engine('jsx', reactEngine);

// this tells express where to look for the view files
app.set('views', __dirname + '/views');

// this line sets react to be the default view engine
app.set('view engine', 'jsx');

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

// app.get('/', (req, res) => {
//   // running this will let express to run home.handlebars file in your views folder
//   res.render('home')
// })


/**
 * ===================================
 * Routes
 * ===================================
 */
// app.get("/pokemon/new", (request, response) => {
//     response.render('new');

// });

// app.post("/pokemon/new", (request, response) => {
//     jsonfile.readFile(FILE, (err, onj) => {
//         request.body.id = parseInt(request.body.id);
//         obj.pokemon.push(request.body);
//         jsonfile.writeFile(FILE, obj, (err) => {
//             response.redirect(`/pokemon/${request.body.id}`);
//         });

//     });
// });

//old//


// app.get('/pokemon/:id', (request, response) => {
//     if(request.params.id === "new") {
//         response.render('home');
//     } else {

//   // get json from specified file
//   jsonfile.readFile(FILE, (err, obj) => {
//     // obj is the object from the pokedex json file
//     // extract input data from request
//     let inputId = parseInt( request.params.id );

//     var pokemon;


//     // find pokemon by id from the pokedex json file
//     for( let i=0; i<obj.pokemon.length; i++ ){

//       let currentPokemon = obj.pokemon[i];

//       if( currentPokemon.id === inputId ){
//         pokemon = currentPokemon;
//         // response.send(pokemon);
//       }

// }
//     if (pokemon === undefined || request.params.id === "new") {
//        response.render('new');
//       // send 404 back
//       // response.status(404);
//       // response.send(" 404 not found");
//       let newPokemon = request.body;
//       // newPokemon.id = parseInt(newPokemon.id);


//       } else {
//         newPokemon.id = parseInt(newPokemon.id);
//         let nameExit = false;

//         jsonfile.readFile(FILE, (err, obj) => {
//             for(let i = 0; obj.pokemon.length; i++) {
//                 if (newPokemon.name === obj.pokemon[i]name) {
//                     let wrongName = {message: "The name already exists!"};
//                     response.render('new', wrong);
//                     nameExist = true;
//                 }
//             }
//         })

//     response.send(pokemon);
//     response.render('submission', pokemon);
// }




//   });
// }
// });


// // new
// app.get('/pokemon', (request, response) => {

//     jsonfile.readFile(FILE, (err, obj) => {
//         const data = {
//             list: ""
//         }
//         if (err) console.log(err);
//         for (let i=0; i<obj.pokemon.length; i++) {
//             data.list += `${obj.pokemon[i].name}\n`;
//         };
//         response.render('home');
//     });
// });





// app.post('/pokemon', function(request, response) {

//     jsonfile.readFile(FILE, (err, obj) => {
//         if (err) console.log(err);

//         obj.pokemon.push(request.body);

//         jsonfile.writeFile(FILE, obj, (err) => {
//             if (err) console.log(err)
//         });
//     });

//     response.render('submission', pokemon);
// });

//end of old


//intro screen
app.get('/', (request, response) => {
    response.render("intro");
});

app.get('/pokemon/new', (request, response) => {
  response.render ('new');
});

app.get('/pokemon/:id', (request, response) => {
  // get json from specified file
  jsonfile.readFile(FILE, (err, obj) => {
    let id = request.params.id;
    let pokemon;


   //find pokemon from the jsonfile
    for( let i=0; i<obj.pokemon.length; i++ ){

      let currentPokemon = obj.pokemon[i];

      if( currentPokemon.id == id ){

        pokemon = currentPokemon;
      }
    }







    const data = {
      pokemon: pokemon,
      id : id,
      pokedex: obj.pokemon[id]
    }



    if (pokemon === undefined) {
      // send 404 back
      response.status(404);
      response.send("not found");
    } else {
      console.log("found" + pokemon.name)
      response.render('show', data);


    }
  });
});

app.get('/pokemon', (request, response) => {
  jsonfile.readFile(FILE, (err, obj) => {
    data = {
      pokedex : obj.pokemon
    }
    response.render ('index', data);
  });
});

app.post('/pokemon', (request, response) => {
  // let keys = Object.keys(request.body);
  const body = request.body;
  let data = {
    body : body
  }

  console.log(body);
  jsonfile.readFile(FILE, (err, obj) => {
  obj.pokemon.push(request.body);
    // save the request body
    jsonfile.writeFile(FILE, obj, {spaces:2}, (err) => {
      console.error(err)
    });
  });
  response.render('create', data);
  // }
});

app.get('/pokemon/:id/edit', (request, response) => {
  let id = parseInt(request.params.id)-1;

  jsonfile.readFile(FILE, (err, obj) => {
    console.log(obj.pokemon[id]);
    const pokemon = obj.pokemon[id];

    const data = {
      id : id,
      pokemon : pokemon
    };
    response.render('edit', data);
  });
});

app.put('/pokemon/:id', (request, response) => {
  let id = parseInt(request.params.id)-1;
  let editedPokemon = request.body;
  console.log("wtf");
  jsonfile.readFile (FILE, (err, obj) => {
    obj.pokemon[id] = editedPokemon;
    jsonfile.writeFile(FILE, obj, {spaces:2}, (err) => {
      console.log(err);
    });
    // response.render(show);
    response.send("Pokemon edited");
  });
});

app.get('/pokemon/:id/delete', (request, response) => {
  let id = parseInt(request.params.id)-1;

  jsonfile.readFile(FILE, (err, obj) => {
    console.log(obj.pokemon[id]);
    const pokemon = obj.pokemon[id];

    const data = {
      id : id,
      pokemon : pokemon
    };
    response.render('delete', data);
  });
})

app.delete('/pokemon/:id', (request, response) => {
  let id = parseInt(request.params.id)-1;
  jsonfile.readFile (FILE, (err, obj) => {
    obj.pokemon.splice(id, 1);
    jsonfile.writeFile(FILE, obj, {space:2}, (err) => {
      console.log(err);
    });
    response.send("Pokemon deleted")
  })
})





/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));