const express = require('express');
const jsonfile = require('jsonfile');
// Init express app
const app = express();
const FILE = 'pokedex.json';
const myFile = 'eden.json';

/**
 * ===================================
 * Configurations and set up
 * ===================================
 */

 //Allows use for request.body
app.use(express.json());
app.use(express.urlencoded({
    extended: true,
}));

const reactEngine = require('express-react-views').createEngine();
app.engine('jsx', reactEngine);
app.set('views', __dirname+'/views');
app.set('view engine', 'jsx');



/**
 * ===================================
 * Routes
 * ===================================
 */

app.get('/pokemon', (request,response)=>{
    response.render('home.jsx');
    console.log(request.query);
    if(request.query.path === "height"){
        console.log("Wow height");
        jsonfile.readFile(FILE, (err,obj)=>{

            let tempArr = obj["pokemon"]
            let str = "List of pokemon by height: <br>";
            tempArr.sort((a,b)=>(a.height)>(b.height));
            for(var i=0;i<tempArr.length;i++){
                str = str + `${tempArr[i]["name"]}<br>`;
            }

            jsonfile.writeFile(FILE, obj, (err) =>{
                response.send(str);
            })
        })
    }
})

app.get('/pokemon/new?', (request,response)=>{
    response.render('addPokemon.jsx');
})

app.get('/pokemon/height', (request,response)=>{
    jsonfile.readFile(FILE, (err,obj)=>{
        var dex = obj["pokemon"];
        for(var i=0;i<dex.length;i++){
        }
    })
})

app.post('/pokemon/new', (request, response) => {
    console.log("Post is working!");
    jsonfile.readFile(myFile, (err,obj)=>{

        if(err){
            console.log(err)
        }
        console.log("Current pokedex: ",obj["pokemon"]);
        console.log("Data given by user: ",request.body);
        request.body.img = `http://www.serebii.net/pokemongo/pokemon/${request.body.num}.png`
        obj["pokemon"].push(request.body);
        jsonfile.writeFile(myFile, obj, (err)=>{
            let resp = JSON.stringify(request.body)
            response.send("Data added: "+resp)
        })
    })
});

app.get('/pokemon/show', (request, response)=>{
    jsonfile.readFile(FILE, (err,obj)=>{
        let dex = obj["pokemon"];
        let str = "List of pokemon:<br>"
        for(var i=0; i< dex.length; i++){
            str = str +`<img src="${dex[i]["img"]}">`
        }
        response.send(str);
    });
})

// app.get('/pokemon/:id', (request, response) => {

//     jsonfile.readFile(FILE, (err, obj) => {
//         // obj is the object from the pokedex json file
//         // extract input data from request
//         let inputId = parseInt(request.params.id);


//         var pokemon;

//         // find pokemon by id from the pokedex json file
//         for (let i = 0; i < obj.pokemon.length; i++) {

//             let currentPokemon = obj.pokemon[i];

//             if (currentPokemon.id === inputId) {
//                 pokemon = currentPokemon;
//             }
//         }

//         if (pokemon === undefined) {

//             // send 404 back
//             response.status(404);
//             response.send("not found");
//         } else {

//             response.send(pokemon);
//         }
//     });
// });



/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));