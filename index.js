const express = require('express');
const jsonfile = require('jsonfile');

/**
 * ===================================
 * Configurations and set up
 * ===================================
 */

// Init express app
const app = express();
const file = 'pokedex.json';

// tell app to use the module
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}))

/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));

app.get('/pokemon/new', (request, response)=> {
    console.log('Get request into html input form');

    jsonfile.readFile(file, (err, obj)=>{
        if (err){
            console.log('Error reading input form: '+err)
        }

        let form ='';
        let ID = obj.pokemon.length + 1;
        form = '<html>'+
            '<body>'+
            '<h1>Wow, a form to fill</h1>'+
            '<form method="Post" action="/pokemon">'+
                '<p>ID# ' + ID + '</p>' +
                '<p>Name</p><input name="name" type="text">'+
                '<p>Image</p><input name="img" type="url">'+
                '<p>Height</p><input name="height" type="number">'+
                '<p>Weight</p><input name="weight" type="number">'+
                '<p>Click button below to submit all.</p><input type="submit" value="Submit">'+
            '</form></body>'+
            '</html>';

            response.send(form);
    });
});

app.post('/pokemon', (request, response)=>{
    console.log('Post data collected from input form');

    jsonfile.readFile(file, (err, obj)=>{
        if (err){
            console.log('Error reading input form: '+err)
        }

        // read data from input form
        let inputCollected = request.body;
        obj.pokemon.push(inputCollected)

        jsonfile.writeFile(file, obj, (err) => {
            console.log("write file done");
            if( err ){
                console.log("error writing file");
                console.log(err)
                response.status(503).send("no!");
            }else{
                console.log("~~~~~~~yay saved successfully");
                response.send("Save successfully!");
            }
        });
    });
});

app.get('/', (request, response)=>{
console.log('Display all Pokemon');

    jsonfile.readFile(file, (err, obj)=>{
        if (err){
            console.log('Error reading input form: '+err)
        }

        // read data
        form = '<html><body><h1>Pokemon Details</h1>' +
                '<form method="get" action="/sortPokemon">'+
                '<select name="sortby">'+ //first-param >> Object.values(request.query)[0];
                '<option value="name">Name</option>'+
                '<option value="height">Height</option>'+
                '<option value="weight">Weight</option>'+
                '</select>' +
                '<input type="submit" value="Submit">'+ // 2nd param
                '</form>';

        for (let i=0; i<10; i++) //obj.pokemon.length
        {
            form += '<p>Num :' + obj.pokemon[i].num +'</p>'+
                    '<p>Name :' + obj.pokemon[i].name +'</p>'+
                    '<img src=' + obj.pokemon[i].img +' />'+
                    '<p>Height :' + obj.pokemon[i].height +'</p>'+
                    '<p>Weight :' + obj.pokemon[i].weight +'</p>';
        }
        form += '</body></html>';

        response.send(form);
    });
});

app.get('/sortPokemon', (request, response)=>{
    let sortby = Object.values(request.query)[0];

    jsonfile.readFile(file, (err, obj)=>{
        if (err){
            console.log('Error reading input form: '+err)
        }
        let pokemonList =  obj.pokemon.sort( (a, b) => ( a[sortby] > b[sortby] ) ? 1 : -1 );

        // read data
        form = '<html><body><h1>Pokemon Details</h1>';
        for (let i=0; i<pokemonList.length; i++)
        {
            form += '<img src=' + pokemonList[i].img +' />'+
                    '<p>Num :' + pokemonList[i].num +'</p>'+
                    '<p>Name :' + pokemonList[i].name +'</p>'+
                    '<p>Height :' + pokemonList[i].height +'</p>'+
                    '<p>Weight :' + pokemonList[i].weight +'</p>';
        }
        form += '</body></html>';
        response.send(form);
    });
});

