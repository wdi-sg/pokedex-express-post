// express module -handle http request
const express = require('express');
const app = express();
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

// jsonfile module read/write json
const jsonfile = require('jsonfile');
// const dexData = require('./pokedex.json')
const dexData = "pokedex.json"


// method override module override http put/delete
const methodOverride = require('method-override')
app.use(methodOverride('_method'));

// react-views module
const reactEngine = require('express-react-views').createEngine();
app.engine('jsx', reactEngine);
app.set('views', __dirname + '/views');
app.set('view engine', 'jsx');

/**
 * ===================================
 * Functions
 * ===================================
 */

function newMon(pokemon, pokedex){
    let newMon = pokemon;

    const currentMonLength = pokedex["pokemon"].length;
    console.log(currentMonLength)
    const newMonId = currentMonLength + 1;

    let hNum = newMon.height;
    newMon.height = hNum + " m"
    let wNum = newMon.weight;
    newMon.weight = wNum + " kg"
    newMon.id = newMonId;
    newMon.num = "#"+newMonId;
    return newMon
};




/**
 * ===================================
 * Routes
 * ===================================
 */

 //to index page
app.get('/pokemon/new', (request, response) => {
    console.log("i is at new pokemon")
    jsonfile.readFile(dexData, (err, obj) => {

        response.render('new', obj);

        if (err) console.error(err);
    });
});
app.get('/pokemon/:name', (request, response) => {
    jsonfile.readFile(dexData, (err, obj) => {

        console.log("i is at individual pokemon")


        const temp = request.params.name;
        console.log(temp)
        const monName = temp.toLowerCase();
        const db = obj["pokemon"]

        let pokemon = {}
        for (let i = 0; i < db.length; i++) {
            let n =db[i]["name"].toLowerCase();
            if (n === monName){
                pokemon = db[i]
            }
        }


        response.render('single', pokemon)
        if (err) console.error(err);
    });
});



app.get('/pokemon/', (request, response) => {
    jsonfile.readFile(dexData, (err, obj) => {
        console.log("i is at main pokemon list")
        response.render('main', obj);
        if (err) console.error(err);
    });
});

app.get('/', (request, response) => {
    console.log("i is at index")
    response.render('index')
});


// app.get('/pokemon/new', (request, response) => {
//     console.log("i is at new pokemon")
//     jsonfile.readFile(dexData, (err, obj) => {
//         const header = newBanner()
//         const nav = directory()
//         const form = generateForm()

//         const htmlBody =`<html>
//                         <body style='background-color: lightblue'>
//                             <div>
//                                 <pre style='text-align: center'>${header}</pre>
//                             </div>
//                             <div style='text-align: center'>
//                                 ${nav}
//                             </div>
//                             ${form}
//                         </body>
//                     </html>`;

//         if(!htmlBody) response.send("Denied!");
//         else {
//             console.log("YAS!");

//             response.send(htmlBody);
//         }
//         if (err) console.error(err);
//     });
// });


app.post('/pokemon', (request, response) => {
    jsonfile.readFile(dexData, (err, obj) => {
        console.log("i just entered new pokemon")

        let temp = request.body;
        console.log(temp)
        const newPokemon = newMon(temp, obj)
        console.log(newPokemon)
        obj["pokemon"].push(newPokemon)
        response.render('main', obj);

        jsonfile.writeFile(dexData, obj, (err) => {
            console.log(err)
        });
    });
});


// app.get('/pokedex/img/:name', (request, response) => {
//     jsonfile.readFile(dexData, (err, obj) => {
//         const monName = request.params.name;
//         const img = getImgByName(obj, monName);
//         if(!img) response.send("Denied!");
//         console.log("YAS!")
//         response.send(img);
//         if (err) console.error(err);
//     });
// });
// app.get('/pokedex/type/:type', (request, response) => {
//     jsonfile.readFile(dexData, (err, obj) => {
//         const monType = request.params.type;
//         const monsByType = getMonsByType(obj, monType);

//         if(!monsByType) response.send("Denied!");
//         console.log("YAS!")
//         response.send(monsByType);
//         if (err) console.error(err);
//     });
// });
// app.get('/pokedex/kanto/:name', (request, response) => {
//     jsonfile.readFile(dexData, (err, obj) => {
//         const monName = request.params.name;
//         console.log(monName)
//         const fullDeets = getDeetsByName(obj, monName);
//         console.log(fullDeets)
//         if(!fullDeets) response.send("Denied!");
//         else {
//             console.log("YAS!");
//             response.send(fullDeets);
//         }
//         if (err) console.error(err);
//     });
// });

/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));