const express = require('express');
const jsonfile = require('jsonfile');

const file = 'pokedex.json';
const app = express();

// tell your app to use the module < what is this????
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));




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

//             if(output === undefined){
//             response.send("Could not information about " + userInputPath + "Is that a new pokemon? Gotta catch em' all!")
//             };
//         };
//     })
// };



// app.get('/pokemon/*', getPokemon)



// var rootPage = function(request, response){
//     var userInputPath = request.path.split("/")
//     console.log(request.path)
//     console.log(userInputPath[1])

//     jsonfile.readFile(file, function(err, obj){

//         var arrayListOfPokemon = obj.pokemon

//             let html = "";

//             html += "<html>"
//             html += "<head>"
//             html += "</head>"
//             html += "<body>"
//                 html += "<ul>"

//             if (userInputPath[1] === "pokemon"){
//                 arrayListOfPokemon.forEach(function(element){
//                     html += "<li>" + "<img src=" + element.img + ">" + element.name + "</li>"
//                     html += '<a href="/pokemon/'+element.name+'">Link to pokemon</a>'
//                 })

//             }

//                 html += "</ul>"
//             html += "</body>"
//             html += "</html>"



//     response.send(html)

//     })

// }

// app.get("/pokemon", rootPage);






























app.get('/:id', (request, response) => {

  // get json from specified file
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
    } else {

      response.send(pokemon);
    }
  });
});




app.get('/pokemon/new', (request, response) => {
    jsonfile.readFile( file , (err, obj)=>{

        let html = "";
            html += "<html>";
            html += "<head>";
            html += "</head>";
                html +="<body>";

                html += '<form method="post" action="/pokemon">';
                //html += "<h1>Create Pokemon</h1>";
                html += '<input type="text" name="id" placeholder="id">';
                html += '<input type="text" name="num" placeholder="num">';
                html += '<input type="text" name="name" placeholder="name">';
                html += '<input type="text" name="img" placeholder="img">';
                html += '<input type="text" name="height" placeholder="height">';
                html += '<input type="text" name="weight" placeholder ="weight">';

                html += '<input type="submit" value="Submit">';

                html += "</form>";

                html += "</body>";
            html += "</html>";


    response.send(html)

    });
});


//add stuff in pokedex.json
app.post("/pokemon" , (request, response)=> {
    console.log(request.body);

    jsonfile.readFile( file, (err, obj)=> {
        obj["pokemon"].push(request.body)



        jsonfile.writeFile( file , obj, (err)=>{
            console.log(err)

        });

    })

    response.send(request.body);

})


//Sort by name button
app.get('/', (request, response) => {


        let html = "";
            html += "<html>";
            html += "<head>";
            html += "</head>";
                html +="<body>";

                    html += "<button onclick =" + "location.href=" + "/search?sortby=name" + '>sometext</button>'
                    html += "</form>";
                html += "</body>";
            html += "</html>";


  response.send(html);

});


app.get("/search?sortby=name", (request, response) => {
        console.log("something")
        response.body("test")

});



app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));
