const express = require('express');
const jsonfile = require('jsonfile');

const file = 'pokedex.json';
const app = express();

// tell your app to use the module
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

//using override library
const methodOverride = require('method-override')

app.use(methodOverride('_method'));

// this line below, sets a layout look to your express project
const reactEngine = require('express-react-views').createEngine();
app.engine('jsx', reactEngine);

// this tells express where to look for the view files
app.set('views', __dirname + '/views');

// this line sets react to be the default view engine
app.set('view engine', 'jsx');

app.get('/', (req, res) => {
  // running this will let express to run home.handlebars file in your views folder
  res.render('home')
})






app.get('/pokemon/:id/edit' , ( request , response )=>{
    //read pokedex file
    jsonfile.readFile(file, (err, obj) => {
        // obj is the object from the pokedex json file
        // extract input data from request
        let inputId = parseInt( request.params.id );

        var pokemon;

        // find pokemon by id from the pokedex json file
        for( let i=0; i<obj.pokemon.length; i++ ){

          let currentPokemon = obj.pokemon[i];

          if( currentPokemon.id === inputId ){
            pokemon = currentPokemon;
          }
        }

        if (pokemon === undefined) {

          // send 404 back
          response.status(404);
          response.send("not found");
        }

        // else {

        //   response.send(pokemon);
        // }

        console.log(request.params.id)

        //'home is referencing the home.jsx'
        // creates a new id called poke which can be referenced in jsx file as this.props.poke and 'pokemon is the object to send to jsx'
        response.render('home' , {poke: pokemon })


    })
})

//update pokedex.js with user changes, request.body is an object
app.put( '/pokemon/:id' , (request, response)=>{

    let currentpokemonId = parseInt(request.body.id[0])

    jsonfile.readFile( file , (err, obj)=>{
        console.log(obj.pokemon[0].id)

        obj.pokemon.forEach((element)=> {
            if (currentpokemonId === element.id){
                console.log(element.name)

                console.log(element)
                element.id = parseInt(request.body.id[0])
                element.num = parseInt(request.body.id[1])
                element.name = request.body.id[2]
                console.log("writing file")

            };
        });


        jsonfile.writeFile( file , obj, (err)=>{
            console.log(err)
            response.send("yay")

        });



    })
})




app.get('/pokemon/:id', (request, response) => {

  // get json from specified file
  jsonfile.readFile(file, (err, obj) => {
    // obj is the object from the pokedex json file
    // extract input data from request
    let inputId = parseInt( request.params.id );

    var pokemon;

    // find pokemon by id from the pokedex json file
    for( let i=0; i<obj.pokemon.length; i++ ){

      let currentPokemon = obj.pokemon[i];

      //allow strings and integers to be compared by using "==""
      if( currentPokemon.id == inputId ){
        pokemon = currentPokemon;
      }
    }

    if (pokemon === undefined) {

      // send 404 back
      response.status(404);
      console.log("not found")
      response.send("not found");
    } else {

        response.render( 'specific-pokemon-page', {specificPokemon: pokemon })




      // response.send(pokemon);
    }
  });
});



// var getPokemon = function (request, response){
//   // send response with some data (a string)
//     var userInputPath = request.path.split("/")[2].toLowerCase()

//     console.log("this is the user input path " + userInputPath + "xxx")
//     //read pokedex.json file
//     jsonfile.readFile (file, function(err, obj){

//         var arrayListOfPokemon = obj.pokemon

//         var output;

//         if (userInputPath === ""){
//             response.send("Welcome to the online pokedex")
//         }

//         else{

//             //loop through each member of the pokemon array
//             arrayListOfPokemon.forEach(function(element){

//                 //comparing what the user enter in url and the pokedex.json to get correct pokemon

//                 if( userInputPath === element.name.toLowerCase() ){
//                     let html = "";

//                     html += "<html>"
//                     html += "<head>"
//                     html += "</head>"
//                         html += "<body>"
//                         html += '<img src='+element.img+'>' + element.name
//                         html += "</body>"
//                     html += "</html>"

//                     console.log(html)
//                     response.send(html)
//                 };

//             });


//             //this output dosent run as there is now to repsonses

//             // if(output === undefined){
//             // response.send("Could not information about " + userInputPath + "Is that a new pokemon? Gotta catch em' all!")
//             // };
//         };
//     })
// };



// app.get('/pokemon/*', getPokemon)



var rootPage = function(request, response){
    var userInputPath = request.path.split("/")

    jsonfile.readFile(file, function(err, obj){

        var arrayListOfPokemon = obj.pokemon

            let html = "";

            html += "<html>"
            html += "<head>"
            html += "</head>"
            html += "<body>"
                html += "<ul>"

            if (userInputPath[1] === "pokemon"){
                arrayListOfPokemon.forEach(function(element){
                    html += "<li>" + "<img src=" + element.img + ">" + element.name + "</li>"
                    html += '<a href="/pokemon/'+element.id+'">Link to pokemon</a>'
                })

            }

                html += "</ul>"
            html += "</body>"
            html += "</html>"



    response.send(html)

    })

}

app.get("/pokemon", rootPage);






// app.get('/pokemon/new', (request, response) => {
//     jsonfile.readFile( file , (err, obj)=>{

//         let html = "";
//             html += "<html>";
//             html += "<head>";
//             html += "</head>";
//                 html +="<body>";

//                 html += '<form method="post" action="/pokemon">';
//                 //html += "<h1>Create Pokemon</h1>";
//                 html += '<input type="text" name="id" placeholder="id">';
//                 html += '<input type="text" name="num" placeholder="num">';
//                 html += '<input type="text" name="name" placeholder="name">';
//                 html += '<input type="text" name="img" placeholder="img">';
//                 html += '<input type="text" name="height" placeholder="height">';
//                 html += '<input type="text" name="weight" placeholder ="weight">';

//                 html += '<input type="submit" value="Submit">';

//                 html += "</form>";

//                 html += "</body>";
//             html += "</html>";


//     response.send(html)

//     });
// });


// //add stuff in pokedex.json
// app.post("/pokemon" , (request, response)=> {
//     console.log(request.body);

//     jsonfile.readFile( file, (err, obj)=> {
//         obj["pokemon"].push(request.body)



//         jsonfile.writeFile( file , obj, (err)=>{
//             console.log(err)

//         });

//     })

//     response.send(request.body);

// })


//Sort by name button
// app.get('/', (request, response) => {


//         let html = "";
//             html += "<html>";
//             html += "<head>";
//             html += "</head>";
//                 html +="<body>";

//                     html += "<button onclick =" + "location.href=" + "/search?sortby=name" + '>sometext</button>'
//                     html += "</form>";
//                 html += "</body>";
//             html += "</html>";


//   response.send(html);

// });


// app.get("/search?sortby=name", (request, response) => {
//         console.log("something")
//         response.body("test")

// });



app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));
