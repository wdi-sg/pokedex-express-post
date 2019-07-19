const express = require('express');
// require json file to read and write things
const jsonfile = require('jsonfile');
//database to store pokedex info
const file = 'pokedex.json';

// Init express app
const app = express();

// need this to use express with json
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));


app.use(express.static(__dirname+'/public/'));

app.get('/style.css', (request, response)=>{
  response.send('body{ background-color:pink; }');
})

//react syntax to run jsx
// this line below, sets a layout look to your express project
const reactEngine = require('express-react-views').createEngine();
app.engine('jsx', reactEngine);

// Set up method-override for PUT and DELETE forms
const methodOverride = require('method-override')
app.use(methodOverride('_method'));

// this tells express where to look for the view files
app.set('views', __dirname + '/views');
// app.set("views", __dirname + "/views");

// this line sets react to be the default view engine
app.set('view engine', 'jsx');

///////////// form to get pokemon detail//////////
app.get('/pokemon/new', (request, response) => {
    // render a template form here
    response.render('form.jsx');
});

/////////form to edit pokemon details, need to read jsonfile first///////////
app.get('/pokemon/:id/edit', (request, response) => {
    console.log(request.params.id);

    jsonfile.readFile(file, (err, obj) => {
        if( err ){
            console.log("it didnt work");
        } else {
            // minus 1 cos user wouldnt know array starts from 0
            //save the number as a variable
            let pokemonIndex = parseInt(request.params.id -1)
            // console.log(pokemonIndex);
            // access the object pokedex using the variable saved earlir on
            let data = obj.pokemon[pokemonIndex];
            console.log(data);
            // access the edit form and put in the object info as an arguement
            //data MUST BE AN OBJECT
            response.render('editForm.jsx', data);
        }
    });
});

/////////a put request to edit the info of the pokedex/////
app.put("/pokemon/:id", (request, response) => {
    console.log("PUT works!");
    console.log(request.body);
    response.send(`<html>Details Edited!</html>`);
    // readjson file and add json file into the it

    let newPokemon = request.body;
        //read file
    jsonfile.readFile(file, (err, obj) => {
        if( err ){
          console.log("error reading file");
          console.log(err)
        }else{
            //var edited pokeindex is the current id number
            let editedPokeIndex = parseInt(newPokemon.id -1);
            console.log(editedPokeIndex);
            // replace/ assign the current array object with new object
            obj.pokemon[editedPokeIndex] = newPokemon;
            // write the new obj into pokedex.json
            jsonfile.writeFile(file, obj, (err) => {
                if( err ) {
                    console.log("error writing file");
                    console.log(err)
                    response.status(503).send("no!");
                } else {
                }
            });
        };
    });
});


///////////// post info into database////////////
app.post('/pokemon', (request, response) => {
    console.log("post works!");
    console.log(request.body);
    response.send(`<html>Details Recorded!</html>`);
    // readjson file and add json file into the it

    let newPokemon = request.body;
        //read file
    jsonfile.readFile(file, (err, obj) => {
        if( err ){
          console.log("error reading file");
          console.log(err)

        }else{
            //make changes to obj here. which is the pokedex
            obj.pokemon.push(newPokemon);
            // write the new obj into pokedex.json
            jsonfile.writeFile(file, obj, (err) => {
                if( err ) {
                    console.log("error writing file");
                    console.log(err)
                    response.status(503).send("no!");
                } else {
                }
            });
        };
    });
});



// app.get("/pokemon/:id", (request, response) => {

//     //display entire object
//     jsonfile.readFile(file, function (err, obj) {
//       if (err) {
//         console.error(err);
//       }
//       // console.dir(obj);
// //       // console.log("hi");
//       //if each object.name = input, display it's weight
//       obj.pokemon.forEach(arr => {
//         // console.log(arr.name);
//         if (arr.name == request.params.id){
//             console.log("it works");
//             response.send(`<html><img src= ${arr.img}><br></html> My name is ${arr.name} and  my weight is  ${arr.weight}`)
//         }else{
//             response.send(`Is ${request.params.id} a new Pokemon?, gonna catch them all!`);
//             reponse.status(404);
//         };
//       })
//     })
// });



// // post function in response to the post method by get above

// app.post('/pokemon', (request,response) => {
//     let pokemon = request.body;
//     console.log(pokemon);
//     //read file
//     jsonfile.readFile(file, (err, obj) => {
//         if( err ){
//           console.log("error reading file");
//           console.log(err)
//       }
//       pokemon.id = parseInt(pokemon.id);

//       obj.pokemon.forEach(arr => {
//         // console.log(arr.name);
//         if (arr.id ==  pokemon.id){
//             console.log("it works");
//             response.send(`Sorry the id already exist! Please use an id that is more than ${obj.pokemon.length}`)
//         }else{
//             // response.send(`pokedex`);
//             // response.status(404);
//             jsonfile.writeFile(file, obj, (err) => {
//                 if( err ) {
//                     console.log("error writing file");
//                     console.log(err)
//                     response.status(503).send("no!");
//                 } else {
//                     response.send(obj.pokemon);
//                 }
//             });
//         };
//     })
//   });
// });
/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));
//