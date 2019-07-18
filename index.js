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

function directory() {
    const nav = `<ul style='font-size: 25px;font-family: Arial, Helvetica, sans-serif;font-weight: bold;'>
                    <li style='display:inline;'><a href='/pokemon/'>ALL</a></li>
                    <li style='display:inline;'><a href='/pokemon/new'>NEW</a></li>
                    <li style='display:inline;'><a href='/pokemon/:id/edit'>UPDATE</a></li>
                <ul>`;
    return nav
};
function sortOptions() {
    const nav = `<ul style='font-size: 25px;font-family: Arial, Helvetica, sans-serif;font-weight: bold;'>
                    <li style='display:inline;'><a href=''>BY NAME</a></li>
                    <li style='display:inline;'><a href=''>BY #</a></li>
                    <li style='display:inline;'><a href=''>BY HEIGHT</a></li>
                <ul>`;
    return nav
};
function showAllKantoMonImg(data) {
    var arrImg = [];

    const pokeDb = data["pokemon"]
    pokeDb.forEach(index =>{
        let n = index["name"]
        let i = index["img"]
        let img = `<a href='/pokemon/${n}'>`+
                    `<img alt='${n}' src='${i}' style='border: 2px solid black; border-radius: 25px;'  width="100" height="100">`+
                    `</a>`
        arrImg.push(img);
    });

    const imgItems = arrImg.join('   ')

    return imgItems;
};
function showAllKantoMonImg(data) {
    var arrImg = [];

    const pokeDb = data["pokemon"]
    pokeDb.forEach(index =>{
        let n = index["name"]
        let i = index["img"]
        let img = `<a href='/pokemon/${n}'>`+
                    `<img alt='${n}' src='${i}' style='border: 2px solid black; border-radius: 25px;'  width="100" height="100">`+
                    `</a>`
        arrImg.push(img);
    });

    const imgItems = arrImg.join('   ')

    return imgItems;
};


function getMonsByType(data, type){
    const byType = type
    console.log(byType)
    const db = data["pokemon"]
    let monsByType = [];
    //console.log(db[0]["name"])
    for (let i = 0; i < db.length; i++) {
        db[i]["type"].forEach(index => {
            if(index == byType){
                console.log("Yay!")
                monsByType.push(db[i]["name"])
            }
        });
    }
    return monsByType
};
function getDeetsByName(data, pokemon){
    const byName = pokemon.toLowerCase();
    console.log(byName)
    const db = data["pokemon"]
    //console.log(db[0]["name"])
    for (let i = 0; i < db.length; i++) {
        let temp =db[i]["name"].toLowerCase();
        if (temp === byName){
            console.log(db[i])
            return db[i]
        }
    }
};
function getImgByName(data, pokemon){
    const byName = pokemon.toLowerCase();
    const db = data["pokemon"]
    //console.log(db[0]["name"])
    for (let i = 0; i < db.length; i++) {
        let temp =db[i]["name"].toLowerCase();
        if (temp === byName){
            const img = monImg(db[i]["img"])
            return img
        }
    }
};
function generateForm(){
    const form ="<form method='POST' action='/pokemon'>"+
                    "PokeMon Name:<br>"+
                    "<input type='text' name='name'><br><br>"+
                    "PokeMon Image:<br>"+
                    "<input type='url' name='img' pattern='https?://.+'' title='Include http://'><br><br>"+
                    "PokeMon Height (m):<br>"+
                    "<input type='number' name='height' step='0.1' pattern='[0-9]'><br><br>"+
                    "PokeMon Weight (kg):<br>"+
                    "<input type='number' name='weight' step='0.1' pattern='[0-9]'><br><br>"+
                    "<input type='submit' value='Submit'>"+
                "</form>";
            return form
};
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

