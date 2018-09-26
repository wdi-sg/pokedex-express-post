
const express = require('express');
const app = express();
const jsonfile = require('jsonfile');
const fileNew = 'pokedex_new.json';
const file = 'pokedex.json';

app.use(express.json());
app.use(express.urlencoded({extended: true}));


var capFirstLetter = (string) => {

    return string.charAt(0).toUpperCase() + string.substr(1);
};


var handleRequestRoot = (request, response) => {

    console.log("Handling response now...");
    console.log("Request path: " + request.path);
    console.log(`Requesting Pokedex root`)

    jsonfile.readFile(file, (err, obj) => {

        if (err) {console.log(err)};

        let html = "";

        html += `<html><body style="margin:5vw;"><h1>Welcome to the online Pokedex!</h1><h3 style="color:red;">Pokemon:</h3>`;

        for (i in obj.pokemon) {

            html += `<a href = "/${obj.pokemon[i].name}">${parseInt(i)+1}. ${obj.pokemon[i].name}</a><br>`;
        };

        html += `</body></html>`;

        response.send(html);
    });
};


var handleRequestName = (request, response) => {

    console.log("Handling response now...");
    console.log("Request path: " + request.path);
    console.log(`Requesting name = ${request.params.name}`)

    jsonfile.readFile(file, (err, obj) => {

        if (err) {console.log(err)};

        const pokes = obj.pokemon
        const pokeName = request.params.name

        for (i in pokes) {

            if (pokes[i].name.toLowerCase() === pokeName.toLowerCase()) {

                let html = "";

                html += `<html><body style="margin:5vw;"><h1>${pokes[i].name}</h1>`;
                html += `<img src = '${pokes[i].img}'>`;
                html += `<h2>Pokedex ID number: <span style="color:red;">${pokes[i].num}</span></h2>`;
                html += `<h2>Height: ${pokes[i].height}</h2>`;
                html += `<h2>Weight: ${pokes[i].weight}</h2>`;

                if (pokes[i].type.length > 1) {

                    html += '<h2>Types:</h2>'
                    pokes[i].type.forEach( function(elem) {
                        html += `<ul style="color:blue;">${elem}</ul>`;
                    });

                } else {html += `<h2>Type: ${pokes[i].type}</h2>`;};

                if (pokes[i].weaknesses.length > 1) {

                    html += '<h2>Weaknesses:</h2>'
                    pokes[i].weaknesses.forEach( function(elem) {
                        html += `<ul style="color:blue;">${elem}</ul>`;
                    });

                } else {html += `<h2>Weakness: ${pokes[i].weaknesses}</h2>`;};

                html += `</body></html>`;

                return response.send(html);

            };
        };

        response.status (302);
        response.redirect ('/');
        });
};


var handleRequestType = (request, response) => {

    console.log("Handling response now...");
    console.log("Request path: " + request.path)
    console.log(`Requesting all Pokemon with type = ${request.params.type}`);

    jsonfile.readFile(file, (err, obj) => {

        if (err) {console.log(err)};

        const pokes = obj.pokemon
        const pokeType = request.params.type;

        const resultTypes = [];

        for (i in pokes) {

            if (pokes[i].type.includes(capFirstLetter(pokeType.toLowerCase()))) {

                resultTypes.push(pokes[i].name);
            };
        };

        if (resultTypes.length === 0) {

            response.status (302);
            response.redirect ('/');
        }

        else {response.send(resultTypes);};
    });
};


var handleRequestWeak = (request, response) => {

    console.log("Handling response now...");
    console.log("Request path: " + request.path);
    console.log(`Requesting all Pokemon that are weak to ${request.params.weaknesses}`)

    let result;

    jsonfile.readFile(file, (err, obj) => {

        if (err) {console.log(err)};

        const pokes = obj.pokemon
        const pokeWeakness = request.params.weaknesses;

        const resultWeak = [];

        for (i in pokes) {

            if (pokes[i].weaknesses.includes(capFirstLetter(pokeWeakness.toLowerCase()))) {

                resultWeak.push(pokes[i].name);
            };
        };

        if (resultWeak.length === 0) {

            response.status (302);
            response.redirect ('/');
        }

        else {response.send(resultWeak);};
    });
};


