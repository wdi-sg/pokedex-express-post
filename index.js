// // input
// // input express jsonfile
// const express = require('express');
// const app = express();

// const jsonfile = require('jsonfile');
// const file = 'pokedex.json';




// app.get('/id', (request, response) => {
//   jsonfile.readFile(file, (err, obj) => {
//     if(err){console.log(err)}
//   });
// });

// var homeId = (request, response) => {
//   let dir = `/id`;
//   let formString = `Enter Pokemon ID`;
//   var form = 
// `<form method="POST" action="${dir}">
// \n ${formString} \n
// <input type="text" name="name"/>
// <input type="submit" value="Submit"/>
// </form>`;
//   let formId = form;
//   console.log(form)
//   response.send(formId);
// }
// //homepage
// app.get('/', homeId);


// //app.listen (3000)
// app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));


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
            "<fieldset>"+
            "<legend>selection</legend>"
            "ID:<br><input type='text' name='id'><br><br>" +
            "Num:<br><input type='text' name='num'><br><br>" +
            "Name:<br><input type='text' name='name'><br><br>" +
            "Img:<br><input type='text' name='img'><br><br>" +
            "Height:<br><input type='text' name='height'><br><br>" +
            "Weight:<br><input type='text' name='weight'><br><br>" +
            "<input type='submit' value='Submit'>" +
            "</fieldset>"+
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
                    "<option value='numasc' style='font-size:30px;'>Id # (ascending)</option>" +
                    "<option value='numdesc' style='font-size:30px;'>Id # (descending)</option>" +
                    "<option value='nameasc' style='font-size:30px;'>Name (ascending)</option>" +
                    "<option value='namedesc' style='font-size:30px;'>Name (descending)</option>" +
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