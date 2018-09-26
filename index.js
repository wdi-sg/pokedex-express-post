
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


        if (Object.keys(request.query).length > 0) {    // For queries e.g. /?sortby=name or /?sortby=height

            obj.pokemon.sort ( (a, b) => {

                return a.name.toLowerCase().localeCompare( b.name.toLowerCase() );
            });

            console.log (request.query);
            console.log (request.query.sortby);
            console.log (obj.pokemon);

        };


        html += `<html><body style="margin:5vw;"><h1>Welcome to the online Pokedex!</h1><h3 style="color:red;">Pokemon:</h3>`;

        html += `<div style="margin-bottom:5vw;"><input type="button" onclick="window.location.href='/?sortby=name';" value="Sort by Name" /></div>`;
        // html += `<div style="margin-bottom:5vw;"><a href=/?sortby=name>Sort by Name</a></div>`;  - Why are these approaches bad?


        for (i in obj.pokemon) {

            html += `<a href = "/${obj.pokemon[i].name}">${obj.pokemon[i].num}. ${obj.pokemon[i].name}</a><br>`;
        };

        html += `</body></html>`;

        return response.send(html);
    });
};


var handleRequestName = (request, response) => {    // For direct Pokemon search e.g. /mewtwo

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


var handleRequestSearch = (request, response) => {  // e.g. /search/spawn_chance?amount=1&compare=more

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

                html += `<a href = "/${pokes[i].name}">${pokes[i].num}. ${pokes[i].name}</a><br>`;
            };
        };

        html += `</body></html>`;
        return response.send (html);
    });
};


app.get('/pokemon/new', (request, response) => {    // Generates input form for new entries to Pokedex

    let html = `<html><body style="margin:5vw;">`;

    html += `<h3 style="color:red;">Pokedex data submitter</h3>`;
    html += '<form method="POST" action="/pokepost">';
    html += `ID: <input type="text" name="id"><br />`;
    html += `Num: <input type="text" name="num"><br />`;
    html += `Name: <input type="text" name="name"><br />`;
    html += `Image Link: <input type="text" name="img"><br />`;
    html += `Type: <input type="text" name="type[]"><br />`;
    html += `Height: <input type="text" name="height"><br />`;
    html += `Weight: <input type="text" name="weight"><br />`;
    html += `Weakness: <input type="text" name="weaknesses[]"><br />`;

    html += '<input type="submit" value="Submit">';
    html += "</form>";
    html += "</body><html>";

    response.send( html );
});


app.post('/pokepost', (request, response) => {  // Handles post for new Pokemon input

    console.log(request.body);

    jsonfile.readFile(file, (err, obj) => {

        if (err) {console.log(err)};

        obj.pokemon.push(request.body);

        jsonfile.writeFile('pokedex.json', obj, (err) => {

            console.error(err)

            response.redirect('/');

        });
    });
});


app.get('/search/:searchattribute', handleRequestSearch);
app.get('/type/:type', handleRequestType );
app.get('/weaknesses/:weaknesses', handleRequestWeak );
app.get('/prevevolution/:prevevos', handleRequestEvo );
app.get('/:name', handleRequestName );
app.get('/', handleRequestRoot );


app.listen(3001, () => console.log('~~~ Tuning in to the waves of port 3001 ~~~'));



// ## Further

// * Add a "Sort by name" button to the homepage (`/` route) that when clicked,
// sends a GET request with a query parameter specifying "?sortby=name" ( this requests a whole new page )

// * Implement this sort functionality as a drop down (`select` `input`) of all the sorting fields the user can choose to sort by.

// * Instead of saving `id` and `num` as random values input by the user via the form,
// implement the logic that guarantees the uniqueness of `id` and `num` of every newly created pokemon

//   * eg. if last pokemon in the `pokedex.json` has `"id": 151` and `"num": "151"`,
//   the new pokemon object could have `"id": 152` and `"num": "152"`
//   * Hint: You might consider adding a new key value pair in `pokedex.json`, like `"lastKey": 151`
//   * are there any other ways to make a unique id for something?
//   Remember that it is technically possible for 2 requests to be made to your server at almost the exact same time.
//   What would happen when request 1 comes in and you begin to write to the disk and
//   request 2 comes in and starts *and* finishes writing to the disk before request 1 finished writing to the disk?













