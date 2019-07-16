const express = require('express');

const jsonfile = require('jsonfile');
const file = 'pokedex.json';

// jsonfile.readFile(file, function (err, obj) {
//   if (err) console.error(err)
//   console.dir(obj)
// })

// tell your app to use the module



/**
 * ===================================
 * Configurations and set up
 * ===================================
 */

// Init express app
const app = express();


app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

// /**
//  * ===================================
//  * Routes
//  * ===================================
//  */

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

// form to get pokemon detail
app.get('/pokemon/new', (request, response) => {
     let form = '';
    form = '<html>' +
        '<body>'+
        '<h1>Enter Details of New Pokemon!</h1>'+
        '<form method="POST" action="/pokemon">'+
        '<p>Id</p><input name="id"/>'+
        '<p>Num</p><input name="num"/>'+
        '<p>Name</p><input name="name"/>'+
        '<p>Img Url</p><input name="imgURL"/>'+
        '<p>Height (m)</p><input name="height"/>'+
        '<p>Weight (kg)</p><input name="weight"/>'+ '<br><br>' +
        '<input type="submit"/>'+
        '</form>'+
        '</body>'+
        '</html>';

  // render a template form here
  response.send(form);
});

//post function in response to the post method by get above

app.post('/pokemon', (request,response) => {
    let pokemon = request.body;
    console.log(pokemon);
    //read file
    jsonfile.readFile(file, (err, obj) => {
        if( err ){
          console.log("error reading file");
          console.log(err)
      }
      pokemon.id = parseInt(pokemon.id);

      obj.pokemon.forEach(arr => {
        // console.log(arr.name);
        if (arr.id ==  pokemon.id){
            console.log("it works");
            response.send(`Sorry the id already exist! Please use an id that is more than ${obj.pokemon.length}`)
        }else{
            // response.send(`pokedex`);
            // response.status(404);
            jsonfile.writeFile(file, obj, (err) => {
                if( err ) {
                    console.log("error writing file");
                    console.log(err)
                    response.status(503).send("no!");
                } else {
                    response.send(obj.pokemon);
                }
            });
        };
    })
  });
});
/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));
//