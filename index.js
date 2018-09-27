let pokeObj;
let result;
var typeArr = [];

const express = require('express');
const jsonfile = require('jsonfile');

const file = 'pokedex.json';

/**
 * ===================================
 * Configurations and set up
 * ===================================
 */

// Init express app
const app = express();

/**
 * ===================================
 * Routes
 * ===================================
 */

app.get('/', (request, response) => {

    jsonfile.readFile (file, function(err, obj) {

        console.log(file);

        pokeObj = obj.pokemon;

//--------------------------------------------------------------------
            //types of pokemon
           var typesOfPoke = [];

                for(i in pokeObj) {
                    for(j in pokeObj[i].type) {
                        typesOfPoke.push(pokeObj[i].type[j]);
                    }
                };



                typesOfPoke.forEach(function(item) {
                     if(typeArr.indexOf(item) < 0) {
                         typeArr.push(item);
                     }
                });

                console.log(typeArr);
//---------------------------------------------------------------------


var selectChange = function()
{
    var items = document.getElementsByTagName('option');
       for (i in items) {
        var str = items[i].value;
       }
        document.querySelectorAll('.catergory').value = str;

};

    var title = `Welcome to Pokedex!`;
    var html = '';
    html += "<html>";
    html += "<body>";
    html += "<h1>"+title+"</h1>";
    html += '<h2>Select your sort parameter:</h2>';

    html += '<form action="/search/sortby">';
    html += '<select name="choice">';
    html += '<option value="pokename">Name</option>';
    html += '<option value="type">Type</option>';
    html += '<option value="weakness">Weakness</option>';
    html += '</select>&nbsp';
    html += '<input type="submit" value="Submit">';
    html += '</form>';

    response.status(200);
    response.send(html);

    });
});




app.get('/search/sortby', (request, response) => {

    jsonfile.readFile (file, function(err, obj) {

        console.log(file);

        pokeObj = obj.pokemon;

//--------------------------------------------------------------------
            //types of pokemon
           var typesOfPoke = [];

                for(i in pokeObj) {
                    for(j in pokeObj[i].type) {
                        typesOfPoke.push(pokeObj[i].type[j]);
                    }
                };



                typesOfPoke.forEach(function(item) {
                     if(typeArr.indexOf(item) < 0) {
                         typeArr.push(item);
                     }
                });

                console.log(typeArr);
//---------------------------------------------------------------------

        let choice = request.query.choice.toLowerCase();

            response.status(200);


            var html = '';
            html += '<html>';
            html += '<body>';


                switch (choice) {
                    case "pokename":
                    html += '<h2 class="names-lib">Pokemon Name Library</h2>';
                        html += '<ul>';
                    for (i in pokeObj){
                        html += '<li><img src="'+ pokeObj[i].img +'"></div>';
                        html += '<a href="/' + pokeObj[i].name.toLowerCase() + ' ">' + pokeObj[i].name + '</a></li>';
                        html += '<br />';
                    };
                        break;
                    case "type":
                        html += '<h2 class="type">Types:</h2>';
                        html += '<ul>';
                        for (i in typeArr) {
                            html += '<li><a href="type/'+typeArr[i]+' ">'+typeArr[i].charAt(0).toUpperCase() + typeArr[i].substr(1) +'</a></li>';
                        };
                        break;

                    case "weakness":
                        html += '<h2 class="weakness">Weaknesses:</h2>';
                        html += '<ul>';
                            for (i in typeArr) {
                                html += '<div><a href="weakness/'+typeArr[i]+' ">'+typeArr[i].charAt(0).toUpperCase() + typeArr[i].substr(1) +'</a></div>';
                            };
                        break;
                    };

            html += '</ul>';
            html += '</body>';
            html += '</html>';
            response.send(html);

    });
});



app.get('/:name', (request, response) => {

    jsonfile.readFile (file, function(err, obj) {

        console.log(file);

        pokeObj = obj.pokemon;

        var req = request.params.name.toLowerCase();

        console.log(req);


// var result = pokeObj.filter(pokemon => pokemon.name);


            for (i in pokeObj) {

                if (req === pokeObj[i].name.toLowerCase()) {

                     var html = '';

                    html += "<html>";
                    html += "<body>";
                    html += "<h1>"+ req.charAt(0).toUpperCase() + req.substr(1) +"</h1>";

                    var pokeWeight = pokeObj[i].weight;

                    response.status(200);

            html += '<div class=image"><img src=" '+ pokeObj[i].img + ' "></div>';

            html += '<div class="weight-txt">Weight: '+ pokeWeight + '</div>';

            html += '<div class="type">Pokemon Type: ';
            pokeObj[i].type.forEach(function(elem) {
                html += `<a href="/type/${elem.toLowerCase()}">${elem}</a>&nbsp`
            });
            html += '</div>';


            html += '<div class="weaknesses">Weaknesses: ';
            pokeObj[i].weaknesses.forEach(function(elem) {
                html += `<a href="/weakness/${elem.toLowerCase()}">${elem}</a>&nbsp`
                });
            html += '</div>';


            html += '<div class="next-evo"> Next Evolution(s): ';
            if(pokeObj[i].next_evolution !== undefined) {
                pokeObj[i].next_evolution.forEach(function(elem) {
                    html += `<a href="/${elem.name.toLowerCase()}">${elem.name}</a>&nbsp`;
                });
                } else {
                    html += `None`;
                };
            html +='</div>';


            html += '<div class="prev-evo"> Previous Evolution(s): ';
            if(pokeObj[i].prev_evolution !== undefined) {
                pokeObj[i].prev_evolution.forEach(function(elem) {
                    html += `<a href="/${elem.name.toLowerCase()}">${elem.name}</a>&nbsp`;
                });
                } else {
                    html += `None`;
                };
                html +='</div>';
                html += "</body>";
                html += "</html>";
                return response.send(html);
            }

        };

        response.status(302);

        setTimeout(function(){
            response.redirect('/');
            }, 1000);


        console.log(request.path);

      // send response with some data (a string)
      // response.send(request.path);
  });

});



