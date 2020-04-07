const express = require('express');
const jsonfile = require('jsonfile');

const file = 'pokedex.json';

const reactEngine = require('express-react-views').createEngine();

/**
 * ===================================
 * Configurations and set up
 * ===================================
 */

// Init express app
const app = express();
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

/**
 * ===================================
 * Routes
 * ===================================
 */
app.get('/', (request, response) => {
    //response.send("yay");
    response.render('home')
});

app.get('/pokemon/new', (request, response) => {
  //response.send("yay");
    response.render('pokemonForm')
});

app.post('/pokemon/id', (request,response) => {

    jsonfile.readFile(file, (err, obj) => {

        jsonfile.writeFile('data.json', request.body, (err) => {
            console.error(err)
        });
        // check id
        for(let i=0; i<obj.pokemon.length; i++) {
            console.log(i)
            if(obj.pokemon[i].id == parseInt(request.body.id)) {
                data = {
                    "id": request.body.id,
                    "name": obj.pokemon[i].name,
                    "weight": obj.pokemon[i].weight
                }
                response.render('home',data);
            }
        }
        // check num
        for(let i=0; i<obj.pokemon.length; i++) {
            console.log(i)
            if(obj.pokemon[i].num == request.body.num) {
                data = {
                    "id": request.body.id,
                    "name": obj.pokemon[i].name,
                    "weight": obj.pokemon[i].weight
                }
                response.render('home',data);
            }
        }

        newPoke = {
            "id": parseInt(request.body.id),
            "num": request.body.num,
            "name": request.body.name,
            "img": request.body.img,
            "height": request.body.height,
            "weight": request.body.weight
        }
        obj.pokemon.push(newPoke);
        console.log(obj.pokemon);
        response.render('newPoke',newPoke);

    });
});
// app.get("/pokemon/:x", (request, response) => {

//     let pName;
//     let pWeight;
//     let pHeight;
//     let pType;

//     jsonfile.readFile(file, (err, obj) => {

//         for(let i=0; i<obj.pokemon.length; i++){
//             if(obj.pokemon[i].name.toLowerCase()==request.params.x) {
//                 pName = obj.pokemon[i].name.toLowerCase()
//                 pWeight = obj.pokemon[i].weight
//                 pHeight = obj.pokemon[i].height
//                 if(obj.pokemon[i].type.length == 1) {
//                     pType = obj.pokemon[i].type+" type";
//                 } else if (obj.pokemon[i].type.length == 2) {
//                     pType = "dual-type "+obj.pokemon[i].type[0]+"\/"+obj.pokemon[i].type[1];
//                 }

//                 response.send(
//                     "This is "+pName+", he is "+pWeight
//                     +" in weight,"+pHeight+" in height! he is a "+pType+" Pokemon!")
//                 return;
//             }
//         }
//         response.send("Could not find information about "+request.params.x+" - Is that a new pokemon? Gotta catch em' all!")
//     });
// });


/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));