const jsonfile = require('jsonfile');
const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

// Set up method-override for PUT and DELETE forms
const methodOverride = require('method-override')
app.use(methodOverride('_method'));

// this line below, sets a layout look to your express project
const reactEngine = require('express-react-views').createEngine();
app.engine('jsx', reactEngine);

// this tells express where to look for the view files
app.set('views', __dirname + '/views');

// this line sets react to be the default view engine
app.set('view engine', 'jsx');


app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));

let file = 'pokedex.json';

app.get('/pokemon', (request, response) => {

    jsonfile.readFile('pokedex.json', (err, dataObj)=>{
        const data = {
            pokemonList : dataObj.pokemon
        };
        console.log(data);
        response.render('home', data)
    });
});

//display new form
app.get('/pokemon/new', (request, response)=> {
    console.log('Get new Pokemon request into html input form');

    jsonfile.readFile(file, (err, obj)=>{
        if (err){
            console.log('Error reading input form: '+err)
        }

        let pokemon= obj.pokemon[obj.pokemon.length - 1];
         const data = {
            index: pokemon.id + 1
        };

        response.render('new', data)
    });
});


//save new pokemon form data to json file
app.put('/pokemon/new/:id', (request, response)=>{

    console.log("REQUEST BODY-New");
    console.log( request.body);

    jsonfile.readFile(file, (err, dataObj)=>{

        dataObj.pokemon.push(request.body)

        //dataObj = JSON.stringify(dataObj, null, 2);

        jsonfile.writeFile(file, dataObj, (err)=>{
            response.send("Save WORKS");
        });
    });
    response.send('PUT WORKS');
});


//display edit form
app.get('/pokemon/:id/edit', (request, response)=>{

    jsonfile.readFile(file, (err, dataObj)=>{

        let pokemonIndex = request.params.id;
        let pokemon;
        for (let i=0; i<dataObj.pokemon.length; i++)
        {
            if (pokemonIndex == dataObj.pokemon[i].id)
            {
                pokemon = dataObj.pokemon[i];
            }
        }

        const data = {
            index: pokemonIndex,
            pokemonData : pokemon
        };

        console.log( data );
        response.render('edit', data)
    });
});

//edit form data to json file
app.put('/pokemon/edit/:id', (request, response)=>{

    console.log("REQUEST BODY-Edit");
    console.log( request.body);

    jsonfile.readFile(file, (err, dataObj)=>{

        pokemonIndex = request.params.id;
        for (let i=0; i<dataObj.pokemon.length; i++)
        {
            if (pokemonIndex == dataObj.pokemon[i].id)
            {
                dataObj.pokemon[i] =request.body;
            }
        }

        jsonfile.writeFile(file, dataObj, (err)=>{
            response.send("Edit WORKS");
        });
    });
    response.send('PUT WORKS');
});


//display delete form
app.get('/pokemon/:id/delete', (request, response)=>{

    jsonfile.readFile(file, (err, dataObj)=>{

        let pokemonIndex = request.params.id;
        let pokemon;
        for (let i=0; i<dataObj.pokemon.length; i++)
        {
            if (pokemonIndex == dataObj.pokemon[i].id)
            {
                pokemon = dataObj.pokemon[i];
            }
        }

        const data = {
            index: pokemonIndex,
            pokemonData : pokemon
        };

        console.log( data );
        response.render('delete', data)
    });
});


//delete pokemon in json file
app.put('/pokemon/delete/:id', (request, response)=>{

    jsonfile.readFile(file, (err, dataObj)=>{

        pokemonIndex = request.params.id;
        for (let i=0; i<dataObj.pokemon.length; i++)
        {
            if (pokemonIndex == dataObj.pokemon[i].id)
            {
                dataObj.pokemon.splice(i,1);
            }
        }

        jsonfile.writeFile(file, dataObj, (err)=>{
            response.send("Edit WORKS");
        });
    });
    response.send('PUT WORKS');
});


//display delete form
app.get('/pokemon/:id/detail', (request, response)=>{

    jsonfile.readFile(file, (err, dataObj)=>{

        let pokemonIndex = request.params.id;
        let pokemon;
        for (let i=0; i<dataObj.pokemon.length; i++)
        {
            if (pokemonIndex == dataObj.pokemon[i].id)
            {
                pokemon = dataObj.pokemon[i];
            }
        }

        const data = {
            index: pokemonIndex,
            pokemonData : pokemon
        };

        console.log( data );
        response.render('detail', data)
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

