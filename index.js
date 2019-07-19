/**
 * ===================================
 * Configurations and set up
 * ===================================
 */
//Require packages
const express = require('express');
const jsonfile = require('jsonfile');

//Define pokedex.json
const FILE = 'pokedex.json';

// Init express app
const app = express();

//Use the following modules
app.use(express.json()); 
app.use(express.urlencoded({
  extended: true
}));

//Use files
app.use(express.static('public'));

//React Initiation
// this line below, sets a layout look to your express project
const reactEngine = require('express-react-views').createEngine();
app.engine('jsx', reactEngine);

// this tells express where to look for the view files
app.set('views', __dirname + '/views');

// this line sets react to be the default view engine
app.set('view engine', 'jsx');

//MethodOveride package initiation
const methodOverride = require('method-override')
app.use(methodOverride('_method'));

/**
 * ===================================
 * Routes
 * ===================================
 */

app.get('/', (request,response) => {
  response.redirect('/pokemon');
});


app.get('/pokemon', (request,response) => {
  console.log('hello');
    jsonfile.readFile(FILE, (err, obj) => {
        switch (request.query.sortby){
          case 'name':
            obj.pokemon.sort((a,b) => {
              if (a.name.toLowerCase() >= b.name.toLowerCase()){
                return 1;
              } else if (a.name.toLowerCase() <= b.name.toLowerCase()) {
                return -1;
              } else {
                return 0;
              }
            });

            var data = {
              pokedex: obj.pokemon,
              query: 'Name'
            };

            response.render('main',data);
            break;

          case 'weight':
            obj.pokemon.sort((a,b) => {
              return parseFloat(a.weight) - parseFloat(b.weight);
            });

            var data = {
              pokedex: obj.pokemon,
              query: 'Weight'
            };

            response.render('main',data);
            break;

          case 'height':
            obj.pokemon.sort((a,b) => {
              return parseFloat(a.height) - parseFloat(b.height);
            });

            var data = {
              pokedex: obj.pokemon,
              query: 'Height'
            };

            response.render('main',data);
            break;

          default:
            var data = {
              pokedex: obj.pokemon,
              query: 'ID'
            };

            response.render('main',data);
            break;
        }
    });
});

app.get('/pokemon/existing/:id', (request,response) => {
    jsonfile.readFile(FILE, (err, obj) => {
      var data = {
        pokemon: obj.pokemon[request.params.id-1  ]
      }

      response.render('pokemon',data);
    });
});

app.get('/pokemon/existing/:id/edit', (request,response) => {
    jsonfile.readFile(FILE, (err, obj) => {
      var data = {
        pokemon: obj.pokemon[request.params.id-1]
      }

      response.render('pokemonEdit',data);
    });
});


app.put('/pokemon/existing/:id/edit', (request,response) => {
    jsonfile.readFile(FILE, (err, obj) => {
      let pokemon = obj.pokemon[request.params.id-1];
      let change = request.body;
      pokemon.name = change.name;
      pokemon.height = `${change.height}m`;
      pokemon.weight = `${change.weight}kg`;
      pokemon.img = change.img;
      pokemon.egg = change.egg;
      pokemon.avg_spawns = change.avg_spawns;
      pokemon.spawn_time = change.spawn_time;

      jsonfile.writeFile(FILE, obj, (err) => {
      });
      response.redirect(`/pokemon/existing/${request.params.id}`);
    });
});


app.get('/pokemon/existing/:id/delete', (request,response) => {
    jsonfile.readFile(FILE, (err, obj) => {
      var data = {
        pokemon: obj.pokemon[request.params.id-1]
      }
      response.render('deleteConfirm',data);
    });
});

app.delete('/pokemon/existing/:id/delete', (request,response) => {
    jsonfile.readFile(FILE, (err, obj) => {
      obj.pokemon.splice(request.params.id-1,1);
      jsonfile.writeFile(FILE, obj, (err) => {
      });
      response.redirect('/pokemon');

    });
});

app.get('/pokemon/new', (request,response) => {
      response.render('newPokemon');
});

app.post('/pokemon/new', (request,response) => {
      jsonfile.readFile(FILE, (err, obj) => {
        obj.latestKey = obj.pokemon.length+1;

        obj.pokemon[obj.latestKey-1] = {
            id: obj.latestKey,
            num: obj.latestKey,
            name: request.body.name,
            height: request.body.height,
            weight: request.body.weight,
            img: request.body.img,
            egg: request.body.egg,
            type: [request.body.type],
            weaknesses: [request.body.weaknesses],
            avg_spawns: request.body.avg_spawns,
            spawn_time:request.body.spawn_time
        };

      jsonfile.writeFile(FILE, obj, (err)=>{
      });
      response.redirect(`/pokemon/existing/${obj.latestKey}`);

      });
});

app.get('/pokemon/type/:type', (request,response) => {
    jsonfile.readFile(FILE, (err,obj) => {
      data = {
        pokemonByType: []
      }

      for(var i=0; i<obj.pokemon.length-1;i++){
        if (obj.pokemon[i].type.includes(request.params.type)){
          data.pokemonByType.push(obj.pokemon[i]);
        }
      }

      response.render('typePokemon',data);

    });    
});

/*
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));

