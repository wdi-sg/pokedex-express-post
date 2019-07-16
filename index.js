const express = require('express');
const jsonfile = require('jsonfile');
const dexData = "pokedex.json"
const newDexData = "pokedex.json"
// const jsonfile = require('jsonfile');

/**
 * ===================================
 * Configurations and set up
 * ===================================
 */

// Init express app
const app = express();
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

/**
 * ===================================
 * Functions
 * ===================================
 */
function borderSide(string) {
    const rowSpace = "     ++                                                                                                ++";
    const borderPadding = "     ";
    const border = "++";
    const textInside = string;
    const spaceInsideRow = (rowSpace.length)-(borderPadding.length)-(border.length)-(border.length)-(textInside.length);

    let x = spaceInsideRow/2;

    let emptySpace = " ";
    const spaceBetween = emptySpace.repeat(x)

    const row = borderPadding+border+spaceBetween+textInside+spaceBetween+border;
    return row;
};
function borderTopBottom() {
    const row = "     ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++";
    return row;
};
function borderEmptyRow() {
    const row = "     ++                                                                                                ++";
    return row;
};


function pokedexBanner() {
    const rowA = borderSide("██████╗  ██████╗ ██╗  ██╗███████╗██████╗ ███████╗██╗  ██╗ ");
    const rowB = borderSide("██╔══██╗██╔═══██╗██║ ██╔╝██╔════╝██╔══██╗██╔════╝╚██╗██╔╝ ");
    const rowC = borderSide("██████╔╝██║   ██║█████╔╝ █████╗  ██║  ██║█████╗   ╚███╔╝  ");
    const rowD = borderSide("██╔═══╝ ██║   ██║██╔═██╗ ██╔══╝  ██║  ██║██╔══╝   ██╔██╗  ");
    const rowE = borderSide("██║     ╚██████╔╝██║  ██╗███████╗██████╔╝███████╗██╔╝ ██╗ ");
    const rowF = borderSide("╚═╝      ╚═════╝ ╚═╝  ╚═╝╚══════╝╚═════╝ ╚══════╝╚═╝  ╚═╝ ");
    const rowSpace = borderEmptyRow();
    const row = borderTopBottom();

    const msg = row+"<br>"+rowSpace+"<br>"+rowA+"<br>"+rowB+"<br>"+rowC+"<br>"+rowD+"<br>"+rowE+"<br>"+rowF+"<br>"+rowSpace+"<br>"+row+"<br>";
    //const instruction = rowSpace+"<br>"+rowG+"<br>"+rowH+"<br>"+rowI+"<br>"+rowJ+"<br>"+rowK+"<br>"+rowSpace+"<br>"+row;

    return msg
};

