// I already check out your works nightly. Big Fan.==================

const express = require('express');
const jsonfile = require('jsonfile');
const FILE = 'pokedex.json';
const methodOverride = require('method-override')
/**
 * ===================================
 * Configurations and set up
 * ===================================
 */
// Init express app
const app = express();
// this line below, sets a layout look to your express project
const reactEngine = require('express-react-views').createEngine();
app.engine('jsx', reactEngine);
// this tells express where to look for the view files
app.set('views', __dirname + '/views');
// this line sets react to be the default view engine
app.set('view engine', 'jsx');
// tell your app to use the module
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
app.use(methodOverride('_method'));
/*
 * ===================================
 * Routes
 * ===================================
 */

/*
 * ===================================
 * GET show
 * ===================================
 */

app.get('/pokemon/:id', (request, response) => {
    if (request.params.id === "new") {
        response.render('new');
    } else {
// get json from specified file
        jsonfile.readFile(FILE, (err, obj) => {
// obj is the object from the pokedex json file
// extract input data from request
            let inputId = parseInt( request.params.id );
            let data;
// find pokemon by id from the pokedex json file
            for( let i=0; i<obj.pokemon.length; i++ ){
                let currentPokemon = obj.pokemon[i];
                if( currentPokemon.id === inputId ){
                data = currentPokemon;
                }
            }
            if (data === undefined) {
// send 404 back
                response.status(404);
                response.send(`<html><body style="text-align: center;"><h1>ERROR 404</h1><img src="https://i.pinimg.com/originals/ed/ca/4b/edca4bc1f1c89aaf399e730f2ebf66d0.png"></body></html>`);
            } else {
                response.render('show', data);
            }
        });
    }
});
/*
 * ===================================
 * GET empty
 * ===================================
 */
app.get('/', (request, response) => {
    response.send("ARE YOU TRYING TO LOOK FOR THE POKEDEX? PLEASE GO TO PATH /pokemon");
});
/*
 * ===================================
 * GET index
 * ===================================
 */
app.get('/pokemon', (request, response) => {
    let sortMethod = request.query.sortby;
// preparing object to export it to jsx
    switch (sortMethod) {
        case 'name':
            jsonfile.readFile(FILE, (err, obj) => {
                if (err) console.log(err);
// create new array to store pokemon names
                let names = obj.pokemon.map(element=>{
                    return element["name"];
                })
// function to sort the pokemon names
                names.sort((a,b)=>{
                    if (a>b) {
                        return 1;
                    }
                    if (b>a) {
                        return -1;
                    }
                })
                const data = {
                    names: names
                };
// send the response
                response.render('sortByName',data)
            });
            break;
        case "height":
            jsonfile.readFile(FILE, (err, obj) => {
                if (err) console.log(err);
                let output = obj.pokemon.map(element=>{
                    return element;
                });
                output.sort((a,b)=>{
                    if (a["height"]>b["height"]) {
                        return 1;
                    }
                    if (b["height"]>a["height"]) {
                        return -1;
                    }
                });
                const data = {
                    pokemon: output
                };
                response.render('sortByHeight',data)
            });
            break;
        case "weight":
            jsonfile.readFile(FILE, (err, obj) => {
                if (err) console.log(err);
                let output = obj.pokemon.map(element=>{
                    return element;
                });
                output.sort((a,b)=>{
                    if (a["weight"]>b["weight"]) {
                        return 1;
                    }
                    if (b["weight"]>a["weight"]) {
                        return -1;
                    }
                });
                const data = {
                    pokemon: output
                };
                response.render('sortByWeight',data)
            });
            break;
        default:
    }
    jsonfile.readFile(FILE, (err, obj) => {
        const data = {
            list: []
        }
        if (err) console.log(err);
        for (let i=0; i<obj.pokemon.length; i++) {
            data.list.push(obj.pokemon[i].name);
        };
        response.render('index', data);
    });
});
/*
 * ===================================
 * POST create
 * ===================================
 */
app.post('/pokemon', function(request, response) {
//debug code (output request body)
    console.log(request.body);
//read the current file
    jsonfile.readFile(FILE, (err, obj) => {
        if (err) console.log(err);
// push the new pokemon to pokemon array
        obj.pokemon.push(request.body);
// write this new obj to pokedex.json
        jsonfile.writeFile(FILE, obj, {spaces:2}, (err) => {
            if (err) console.log(err)
        });
    });
// endpoint
    response.render('show', request.body);
});
/*
 * ===================================
 * GET edit
 * ===================================
 */

 //YIJIN: I noticed this while doing my own. Maybe because we used the for loop to get /pokemon/:id, the path id tallies with the id.
 //YIJIN: But when we do /pokemon/:id/edit, the path will bring us to 1 pokemon before. eg. /pokemon/1/edit will bring user to editing id2 - Ivysaur 
app.get('/pokemon/:id/edit',(request, response)=>{
    let index = parseInt(request.params.id-1);
//YIJIN: adding a "-1" was my quick fix. not sure if it screws up some other part
    jsonfile.readFile(FILE, (err, obj) => {
        if (err) console.log(err);
        const data = {
            pokemon: obj.pokemon[index],
            index: index
        };
    response.render('edit', data);
  });
});
//YIJIN: I notice that the original pokedex.json file puts the object "id" value without inverted commas""
//YIJIN: And when this particular pokemon was edited,the id is now between "", rendering impossible to use /pokemon/3 path thereafter
//YIJIN: I only notice the problem with no solution to offer. sorry!
/*
 * ===================================
 * PUT edit
 * ===================================
 */
app.put("/pokemon/:id", (request, response) => {
    let id = request.params.id;
    jsonfile.readFile(FILE, (err, obj) => {
        if (err) console.log(err);
// write over the edited pokemon to pokemon array
        obj.pokemon[parseInt(id)] = request.body;
// write this new obj to pokedex.json
        jsonfile.writeFile(FILE, obj, {spaces:2}, (err) => {
            if (err) console.log(err)
        });
    });
// endpoint
    response.render('show', request.body);
});
/*
 * ===================================
 * GET destroy
 * ===================================
 */
app.get("/pokemon/:id/delete", (request, response) => {
    let index = parseInt(request.params.id-1);
//YIJIN: same as above for /pokemon/:id/edit
//YIJIN: after i changed this part, I'm unable to delete already. In fact, when I try to delete id=25, the error message says "Cannot DELETE /pokemon/24"
    jsonfile.readFile(FILE, (err, obj) => {
        if (err) console.log(err);
        const data = {
            pokemon: obj.pokemon[index],
            index: index
        };
    response.render('delete', data);
    });
})
/*
 * ===================================
 * DELETE destroy
 * ===================================
 */

/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));