function pokeCard(name, pokedex){
    const byName = name.toLowerCase();
    const db = pokedex["pokemon"]

    let pokemon = {}
    for (let i = 0; i < db.length; i++) {
        let temp =db[i]["name"].toLowerCase();
        if (temp === byName){
            pokemon = db[i]
        }
    }

    const card =

       "<div style='background-color: gray; display: inline;flex: 1;display: flex;flex-flow: row nowrap;width: 650px;height: 250px;border: 5px solid black;border-radius: 125px;align-self: center;margin: 0 0 0 150px'>"+
        "<div style='margin-left: 100px'>"+
            "<a href='#'>"+
                `<img src='${pokemon["img"]}' width='200px' height='200px'>`+
            "</a>"+
        "</div>"+
        '<div style="flex: 1.5;text-align: left;margin: 0 auto;">'+
            '<p style="font-size: 20px;margin: 25px auto 25px 30px;line-height: 1.6;">'+
                `ID: ${pokemon["id"]}<br>`+
                `Number: ${pokemon["num"]}<br>`+
                `Name: ${pokemon["name"]}<br>`+
                `Height: ${pokemon["height"]}<br>`+
                `Weight: ${pokemon["weight"]}<br>`+
            '</p>'+
        '</div>'+
    '</div>'
    return card
};



/**
 * ===================================
 * Routes
 * ===================================
 */

 //to index page


app.get('/pokemon', (request, response) => {
    jsonfile.readFile(dexData, (err, obj) => {
        console.log("i is at pokemon list")
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

// app.get('/pokemon/:name', (request, response) => {
//     jsonfile.readFile(dexData, (err, obj) => {
//         console.log("i is at individual pokemon")
//         const header = pokemonBanner()
//         const nav = directory()

//         const monName = request.params.name;
//         const card = pokeCard(monName, obj);

//         const htmlBody =`<html>
//                         <body style='background-color: lightblue'>
//                             <div>
//                                 <pre style='text-align: center'>${header}</pre>
//                             </div>
//                             <div style='text-align: center'>
//                                 ${nav}
//                             </div>
//                             <div style='align-content: center'>
//                                 ${card}
//                             </div>
//                         </body>
//                     </html>`;
//         if(!htmlBody) response.send("Denied!");
//         console.log("YAS!")
//         response.send(htmlBody);
//         if (err) console.error(err);
//     });
// });

// app.get('/pokemon/add', (request, response) => {
//     console.log("i is at new pokemon")
//     jsonfile.readFile(dexData, (err, obj) => {
//         const header = newBanner()
//         const nav = directory()


//         const htmlBody =`<html>
//                         <body style='background-color: lightblue'>
//                             <div>
//                                 <pre style='text-align: center'>${header}</pre>
//                             </div>
//                             <div style='text-align: center'>
//                                 ${nav}
//                             </div>

//                         </body>
//                     </html>`;

//         if(!htmlBody) response.send("Denied!");
//         else {
//             console.log("YAS!");

//             response.send();
//         }
//         if (err) console.error(err);
//     });
// });
// app.post('/pokemon', (request, response) => {
//     jsonfile.readFile(dexData, (err, obj) => {
//         console.log("i just entered new pokemon")
//         const header = newBanner()
//         const nav = directory()

//         let temp = request.body;
//         console.log(temp)
//         const newPokemon = newMon(temp, obj)
//         console.log(newPokemon)
//         obj["pokemon"].push(newPokemon)

//         const pokeList = showAllKantoMonImg(obj)
//         const htmlBody =`<html>
//         <body style='background-color: lightblue'>
//         <div>
//         <pre style='text-align: center'>${header}</pre>
//         </div>
//         <div style='text-align: center'>
//         ${nav}
//         </div>
//         ${pokeList}
//         </body>
//         </html>`;

//         if(!htmlBody) response.send("Denied!");
//         else {
//             console.log("YAS!");

//             response.send(htmlBody);
//         }
//         jsonfile.writeFile(dexData, obj, (err) => {
//             console.log("yeyeyey")
//             console.log(err)
//             console.log("yeyeyey")
//         });
//     });
// });


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