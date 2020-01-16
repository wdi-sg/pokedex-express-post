const express = require('express');
const jsonfile = require('jsonfile');
const methodOverride = require('method-override')
const reactEngine = require('express-react-views').createEngine();
const FILE = 'pokedex.json';

/**
 * ===================================
 * Configurations and set up
 * ===================================
 */

const app = express();
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

app.use(methodOverride('_method'));
app.engine('jsx', reactEngine);
app.set('views', __dirname + '/views');
app.set('view engine', 'jsx');
/**
 * ===================================
 * Routes
 * ===================================
 */
 app.get('/pokemon/new', (request, response)=>{
response.render("new");
})

app.get('/pokemon/:id', (request, response) => {

  jsonfile.readFile(FILE, (err, obj) => {
    if( err ){

      console.log("error with json read file:",err);
      response.status(503).send("error reading filee");
      return;
    }
    console.log("reading")
    let inputId = parseInt( request.params.id );

    var pokemon;

    // find pokemon by id from the pokedex json file
    for( let i=0; i<obj.pokemon.length; i++ ){

      let currentPokemon = obj.pokemon[i];

      if( currentPokemon.id === inputId ){
        console.log("CURERAERERAERAER POKEMON :" ,currentPokemon.id );
        pokemon = obj.pokemon[i];
        console.log("CURERAERERAERAER POKEMON :" ,pokemon );
      }
    }

    if (pokemon === undefined) {

      // send 404 back
      response.redirect(301, '/pokemon/new');

    } else {

      response.render('pokemon' , pokemon);
    }
  });
});

app.get('/', (request, response) => {
  response.send("yay");
});


app.post('/pokemon', (request, response) => {
    // console.log(request)
        jsonfile.readFile(FILE, (err, obj) =>{
        var input = {
            id: parseInt(request.body.id),
            num: request.body.num,
            name: request.body.name,
            img: request.body.img,
            height: request.body.height,
            weight: request.body.weight
        };
            // var errorArr = [];
            // var dataerror = {};
            //     for(var i in input){
            //         console.log(i); // alerts key
            //         console.log(input[i]); //alerts key's value
            //         if(input[i] === ''){
            //             errorArr.push(i);
            //         }
            //     }
            //     dataerror = {errorArr}
            //     console.log(dataerror)

      //debug code (output request body)
        console.error(err);
        obj["pokemon"].push(input);
        jsonfile.writeFile(FILE, obj, (err) => {

        });
    response.send(input);
    })
    // body...
})

app.put('/pokemon/:id/edit', (request, response) => {

    const inputId = parseInt(request.params.id)

    console.log("This is the index: " + inputId);
    console.log("name " + request.body.name);
    console.log("img " + request.body.img);
    console.log("height " + request.body.height);
    console.log("weight " + request.body.weight);
    var pokemon;
    jsonfile.readFile(FILE, (err, obj)=>{
         for( let i=0; i<obj.pokemon.length; i++ ){

              let currentPokemon = obj.pokemon[i];

              if( currentPokemon.id === inputId ){
                console.log("CURERAERERAERAER POKEMON :" ,currentPokemon.id );
                pokemon = obj.pokemon[i];
                console.log("CURERAERERAERAER POKEMON :" ,pokemon );
              }
            }

        console.log("reading OBJECTTTTTT" , obj)
        console.log("FIRST ERROROOEROEORE", err)

        pokemon.name = request.body.name
        pokemon.img = request.body.img
        pokemon.height = request.body.height
        pokemon.weight = request.body.weight

        var object = pokemon
        console.log("FINSIHING CHANING", pokemon)

        jsonfile.writeFile(FILE, obj, (err)=>{

            console.log("Writing file HERERERE: " ,pokemon)

            console.log("EROEOREREOREOR", err);
            response.render('pokemon' , object)

        })

    })
});


app.get('/pokemon/:id/edit', (request,response) =>{
    jsonfile.readFile(FILE, (err, obj) => {
    if( err ){

      console.log("error with json read file:",err);
      response.status(503).send("error reading filee");
      return;
    }
    let inputId = parseInt( request.params.id );
        console.log("indexAHSAHDHASDHASHDASHDHASDHASDHASHDSA : " + inputId)

    var pokemon;
        for( let i=0; i<obj.pokemon.length; i++ ){

          let currentPokemon = obj.pokemon[i];

          if( parseInt(currentPokemon.id) === inputId ){
            pokemon = currentPokemon;
              console.log("CURERAERERAERAER POKEMON :" ,currentPokemon.id );
          }
        }

        var data = {
            index:inputId,
            name:pokemon.name,
            img:pokemon.img,
            height:pokemon.height,
            weight:pokemon.weight
            }
        console.log(data);
        response.render('edit' , data)
    });
});

app.delete('/pokemon/:id/delete', (request,response)=> {
    let inputId = parseInt( request.params.id );
        jsonfile.readFile(FILE, (err, obj)=>{
            var remove;
            var pokemon;
                    // console.log("reading OBJECTTTTTT" , obj)
                    // console.log("FIRST ERROROOEROEORE", err)
                    // console.log("hahshahha" ,obj)
         for( let i=0; i<obj.pokemon.length; i++ ){
              if( obj.pokemon[i].id === inputId ){
                console.log("CURERAERERAERAER POKEMON :" + obj.pokemon[i].id);
                pokemon = obj.pokemon[i];
                remove = pokemon.id - 1;
                console.log("CURERAERERAERAER POKEMON :" + pokemon );
              }
            }
        obj.pokemon.splice(remove, 1)
        jsonfile.writeFile(FILE, obj, (err)=>{
            console.log("delete pokemon HERERERE: " ,pokemon)

            console.log("EROEOREREOREOR", err);
            response.send(obj)
        })
    })
})

app.get('/pokemon/:id/delete', (request,response) => {
    jsonfile.readFile(FILE, (err, obj) => {
    if( err ){

      console.log("error with json read file:",err);
      response.status(503).send("error reading filee");
      return;
    }
    let inputId = parseInt( request.params.id );

    var pokemon;
    for( let i=0; i<obj.pokemon.length; i++ ){

      let currentPokemon = obj.pokemon[i];


      if( currentPokemon.id === inputId ){
        pokemon = currentPokemon;
      }
    }

    if (pokemon === undefined) {

      // send 404 back
      response.redirect(301, '/pokemon/new');

    } else {
        var data = {
            index:inputId,
            name:pokemon.name
            }
        }
        // console.log(data);
        response.render('delete' , data)
   });
});
/*
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));