function kantoBanner() {
    const rowA = borderSide("▄ •▄  ▄▄▄·  ▐ ▄ ▄▄▄▄▄         ▄▄▄  ▄▄▄ . ▄▄ • ▪         ▐ ▄ ");
    const rowB = borderSide("█▌▄▌▪▐█ ▀█ •█▌▐█•██  ▪        ▀▄ █·▀▄.▀·▐█ ▀ ▪██ ▪     •█▌▐█");
    const rowC = borderSide("▐▀▀▄·▄█▀▀█ ▐█▐▐▌ ▐█.▪ ▄█▀▄    ▐▀▀▄ ▐▀▀▪▄▄█ ▀█▄▐█· ▄█▀▄ ▐█▐▐▌");
    const rowD = borderSide("▐█.█▌▐█ ▪▐▌██▐█▌ ▐█▌·▐█▌.▐▌   ▐█•█▌▐█▄▄▌▐█▄▪▐█▐█▌▐█▌.▐▌██▐█▌");
    const rowE = borderSide("·▀  ▀ ▀  ▀ ▀▀ █▪ ▀▀▀  ▀█▄▀▪   .▀  ▀ ▀▀▀ ·▀▀▀▀ ▀▀▀ ▀█▄▀▪▀▀ █▪");
    const rowSpace = borderEmptyRow();
    const row = borderTopBottom();

    const title = row+"<br>"+rowSpace+"<br>"+rowSpace+"<br>"+rowA+"<br>"+rowB+"<br>"+rowC+"<br>"+rowD+"<br>"+rowE+"<br>"+rowSpace+"<br>"+row+"<br>";
    return title
};
function directory() {
    const dir = "<a href='/'>Index</a>"+
                    "<ul>"+
                    "<li><a href='/pokedex'>PokeDex</a></li>"+
                        "<ul>"+
                            "<li><a href='/pokedex/new'>New</a></li>"+
                            "<li><a href='/pokedex/kanto'>Kanto</a></li>"+
                        "<ul>"
                    "<ul>";
    return dir
};
function showAllKantoMon(data) {
    const listStart = "<ol>";
    const listEnd = "</ol>";
    var arrList = [];

    const pokeDb = data["pokemon"]
    pokeDb.forEach(index =>{
        let n = index["name"]
        let li = `<li><a href='/pokedex/kanto/${n}'>`+n+"</a></li>"
        arrList.push(li);
    });

    const listItems = arrList.join(' ')

    const allPoke = listStart + listItems + listEnd;
    console.log(listStart)
    console.log(listItems)
    console.log(listEnd)
    return allPoke;
};
function showAllKantoMonImg(data) {
    var arrImg = [];

    const pokeDb = data["pokemon"]
    pokeDb.forEach(index =>{
        let n = index["name"]
        let i = index["img"]
        let img = `<a href='/pokedex/kanto/${n}'>`+
                    `<img alt='${n}' src='${i}' style='border: 2px solid black; border-radius: 25px;'  width="100" height="100">`+
                    `</a>`
        arrImg.push(img);
    });

    const imgItems = arrImg.join('   ')
    console.log(imgItems)
    return imgItems;
};
function newBanner() {
    const rowA = borderSide(" ▐ ▄ ▄▄▄ .▄▄▌ ▐ ▄▌     ▄▄▄·      ▄ •▄ ▄▄▄ .• ▌ ▄ ·.        ▐ ▄  ");
    const rowB = borderSide("•█▌▐█▀▄.▀·██· █▌▐█    ▐█ ▄█▪     █▌▄▌▪▀▄.▀··██ ▐███▪▪     •█▌▐█ ");
    const rowC = borderSide("▐█▐▐▌▐▀▀▪▄██▪▐█▐▐▌     ██▀· ▄█▀▄ ▐▀▀▄·▐▀▀▪▄▐█ ▌▐▌▐█· ▄█▀▄ ▐█▐▐▌ ");
    const rowD = borderSide("██▐█▌▐█▄▄▌▐█▌██▐█▌    ▐█▪·•▐█▌.▐▌▐█.█▌▐█▄▄▌██ ██▌▐█▌▐█▌.▐▌██▐█▌ ");
    const rowE = borderSide("▀▀ █▪ ▀▀▀  ▀▀▀▀ ▀▪    .▀    ▀█▄▀▪·▀  ▀ ▀▀▀ ▀▀  █▪▀▀▀ ▀█▄▀▪▀▀ █▪ ");
    const rowSpace = borderEmptyRow();
    const row = borderTopBottom();

    const title = row+"<br>"+rowSpace+"<br>"+rowSpace+"<br>"+rowA+"<br>"+rowB+"<br>"+rowC+"<br>"+rowD+"<br>"+rowE+"<br>"+rowSpace+"<br>"+row+"<br>";
    return title
};


