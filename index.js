const express = require('express');
const jsonfile = require('jsonfile');
const FILE = 'pokedex.json', pokedexcache = [];
const app = express();
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
app.get("/", (request,response) => {
    let form = "<html>"+ "<body>"+
    "<h5>"
})
jsonfile.readFile(FILE,(err,obj) =>{
    pokedexCache = obj;
})

app.post("/addPokemon", (request,response) =>{
    console.log(request.body);
    jsonfile.readFile(FILE, (err, obj) => {
        console.log(obj.pokemon[request.body.id])

        var newPokemon = request.body;
        obj.pokemon.push(newPokemon);

        jsonfile.writeFile(FILE,obj, (err) =>{

            console.error(err);
            response.send(request.body);
        })
    })
});

app.get('/new', (request,response) =>{
    let form = "<html>"+
        "<body>" +
        '<form action="/addPokemon" method="POST">' +
            '<h4>Enter ID</h4>'+
            '<input name="id"/>' +
            '<h4>Enter Number</h4>'+
            '<input name="num"/>' +
            '<h4>Enter Name</h4>'+
            '<input name="name"/>' +
            '<h4>Enter img</h4>'+
            '<input name="img"/>' +
            '<h4>Enter Height</h4>'+
            '<input name="height"/>' +
            '<h4>Enter Weight</h4>'+
            '<input name="weight"/>' +
            '<p>.</p>'+
            '<input type="submit"/>' +
        "</form>" +
        "</body>" +
        "</html>";
    response.send(form);
})

app.get('/:id/', (request, response) => {
    // let keyWord = req.params[0].split("/")
  // get json from specified file
    jsonfile.readFile(FILE, (err, obj) => {
    console.log("json file loaded, obj ready")
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

app.get('/', (request, response) => {
  response.send("yay");
});

app.get('/allpokemon', (request,response) =>{
    let html =
        `<!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
          <link rel="stylesheet" type="text/css" href="http://10.193.240.192:8080/style.css">
        </head>
        <body>
        <div class="containerofbox">
            <form name='sortby' method="get" action="/">
            Sort By: <select name='sortby'>
                         <option value='name'>Name</option>
                         <option value='num'>Number</option>
                         <option value='height'>Height</option>
                         <option value='weight'>Weight</option>
                     </select>
            <input type='submit'/>
            </form>
            <div class="row">`;

    for (let i = 0; i <pokedexCache.length; i++){
        html = html +
        `<div class = "box">
            <img src=${pokedexCache.pokemon[i].img}>
            <h3>${pokedexCache.pokemon[i].num}</h3>
            <h3>${pokedexCache.pokemon[i].name}</h3>
        </div>`
    }
    response.send(form);
})


/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));
