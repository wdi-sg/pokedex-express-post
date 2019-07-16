

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

/**
 * ===================================
 * Compare Function
 * ===================================
 */

function compareName(a, b) {
  const nameA = a.name.toLowerCase();
  const nameB = b.name.toLowerCase();

  let comparison = 0;
  if (nameA >= nameB){
    comparison = 1;
  } else if (nameA <= nameB) {
    comparison = -1;
  }
  return comparison;
}

function compareWeight(a, b) {
  const weightA = parseFloat(a.weight);
  const weightB = parseFloat(b.weight);

  let comparison = 0;
  if (weightA >= weightB){
    comparison = 1;
  } else if (weightA <= weightB) {
    comparison = -1;
  }
  return comparison;
}


function compareHeight(a, b) {
  const heightA = parseFloat(a.height);
  const heightB = parseFloat(b.height);

  let comparison = 0;
  if (heightA >= heightB){
    comparison = 1;
  } else if (heightA <= heightB) {
    comparison = -1;
  }
  return comparison;
}

/**
 * ===================================
 * Routes
 * ===================================
 */

app.post('/pokemon', (request, response) => {
  //debug code (output request body)
  jsonfile.readFile(FILE, (err, obj) => {
    
    obj.pokemon.push(request.body);    

    // save the request body
    jsonfile.writeFile(FILE, obj, (err) => {
    });

    response.send(request.body)
  });
});

app.get('/', (request, response) => {
    console.log(request.body);
    console.log(request.query);
    jsonfile.readFile(FILE, (err, obj) => {
      if (Object.keys(request.query).length!==0){
          let query = request.query.sortby;
          let sortedArray = [];
          let html = '<html>' +
        '<body style="text-align:center; background-color:black;">'+
        `<h1 style="color: white;">Pokemon sorted by ${query}</h1>`;

       switch (query){
        case 'name':
          obj.pokemon.sort(compareName);

          obj.pokemon.forEach(function(pokemon) {
            let div = `<div style="display:inline-block; color:white;">`
            if ('img' in pokemon){
              div = div + `<img src="${pokemon.img}">` + `<p>${pokemon.num}. ${pokemon.name}<br></p></div>`;
            } else {
              div = div + `<p>${pokemon.num}. ${pokemon.name}<br></p></div>`;
            }
            html = html + div;
          });

          html = html + '</body>'+'</html>';

          response.send(html);
          break;

        case 'weight':
            obj.pokemon.sort(compareWeight);

            obj.pokemon.forEach(function(pokemon) {
              let div = `<div style="display:inline-block; color:white;">`
              if ('img' in pokemon){
                div = div + `<img src="${pokemon.img}">` + `<p>${pokemon.num}. ${pokemon.name}<br>${pokemon[query]}<br></p></div>`;
              } else {
                div = div + `<p>${pokemon.num}. ${pokemon.name}<br>${pokemon[query]}<br></p></div>`;
              }
              html = html + div;
            });

            html = html + '</body>'+'</html>';

            response.send(html);
            break;

          case 'height':
            obj.pokemon.sort(compareHeight);

            obj.pokemon.forEach(function(pokemon) {
              let div = `<div style="display:inline-block; color:white;">`
              if ('img' in pokemon){
                div = div + `<img src="${pokemon.img}">` + `<p>${pokemon.num}. ${pokemon.name}<br>${pokemon[query]}<br></p></div>`;
              } else {
                div = div + `<p>${pokemon.num}. ${pokemon.name}<br>${pokemon[query]}<br></p></div>`;
              }
              html = html + div;
            });

            html = html + '</body>'+'</html>';

            response.send(html);
            break;

       }     
          
      } else {
        let html = '';
        html = '<html>' +
        '<body style="text-align:center; background-color:black;">'+
        '<h1 style="color: white;">Input new pokemon</h1>'+
          '<form method="POST" action="/pokemon" style="color: white;">'+
            'ID: <input name="id" type="number" /><br><br>'+
            `Num: <input name="num" min="${obj.pokemon.length}" type="number" /><br><br>`+
            'Name: <input name="name" type="text" /><br><br>'+
            'Height: <input name="height" type="number" step="0.1" /><br><br>'+
            'Weight: <input name="weight" type="number" step="0.1" /><br><br>'+
            '<input type="submit" /><br><br>'+
          '</form>' +

          '<form method="GET" action="/" style="color: white;">'+
            '<select name="sortby">' +
              '<option value="name">Name</option>' +
              '<option value="height">Height</option>' +
              '<option value="weight">Weight</option>' +
            '</select><br><br>' +
            '<input type="submit" /><br><br>'+
          '</form>' +

          '<h1 style="color: white;">List of all Pokemon</h1>';

        obj.pokemon.forEach(function(pokemon) {
          let div = `<div style="display:inline-block; color:white;">`
           if ('img' in pokemon){
              div = div + `<img src="${pokemon.img}">` + `<p>${pokemon.num}. ${pokemon.name}<br></p></div>`;
           } else {
              div = div + `<p>${pokemon.num}. ${pokemon.name}<br></p></div>`;
           }
           html = html + div;
        })

        html = html + '</body>'+'</html>';

        response.send(html);
      }
    });
});
/*
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));



// app.get('/:id', (request, response) => {

//   // get json from specified file
//   jsonfile.readFile(FILE, (err, obj) => {
//     // obj is the object from the pokedex json file
//     // extract input data from request
//     let inputId = parseInt( request.params.id );

//     var pokemon;

//     // find pokemon by id from the pokedex json file
//     for( let i=0; i<obj.pokemon.length; i++ ){

//       let currentPokemon = obj.pokemon[i];

//       if( currentPokemon.id === inputId ){
//         pokemon = currentPokemon;
//       }
//     }

//     if (pokemon === undefined) {

//       // send 404 back
//       response.status(404);
//       response.send("not found");
//     } else {

//       response.send(pokemon);
//     }
//   });
// });

// app.get('/', (request, response) => {
//   response.send("yay");
// });

// /**