function monImg(imgsrc){
    const img = `<img src='${imgsrc}'>`
    return img
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
    const form ="<form method='POST' action='/pokedex/new/pokemon'>"+
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

function newMonAdd(data){
    const pokemon = {};





    Object.defineProperties(pokemon, {
      "id": 1,
      "num": "001",
      "name": "Bulbasaur",
      "img": "http://www.serebii.net/pokemongo/pokemon/001.png",
      "height": "0.71 m",
      "weight": "6.9 kg"
  });
}

function pokeCard(img, id, num, name, height, weight){
    const card =

       "<div style='background-color: powderblue; display: inline;flex: 1;display: flex;flex-flow: row nowrap;width: 650px;height: 250px;border: 5px solid black;border-radius: 125px;align-self: center;'>"+
        "<div style='width: 250px;border:5px solid black;border-radius: 125px'>"+
            "<a href='#'>"+
                `<img src='${img}' width='200px' height='200px'>`+
            "</a>"+
        "</div>"+
        '<div style="flex: 1.5;text-align: left;">'+
            '<p style="font-size: 20px;margin: 25px auto 25px 30px;line-height: 1.6;">'+
                `ID: ${id}<br>`+
                `Number: ${num}<br>`+
                `Name: ${name}<br>`+
                `Height: ${height}<br>`+
                `Weight: ${weight}<br>`+
            '</p>'+
        '</div>'+
    '</div>'


return card
}



/**
 * ===================================
 * Routes
 * ===================================
 */

 //to index page
app.get('/', (request, response) => {
    const dir = directory()
    response.send(dir);
});
app.get('/pokedex', (request, response) => {
    const banner = pokedexBanner()
    const dir = directory()

    const htmlBody ="<html>"+"<body>"+"<div>"+"<pre>"+banner+"</pre>"+"</div>"+
                            dir +"</div>"+"</body>"+"</html>"

    response.send(htmlBody);
});
// app.get('/pokedex/kanto', (request, response) => {
//     jsonfile.readFile(dexData, (err, obj) => {
//         const title = kantoBanner()
//         const dir = kantoDir()
//         const pokeList = showAllKantoMon(obj)

//         const htmlBody ="<html>"+"<body>"+"<div>"+"<pre>"+title+"</pre>"+"</div>"+"<div>"+
//                         dir+"</div>"+"<div>"+pokeList +"</div>"+"</body>"+"</html>"

//         if(!htmlBody) response.send("Denied!");
//         else {
//             console.log("YAS!");

//             response.send(htmlBody);
//         }
//         if (err) console.error(err);
//     });
// });
app.get('/pokedex/kanto', (request, response) => {
    jsonfile.readFile(dexData, (err, obj) => {
        const title = kantoBanner()
        const dir = directory()
        const pokeList = showAllKantoMonImg(obj)

        const htmlBody ="<html>"+"<body>"+"<div>"+"<pre>"+title+"</pre>"+"</div>"+"<div>"+
                        dir+"</div>"+"<div>"+pokeList +"</div>"+"</body>"+"</html>"

        if(!htmlBody) response.send("Denied!");
        else {
            console.log("YAS!");

            response.send(htmlBody);
        }
        if (err) console.error(err);
    });
});
app.get('/pokedex/new', (request, response) => {
    jsonfile.readFile(dexData, (err, obj) => {
        const title = newBanner()
        const dir = directory()
        const form = generateForm()

        const htmlBody ="<html>"+"<body>"+"<div>"+"<pre>"+title+"</pre>"+"</div>"+"<div>"+
                        dir+"</div>"+"<div>"+form +"</div>"+"</body>"+"</html>"

        if(!htmlBody) response.send("Denied!");
        else {
            console.log("YAS!");

            response.send(htmlBody);
        }
        if (err) console.error(err);
    });
});
app.post('/pokedex/new/pokemon', (request, response) => {
    // const title = newBanner()()
    // const dir = newDir()
    // const form = generateForm()


    jsonfile.readFile(newDexData, (err, obj) => {
        const title = newBanner()
        const dir = directory()


        let newMon = request.body;

        const currentMonLength = obj["pokemon"].length;
        const newMonId = currentMonLength + 1;

        let hNum = newMon.height;
        newMon.height = hNum + " m"
        let wNum = newMon.weight;
        newMon.weight = wNum + " kg"
        newMon.id = newMonId;
        newMon.num = "#"+newMonId;

        const card = pokeCard(newMon.img, newMon.id, newMon.num, newMon.name,newMon.height,newMon.weight)

        obj["pokemon"].push(newMon)




        const htmlBody ="<html>"+"<body>"+"<div>"+"<pre>"+title+"</pre>"+"</div>"+"<div>"+
                        dir+"</div>"+"<div>"+card +"</div>"+"</body>"+"</html>"

        if(!htmlBody) response.send("Denied!");
        else {
            console.log("YAS!");

            response.send(htmlBody);
        }
        jsonfile.writeFile(dexData, obj, (err) => {
            console.log(err)
        });
    });
});

app.get('/pokedex/img/:name', (request, response) => {
    jsonfile.readFile(dexData, (err, obj) => {
        const monName = request.params.name;
        const img = getImgByName(obj, monName);
        if(!img) response.send("Denied!");
        console.log("YAS!")
        response.send(img);
        if (err) console.error(err);
    });
});
app.get('/pokedex/type/:type', (request, response) => {
    jsonfile.readFile(dexData, (err, obj) => {
        const monType = request.params.type;
        const monsByType = getMonsByType(obj, monType);

        if(!monsByType) response.send("Denied!");
        console.log("YAS!")
        response.send(monsByType);
        if (err) console.error(err);
    });
});
app.get('/pokedex/kanto/:name', (request, response) => {
    jsonfile.readFile(dexData, (err, obj) => {
        const monName = request.params.name;
        console.log(monName)
        const fullDeets = getDeetsByName(obj, monName);
        console.log(fullDeets)
        if(!fullDeets) response.send("Denied!");
        else {
            console.log("YAS!");
            response.send(fullDeets);
        }
        if (err) console.error(err);
    });
});

/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));