app.get('/type/:typename', (request, response) => {

    jsonfile.readFile (file, function(err, obj) {

        console.log(file);

        pokeObj = obj.pokemon;



            var type = request.params.typename.toLowerCase();
            var title = type.charAt(0).toUpperCase() + type.substr(1);
            var html = "";

            html += "<html>";
            html += "<body>";
            html += "<h1>"+title+"</h1>";
            html += "<ul>";

            for (i in pokeObj) {
                for (j in pokeObj[i].type) {
                    if (type === pokeObj[i].type[j].toLowerCase()) {

                    response.status(200);

                    html += '<li><img src="'+ pokeObj[i].img +'"></div>';
                    html += '<a href="/' + pokeObj[i].name.toLowerCase() + ' ">' + pokeObj[i].name + '</a></li>';
                    html += '<br />';
                    }
                }
            };

            html += "</ul>"
            html += "</body>";
            html += "</html>";

            response.send(html);

    });
});


app.get('/weakness/:weaknessname', (request, response) => {

    jsonfile.readFile (file, function(err, obj) {

        console.log(file);

        pokeObj = obj.pokemon;

            var weaknessName = request.params.weaknessname.toLowerCase();
            var title = weaknessName.charAt(0).toUpperCase() + weaknessName.substr(1);
            var html = '';

            html += "<html>";
            html += "<body>";
            html += "<h1>"+title+"</h1>";

            for (i in pokeObj) {
                for (j in pokeObj[i].weaknesses) {
                    if (weaknessName === pokeObj[i].weaknesses[j].toLowerCase()) {

                    response.status(200);

                    html += '<li><img src="'+ pokeObj[i].img +'"></div>';
                    html += '<a href="/' + pokeObj[i].name.toLowerCase() + ' ">' + pokeObj[i].name + '</a></li>';
                    html += '<br />';
                    }
                }
            };

            // html += "</ul>"
            html += "</body>";
            html += "</html>";

            response.send(html);
    });
});

app.get('/search/:item', (request ,response) => {

    jsonfile.readFile (file, function(err, obj) {

        console.log(file);

        pokeObj = obj.pokemon;

        let item = request.params.item.toLowerCase();
        let amount = request.query.amount;
        let compare = request.query.compare.toLowerCase();

        if (item === "spawn_chance") {

            var output = [];
            console.log(output);
            response.status(200);

            var html = '';
            html += "<html>";
            html += "<body>";
            html += '<ul>';

            for (i in pokeObj) {
                if(compare === "less" && pokeObj[i].spawn_chance !== undefined) {
                    if (amount > pokeObj[i].spawn_chance) {
                        output.push(pokeObj[i].name);
                        html += '<li><img src="'+ pokeObj[i].img +'"></div>';
                        html += '<a href="/' + pokeObj[i].name.toLowerCase() + ' ">' + pokeObj[i].name + '</a></li>';
                        html += '<br />';
                    };
                } else if (compare === "more") {
                    if (amount < pokeObj[i].spawn_chance) {
                        output.push(pokeObj[i].name);
                        html += '<li><img src="'+ pokeObj[i].img +'"></div>';
                        html += '<a href="/' + pokeObj[i].name.toLowerCase() + ' ">' + pokeObj[i].name + '</a></li>';
                        html += '<br />';
                    }
                }
            };
            html += '</ul>';
            html += '</body>';
            html += '</html>';
            response.send(html);
        };

    });
});


 // tell your app to use the module
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

app.post('/pokemon', function(request, response) {

  //debug code (output request body)
  console.log(request.body);


  // save the request body
  jsonfile.readFile(file, (err, obj) => {


      var resultFile = 'pokedex.json';

      obj["pokemon"].push(request.body);


      jsonfile.writeFile(resultFile, obj, (err) => {
        console.error(err)

        // now look inside your json file
        response.send(request.body);
     });
    });
});




app.get('/pokemon/new', (request, response) => {
    var html = '';
    html += '<html>';
    html += '<body>';
    html += '<h1>Create your own pokemon!</h1>'
    html += '<form method="POST" action="/pokemon">';
    html += "ID:";
    html += '<input type="number" name="id" min="152" max="250">';
    html += '<br />'
    html += "Number:";
    html += '<input type="number" name="num" min="152" max="250">';
    html += '<br />'
    html += "Name:";
    html += '<input type="text" name="name">';
    html += '<br />'
    html += "Image:";
    html += '<input type="text" name="img">';
    html += '<br />'
    html += "Type:";
    html += '<input type="text" name="type[]">';
    html += '<br />'
    html += "Weight:";
    html += '<input type="number" name="weight">'+'kg';
    html += '<br />'
    html += '<input type="submit" value="Submit">';
    html += "</form>";
    html += "</body>";
    html += "</html>";
  response.send(html);
});





/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));
