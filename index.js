
const express = require('express');
const app = express();
const jsonfile = require('jsonfile');
const fileNew = 'pokedex_new.json';
const file = 'pokedex.json';

// this line below, sets a layout look to your express project
const reactEngine = require('express-react-views').createEngine();
app.engine('jsx', reactEngine);

// this tells express where to look for the view files
app.set('views', __dirname + '/views');

// this line sets react to be the default view engine
app.set('view engine', 'jsx');

const methodOverride = require('method-override')
app.use(methodOverride('_method'));

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

            console.log (request.query);
            console.log (request.query.sortby);


            obj.pokemon.sort ( (a, b) => {

                const sorter = request.query.sortby.toLowerCase();

                if (sorter === 'name') {

                    return a[sorter].localeCompare ( b[sorter] );

                } else {

                    return parseFloat(a[sorter]) - parseFloat(b[sorter]);
                };
            });
        };


        html += `<html><body style="margin:5vw;"><h1>Welcome to the online Pokedex!</h1><h2 style="color:red;">Pokemon:</h2>`;

        html += `<div style="margin-bottom:5vw;"><input type="button" onclick="window.location.href='/?sortby=name';" value="Sort by Name" /></div>`;

        html += `<form action="/?" method="get">`
        html += `<select name="sortby">`
        html += `<optgroup label="Sorting Criteria">`
        html += `<option value="">Select Attribute to Sort by</option>`
        html += `<option value="name">Sort by Name</option>`
        html += `<option value="id">Sort by ID</option>`
        html += `<option value="height">Sort by Height</option>`
        html += `<option value="weight">Sort by Weight</option>`
        html += `<option value="spawn_chance">Sort by Spawn Chance</option>`
        html += `<option value="avg_spawns">Sort by Average Spawns</option>`
        html += `</optgroup>`
        html += `</select>`
        html += `<input type="submit" value="Go"/>`
        html += `</form>`


        for (i in obj.pokemon) {

            html += `<a href = "/${obj.pokemon[i].name}">${obj.pokemon[i].id}. ${obj.pokemon[i].name}</a><br>`;
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
                html += `<h2>Pokedex ID number: <span style="color:red;">${pokes[i].id}</span></h2>`;
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

                html += `<a href = "/${pokes[i].name}">${pokes[i].id}. ${pokes[i].name}</a><br>`;
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
    html += `ID: <input type="number" name="id"><br />`;
    html += `Num: <input type="number" name="num"><br />`;
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

            console.error(err);

            response.redirect('/');

        });
    });
});


app.get('/:id/edit', (request, response) => {

    jsonfile.readFile (file, (err, obj) => {

        if (err) {console.log(err)};

        for (i in obj.pokemon) {

            if (obj.pokemon[i].id === parseInt(request.params.id)) {

                console.log("Pokemon to be edited: ", obj.pokemon[i] );

                return response.render('pokemonEditor', obj.pokemon[i] );

            };
        };

        return response.redirect('/');
    });
});


app.put('/:id', (request, response) => {

    console.log(request.params);
    console.log(request.body);

    jsonfile.readFile(file, (err, obj) => {

        if (err) {console.log(err)};

        let pokeIndex;

        for (i in obj.pokemon) {

            if (obj.pokemon[i].id === parseInt(request.params.id)) {

                pokeIndex = i;
            }

        }

        let poke = obj.pokemon[pokeIndex];

        poke.id = parseInt(request.body.id);
        poke.name = request.body.name;
        poke.height = request.body.height;
        poke.weight = request.body.weight;

        console.log("New Data: ", poke[request.body.id]);

        jsonfile.writeFile('pokedex.json', obj, (err) => {

            if (err) {console.log(err)};

            return response.redirect(`/${poke.name}`);

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













