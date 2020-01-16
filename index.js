const express = require('express');
const jsonfile = require('jsonfile');
const FILE = 'pokedex.json';

/**
 * ==========================
 * Configurations and set up
 * ==========================
 */

// Init express appgit 
const app = express();


// tell your app to use the module
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));


// Set up method-override for PUT and DELETE forms
const methodOverride = require('method-override')
app.use(methodOverride('_method'));


// Init REACT
const reactEngine = require('express-react-views').createEngine();
app.engine('jsx', reactEngine);
// this tells express where to look for the view files
app.set('views', __dirname + '/views');
// this line sets react to be the default view engine
app.set('view engine', 'jsx');



app.get("/", (request, response) => {

    jsonfile.readFile('pokedex.json', (err, obj) => {
        console.log("OBJ ITEM ID~~: " + obj.pokemon[0].id);
        // put render here
    })

})

app.post('/pokemon/', (request, response) => {
    console.log('Received POST');
    console.log(request.body);
    // const newPokemon = {
    //     id: request.body.id,
    //     num: request.body.num,
    //     name: request.body.name,
    //     img: request.body.img,
    //     height: request.body.height,
    //     weight: request.body.weight
    // }

    //since the request.body has the same structure as newPokemon above,
    //we can just use the request.body as it's content
    const newPokemon = request.body

    //make Pokemon ID into an integer, just like in the standard Pokedex
    newPokemon.id = parseInt(newPokemon.id)

    jsonfile.readFile(FILE, (err, obj) => {

        // check to make sure the file was properly read
        if (err) {

            console.log("There is an error", err);
            response.status(503).send("Error");
            return;
        }

        obj.pokemon.push(newPokemon);

        jsonfile.writeFile(FILE, obj, (err) => {
            if (err) {
                console.log(err);
            }

            console.log('New ' + newPokemon);
            response.send('The following pokemon related information has been added: ' + newPokemon.name);
            return;
        })
    })
})


app.get('/pokemon/new', (request, response) => {

    let myForm = '<form method="POST" action="/pokemon">id:<input type="text" name="id"><br/>num:<input type="text" name="num"><br/>name:<input type="text" name="name"><br/>img:<input type="text" name="img"><br/>height:<input type="text" name="height"><br/>weight:<input type="text" name="weight"></br><input type="submit" value="Submit"></form>';

    response.send(myForm);
});



/// ADD A FORM AT THE PATH: /pokemon/:id/edit \\\
app.get('/pokemon/:id/edit', (request, response) => {
    let index = request.params.id

    jsonfile.readFile(FILE, (err, obj) => {

        console.log(obj)

        let pokemon = obj.pokemon[index];

        const data = {
            name: pokemon,
        };
        response.render('edit', data);
    })
})


/*  let html = '<form method="POST" action="/putrequest?_method=put"><input name="id" type="text" value="Id"/><input type="submit" value="Edit this"/><br/><input name="number" type="text" value="Num"/><input type="submit" value="Edit this"/><br/><input name="id" type="text" value="Name"/><input type="submit" value="Edit this"/><br/><input name="id" type="text" value="Img"/><input type="submit" value="Edit this"/><br/><input name="id" type="text" value="Height"/><input type="submit" value="Edit this"/><br/><input name="id" type="text" value="Weight"/><input type="submit" value="Edit this"/></form>';*/













///// THE FORM SHOULD MAKE A REQUEST (THE FORM ACTION ) TO THE CORRECT ROUTE ( A PUT REQUEST TO  /pokemon/:id) \\\\\
app.put('/pokemon/:id', (request, response) => {
    let id = request.params.id;

    jsonfile.readFile(FILE, (err, obj) => {
        obj.names.splice(id, 1);

        jsonfile.writeFile(file, obj, err => {});

        response.send('yes');
    })
    //read the file in and write out to it
});

/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));