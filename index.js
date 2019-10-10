const express = require('express');
const jsonfile = require('jsonfile');

const FILE = 'pokedex.json';
const methodOverride = require('method-override')
// Init express app
const app = express();

// tell your app to use the module
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

const reactEngine = require('express-react-views').createEngine();
app.engine('jsx', reactEngine);

// this tells express where to look for the view files
app.set('views', __dirname + '/views');

// this line sets react to be the default view engine
app.set('view engine', 'jsx');
/**
 * ===============================================================================================================================================
 * ALL THAT SET UP
 * ===============================================================================================================================================
 */


//ON LOADING LOCALHOST:3000==================================================================================================================
app.get('/', (request, response) => {
  response.send("Welcome");
});

//=====================================================================================================================================================

//ON LOADING LOCALHOST:3000/POKEMON/:ID==================================================================================================================
app.get('/pokemon', (request, response) => {
  if (request.query.sortby === "name"){
    console.log(request.query.sortby);
    jsonfile.readFile(FILE, (err, obj) => {
      if (err) console.log(err);
      let names = obj.pokemon.map(element => {
        return element["name"];
      })
      names.sort(function(a, b) {
        if (a < b) {
          return -1;
        }
        if (a > b) {
          return 1;
        }
      })
      const data = {
        names:names
      };
      
      response.render('namesorted.jsx' , data);
    });

  // } else if (request.query.sortby === "height"){

  // } else if (request.query.sortby === "weight"){

  } else {
    jsonfile.readFile(FILE, (err, obj) => {
      if (err) console.log(err);
      data={
        searched: []
      }
      for (i=0; i<obj.pokemon.length; i++){
        data.searched.push(obj.pokemon[i].name);
      };
        response.render('directory.jsx' , data);
    });
  }
});
 //=====================================================================================================================================================

//ON LOADING LOCALHOST:3000/POKEMON/:ID==================================================================================================================
app.get('/pokemon/:id', (request, response) => {
  if (request.params.id === "new") {
    response.render('new.jsx')
  } else {
    // get json from specified file
    jsonfile.readFile(FILE, (err, obj) => {
      // obj is the object from the pokedex json file
      // extract input data from request
      let inputId = parseInt( request.params.id );

      var data;
      // find pokemon by id from the pokedex json file
      for( let i=0; i<obj.pokemon.length; i++ ){
        let currentPokemon = obj.pokemon[i];
        if( currentPokemon.id === inputId ){
          data = currentPokemon;
        }
      };
      if (data === undefined) {
        // send 404 back
        response.status(404);
        response.send("not found");
      } else {
        response.render ('profile.jsx', data);
      }
    });
  }
});



//POSTING INPUT RESULTS INTO .JSON FILE, DISPLAYING OUTPUT IN /POKEMON======================================================
app.post('/pokemon', function(request, response) {

  //debug code (output request body)
  console.log("OMG there really is another Pokemon!" , request.body);

  // read the request body NOT WORKINGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG
  jsonfile.readFile(FILE, (err,obj) => {
    console.log(err);
    obj.pokemon.push(request.body);
  // save the request body
    jsonfile.writeFile( FILE, obj, {spaces :2}, (err) => {
      console.error(err);
    });
  });
  // now look inside your json file
  response.send(request.body);
});


app.get('/pokemon/:id/edit', (request,response) => {
  let pokeEdit = parseInt(request.params.id)-1;
  jsonfile.readFile(FILE, (err , obj) => {
    if (err) console.log(err);
    const data = {
      pokemon: obj.pokemon[pokeEdit],
      pokeEdit : pokeEdit
    }
  response.render('edit.jsx' , data)
  })
});

app.put('/pokemon/:id', (request,response) => {
  let id = parseInt(request.params.id);
    jsonfile.readFile(FILE, (err,obj) => {
      if (err) console.log(err);

      obj.pokemon[id] = request.body;

    jsonfile.writeFile(FILE, obj, {spaces:2}, (err) => {
      if (err) console.log(err);
    })
   })
  response.render('profile.jsx', request.body)
 });


app.get('/pokemon/:id/delete', (request,response) => {
  let id = parseInt(request.params.id);
  jsonfile.readFile(FILE, (err,obj) => {
    if (err) console.log(err);
    const data = {
      pokemon:obj.pokemon[id],
      id:id
    }
  response.render('delete.jsx', data);
  })
})

app.delete('/pokemon/:id', (request,response) => {
  let id = parseInt (request.params.id);
  jsonfile.readFile(FILE, (err, obj) => {
      if (err) console.log(err);
      obj.pokemon.splice(parseInt(id),1);

      jsonfile.writeFile(FILE, obj, {spaces:2}, (err) => {
          if (err) console.log(err)
      });
  });
// endpoint
  response.send("Pokemon: gone forever.")
})
/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));
