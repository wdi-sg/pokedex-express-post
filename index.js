const express = require('express');
const jsonfile = require('jsonfile');

const FILE = 'pokedex.json';

// Init express app
const app = express();

const MARIA = "HELLO MARIA";


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
// app.get('/pokemon/new', (request, response) => {
//   response.render ('new');
//   // response.send(`<form method="GET" action="/pokemon">
//   //             Submit New Pokemon: <br/>
//   //             ID:
//   //             <input type="number" name="id"/> <br/>
//   //             Number:
//   //             <input type="number" name="num"/> <br/>
//   //             Name:
//   //             <input type="text" name="name"/> <br/>
//   //             Image URL:
//   //             <input type="url" name="img"/> <br/>
//   //             Height:
//   //             <input type="number" name="height"/> <br/>
//   //             Weight:
//   //             <input type="number" name="weight"/> <br/>

//   //             <input type="submit" value="Submit"/>
//   //           </form>`);
// });



app.get('/pokemon/:id', (request, response) => {
    if(request.params.id === "new") {
        response.render('home');
    } else {

  // get json from specified file
  jsonfile.readFile(FILE, (err, obj) => {
    // obj is the object from the pokedex json file
    // extract input data from request
    let inputId = parseInt( request.params.id );

    var pokemon;


    // find pokemon by id from the pokedex json file
    for( let i=0; i<obj.pokemon.length; i++ ){

      let currentPokemon = obj.pokemon[i];

      if( currentPokemon.id === inputId ){
        pokemon = currentPokemon;
        response.send(pokemon);
      }

}
    if (pokemon === undefined) {

      // send 404 back
      response.status(404);
      response.send(" 404 not found");
      } else {


    response.render('submission');
}




  });
}
});


// new
app.get('/pokemon', (request, response) => {

    jsonfile.readFile(FILE, (err, obj) => {
        const data = {
            list: ""
        }
        if (err) console.log(err);
        for (let i=0; i<obj.pokemon.length; i++) {
            data.list += `${obj.pokemon[i].name}\n`;
        };
        response.render('home');
    });
});





app.post('/pokemon', function(request, response) {

    jsonfile.readFile(FILE, (err, obj) => {
        if (err) console.log(err);

        obj.pokemon.push(request.body);

        jsonfile.writeFile(FILE, obj, (err) => {
            if (err) console.log(err)
        });
    });

    response.render('submission', request.body);
});

/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));