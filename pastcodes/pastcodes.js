// app.post('/pokemon', (request, response) => {
//   //debug code (output request body)
//   jsonfile.readFile(FILE, (err, obj) => {

//     obj.lastKey+=1;
//     request.body.id = obj.lastKey;
//     request.body.num = obj.lastKey;
//     request.body.weight = `${request.body.weight} kg`;
//     request.body.height = `${request.body.height} m`;
    
//     obj.pokemon.push(request.body);

//     // save the request body
//     jsonfile.writeFile(FILE, obj, (err) => {
//     });

//     let html = '<html>' +
//                 '<body style="text-align:center; background-color:black;">'+
//                 `<h1 style="color: white;">New Pokemon Details</h1>` +
//                 `<p style='color: white;'>
//                 ID: ${request.body.id} <br>
//                 Num: ${request.body.num} <br>
//                 Name: ${request.body.name}<br>
//                 Weight: ${request.body.weight}<br>
//                 Height: ${request.body.height}<br></p>`+
//                 + '</body>'+'</html>';

//     response.send(html)
//   });
// });

// app.get('/pokemon/new', (request, response) => {
//     html = '<html>' +
//           '<body style="text-align:center; background-color:black;">'+
//           '<h1 style="color: white;">Input new pokemon</h1>'+
//           '<form method="POST" action="/pokemon" style="color: white;">'+
//               'Name: <input name="name" type="text" /><br><br>'+
//               'Height: <input name="height" type="number" step="0.01" /><br><br>'+
//               'Weight: <input name="weight" type="number" step="0.01" /><br><br>'+
//               '<input type="submit" /><br><br>'+
//           '</form>'+
//           '</body>'+
//           '</html>';

//     response.send(html)
// });

// app.get('/', (request, response) => {
//     let html = '<html>' +
//                   '<body style="text-align:center; background-color:black;">'+
//                     '<h1 style="color: white;">Choose to Sort By</h1>'+
//                     '<form method="GET" action="/" style="color: white;">'+
//                           '<select name="sortby">' +
//                           '<option value="name">Name</option>' +
//                           '<option value="height">Height</option>' +
//                           '<option value="weight">Weight</option>' +
//                           '</select><br><br>' +
//                           '<input type="submit" /><br><br>'+
//                       '</form>';

//     jsonfile.readFile(FILE, (err, obj) => {
//         if (Object.keys(request.query).length!==0){
//             let query = request.query.sortby;
//             html += `<h1 style="color: white;">Pokemon sorted by ${query}</h1>`;

//             switch (query){
//             case 'name':
//                 obj.pokemon.sort((a,b) => {
//                   if (a.name.toLowerCase() >= b.name.toLowerCase()){
//                       return 1;
//                   } else if (a.name.toLowerCase() <= b.name.toLowerCase()) {
//                       return -1;
//                   } else {
//                     return 0;
//                   }
//                 });

//                 obj.pokemon.forEach(function(pokemon) {
//                     let div = `<div style="display:inline-block; color:white;">`;

//                     if ('img' in pokemon){
//                         div = div + `<img src="${pokemon.img}">` + `<p>${pokemon.num}. ${pokemon.name}<br></p></div>`;
//                     } else {
//                         div = div + `<p>${pokemon.num}. ${pokemon.name}<br></p></div>`;
//                     }

//                     html = html + div;
//                 });

//                 html = html + '</body>'+'</html>';

//                 response.send(html);
//                 break;

//             case 'weight':
//                 obj.pokemon.sort((a,b) => {
//                   console.log(a.id);
//                   console.log(b.id);
//                   console.log('$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$4')
//                   return parseFloat(a.weight) - parseFloat(b.weight);
//                 });

//                 obj.pokemon.forEach(function(pokemon) {
//                     let div = `<div style="display:inline-block; color:white;">`;

//                     if ('img' in pokemon){
//                         div = div + `<img src="${pokemon.img}">` + `<p>${pokemon.num}. ${pokemon.name}<br>${pokemon[query]}<br></p></div>`;
//                     } else {
//                         div = div + `<p>${pokemon.num}. ${pokemon.name}<br>${pokemon[query]}<br></p></div>`;
//                     }

//                     html = html + div;
//                 });

//                 html = html + '</body>'+'</html>';

//                 response.send(html);
//                 break;

//             case 'height':
//                 obj.pokemon.sort((a,b) => {
//                   return parseFloat(a.height) - parseFloat(b.height);
//                 });

//                 obj.pokemon.forEach(function(pokemon) {
//                     let div = `<div style="display:inline-block; color:white;">`
                  
//                     if ('img' in pokemon){
//                         div = div + `<img src="${pokemon.img}">` + `<p>${pokemon.num}. ${pokemon.name}<br>${pokemon[query]}<br></p></div>`;
//                     } else {
//                         div = div + `<p>${pokemon.num}. ${pokemon.name}<br>${pokemon[query]}<br></p></div>`;
//                     }

//                     html = html + div;
//                 });

//                 html = html + '</body>'+'</html>';

//                 response.send(html);
//                 break;
//             }     
          
//         } else {
//             html+= '<h1 style="color: white;">List of all Pokemon</h1>';;

//             obj.pokemon.forEach(function(pokemon) {
//                 let div = `<div style="display:inline-block; color:white;">`
                
//                 if ('img' in pokemon){
//                     div = div + `<img src="${pokemon.img}">` + `<p>${pokemon.num}. ${pokemon.name}<br></p></div>`;
//                 } else {
//                     div = div + `<p>${pokemon.num}. ${pokemon.name}<br></p></div>`;
//                 }

//                 html = html + div;
//             })

//             html = html + '</body>'+'</html>';

//             response.send(html);
//       }
//     });
// });


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