const express = require('express');
const jsonfile = require('jsonfile');

const FILE = 'pokedex.json';

// Init express app
const app = express();

//debug code (output request body)
app.use(express.json());
app.use(express.urlencoded({
    extended: true,
}));

//ROUTES

// //Q1. when someone visits your site and thereby makes a request, send them a HTML form
// app.get('/pokemon/new', (request, response) => {
//     // render a template form here
//     let html = "<html>";
//     html += "<body>";
//     html += '<form method="POST" action="/pokemon/">';
//     html += "<span style='font-size:30px'>Inputs:</span>";
//     html += '<br>';
//     html += '<br>';
//     html += "ID: ";
//     html += '<input type="text" name="id" style="margin-left: 4.8vw">';
//     html += '<br>';
//     html += "Number: ";
//     html += '<input type="text" name="num" style="margin-left: 1.7vw">';
//     html += '<br>';
//     html += "Name: ";
//     html += '<input type="text" name="name" style="margin-left: 2.9vw">';
//     html += '<br>';
//     html += "Image: ";
//     html += '<input type="text" name="img" style="margin-left: 2.8vw">';
//     html += '<br>';
//     html += "Height: ";
//     html += '<input type="text" name="height" style="margin-left: 2.5vw">';
//     html += '<br>';
//     html += "Weight: ";
//     html += '<input type="text" name="weight" style="margin-left: 2.3vw">';
//     html += '<br>';
//     html += '<br>';
//     // html += '<button>Sort by name</button>'
//     html += '<input type="submit" value="Submit">';
//     html += "</form>";
//     html += "</body>";
//     html += "</html>";

//     response.send(html);
// });

// //when the visitor fills in the info, this info is POSTed to request.body. Node's body-parser reads the form's input and stores it as a javascript object accessible through request.body
// app.post('/pokemon', function(request, response) {
//     // console.log(request.body);
//     var userInput = request.body; //pokemonObject is an object containing users inputs

//     //function readfile has 2 parameters, first one is the target file, the second one is a callback function with 2 parameters
//     jsonfile.readFile(FILE, (error, object) => {
//         // console.log(object);
//         object.pokemon.push(userInput);

//         // save the request.body
//         jsonfile.writeFile(FILE, object, (err) => {
//             console.error(err)
//         })
//     })

//     // now look inside your json file
//     response.send("Success");
// });


//FURTHER Q1

//Add a "Sort by name" button to the homepage (/ route) that when clicked,
//sends a GET request with a query parameter specifying "?sortby=name" ( this requests a whole new page )
    //Implement this sort functionality as a drop down (select input) of all the sorting fields
    //the user can choose to sort by.

app.get('/', (request, response) => {
    // render a template form here for users to choose what category to sort them by
    let sortingPage = "<html>";
    sortingPage += "<body>";
    sortingPage += '<form method="GET" action="/pokemon/">';
    sortingPage += "<span style='font-size:30px'>How do you want to sort the Pokemon?</span>";
    sortingPage += '<br><br>';
    sortingPage += '<select name="sortby" style="width:10vw">'
    sortingPage += '<option value="name">name</option>';
    sortingPage += '<option value="id">id</option>';
    sortingPage += '<option value="height">height</option>';
    sortingPage += '<option value="weight">weight</option>';
    sortingPage += '</select><br><br>'
    sortingPage += '<input type="submit" value="Sort">';
    sortingPage += "</form></body></html>";

    response.send(sortingPage);
});

//UNDERSTAND HOW THIS FN WORKS
    function compareName(a, b) {
      if (a.name < b.name) {
        return -1;
      } else if
      (a.name > b.name) {
        return 1;
      }
      return 0;
    };

app.get('/pokemon', (request, response) => {
    let searchQuery = request.query.sortby;
    let nameList = '';

    jsonfile.readFile(FILE,(err, obj) => {
        if (searchQuery === 'name') {
            var sortedNames = obj.pokemon.sort(compareName);
            // console.log(sortedNames);
            for (i in sortedNames) {
                nameList += '<li>';
                nameList += sortedNames[i].name;
                nameList += '</li>';
            }
        }
    response.send(nameList);
    })
});

//             if (request.query.sortby == 'name'){
//             let sortedName = obj.pokemon.sort(compareName);
//             let nameList = '';
//             for (var i = 0; i < sortedName.length; i++){
//                 let list = '<li>' + sortedName[i].name + '</li>';
//                 nameList += list;
//             }




//when the visitor fills in the info, this info is POSTed to request.body. Node's body-parser reads the form's input and stores it as a javascript object accessible through request.body
app.post('/pokemon', function(request, response) {
    // console.log(request.body);
    var userInput = request.body; //pokemonObject is an object containing users inputs

    //function readfile has 2 parameters, first one is the target file, the second one is a callback function with 2 parameters
    jsonfile.readFile(FILE, (error, object) => {
        // console.log(object);
        object.pokemon.push(userInput);

        // save the request.body
        jsonfile.writeFile(FILE, object, (err) => {
            console.error(err)
        })
    })

    // now look inside your json file
    response.send("Success");
});


//Get server up to listen for request
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));