var handleRequestEvo = (request, response) => {

    console.log("Handling response now...");
    console.log("Request path: " + request.path);
    console.log(`Requesting previous evolutions for ${request.params.prevevos}`);

    let result;

    jsonfile.readFile(file, (err, obj) => {

        if (err) {console.log(err)};

        const pokes = obj.pokemon;
        const pokeName = request.params.prevevos;

        for (i in pokes) {

            if (pokes[i].name.toLowerCase() === pokeName.toLowerCase()) {

                if (pokes[i].prev_evolution) {

                    return response.send (pokes[i].prev_evolution);

                } else {return response.send (`${capFirstLetter(request.params.prevevos.toLowerCase())} has no previous evolutions!`);};
            };
        };

        response.status (302);
        response.redirect ('/');
    });
};


var handleRequestSearch = (request, response) => {

    console.log("Handling response now...");
    console.log("Request path: " + request.path);
    console.log(`Requesting Pokemon with ${request.params.searchattribute} ${request.query.compare} than ${request.query.amount}...`);
    console.log(request.query);

    jsonfile.readFile(file, (err, obj) => {

        if (err) {console.log(err)};

        const pokes = obj.pokemon;
        const attr = request.params.searchattribute;

        var operators = {
            'more': function(a, b) { return a > b },
            'less': function(a, b) { return a < b },
        };

        let html = "";
        html += `<html><body style="margin:5vw;"><h1>Pokedex Query</h1><h3 style="color:red;">Pokemon with ${request.params.searchattribute.replace('_', ' ')} ${request.query.compare} than ${request.query.amount}:</h3>`;

        for (i in pokes) {

            if (operators[request.query.compare] (parseFloat(pokes[i][request.params.searchattribute]), (request.query.amount))) {

                html += `<a href = "/${pokes[i].name}">${parseInt(i)+1}. ${pokes[i].name}</a><br>`;
            };
        };

        html += `</body></html>`;
        return response.send (html);
    });
};


// Expose a new endpoint that intercepts GET requests to /pokemon/new,
// which responds with a HTML page with a form that has these fields: id, num, name, img, height, and weight

// Point the form to submit data to the (/pokemon) route using POST method

// (for the id and num fields, for now, the user will simply choose a number.
// Obviously if they happen to pick an id that already exists, they will have a bad time. We will have the tools to correct this soon)

// Expose a new endpoint that accepts POST requests to /pokemon,
// which parses the form data and saves the new pokemon data into pokedex.json


app.get('/pokemon/new', (request, response) => {

    let html = `<html><body style="margin:5vw;">`;

    html += `<h3 style="color:red;">Pokedex data submitter</h3>`;
    html += '<form method="POST" action="/pokemon">';
    html += `ID: <input type="text" name="id"><br />`;
    html += `Num: <input type="text" name="num"><br />`;
    html += `Name: <input type="text" name="name"><br />`;
    html += `Image Link: <input type="text" name="img"><br />`;
    html += `Height: <input type="text" name="height"><br />`;
    html += `Weight: <input type="text" name="weight"><br />`;

    html += '<input type="submit" value="Submit">';
    html += "</form>";
    html += "</body><html>";

    response.send( html );
});


app.post('/pokemon', (request, response) => {

    console.log(request.body);

    jsonfile.writeFile('data.json', request.body, (err) => {
        console.error(err)

        response.send(request.body);
    });
});


app.get('/search/:searchattribute', handleRequestSearch);
app.get('/type/:type', handleRequestType );
app.get('/weaknesses/:weaknesses', handleRequestWeak );
app.get('/prevevolution/:prevevos', handleRequestEvo );
app.get('/:name', handleRequestName );
app.get('/', handleRequestRoot );


app.listen(3001, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));

















