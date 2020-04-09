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
app.get('/', (req, res) => {

    jsonfile.readFile(file, (err, obj) => {

        let data = obj
        //console.log(data)
        res.render('index', data);

    });
});

// app.get('/pokemon/index', (request, response) => {
//     response.render('index')
// });
// app.get('/pokemon/newpokemon', (request, response) => {
//     response.render('newpokemon')
// });
app.get('/pokemon/createnew', (request, response) => {
    response.render('createnew')
});
app.get("/pokemon/id/:x", (request, response) => {

    jsonfile.readFile(file, (err, obj) => {

        let i=0;
        let type;
        let pType2 = [];

        obj.pokemon.forEach ((element,index) => {
            if(element.id == request.params.x){
                i = index;
            }
        })
        //console.log(i)
        //POKEMON TYPE

        if(obj.pokemon[i].type.length == 1) {
            pType = obj.pokemon[i].type+" type";
        } else if (obj.pokemon[i].type.length == 2) {
            pType = "dual-type "+obj.pokemon[i].type[0]+"\/"+obj.pokemon[i].type[1];
        }

        if(obj.pokemon[i].type.length == 1) {
            pType2.push(obj.pokemon[i].type);
        } else if (obj.pokemon[i].type.length == 2) {
            pType2.push(obj.pokemon[i].type[0])
            pType2.push(obj.pokemon[i].type[1]);
        }

        data = {
            name:obj.pokemon[i].name,
            id:obj.pokemon[i].id,
            num:obj.pokemon[i].num,
            img:obj.pokemon[i].img,
            height:obj.pokemon[i].height,
            weight:obj.pokemon[i].weight,
            type:pType,
            type2:pType2
        }

        //console.log(data)
        response.render('pokemon',data)
    });
});

app.get("/type/:x", (request, response) => {

    jsonfile.readFile(file, (err, obj) => {
        let pokemon = [];
        let data = {};
        let data2 = {};
        for(let i=0; i<obj.pokemon.length; i++){

            if(obj.pokemon[i].type[0]==request.params.x) {
                data = {
                    name:obj.pokemon[i].name,
                    id:obj.pokemon[i].id,
                    img:obj.pokemon[i].img,
                }
                pokemon.push(data)
            }
            if(obj.pokemon[i].type.length == 2){
                if(obj.pokemon[i].type[1]==request.params.x) {
                    data = {
                        name:obj.pokemon[i].name,
                        id:obj.pokemon[i].id,
                        img:obj.pokemon[i].img,
                    }
                    pokemon.push(data)
                }
            }
        }
        data2["pokemon"]=pokemon
        response.render('type',data2)
    });
});

app.post('/pokemon/newpokemon', (request,response) => {

    jsonfile.readFile(file, (err, obj) => {

        jsonfile.writeFile('data.json', request.body, (err) => {
            //console.error(err)
        });
        // check id


        for(let i=0; i<obj.pokemon.length; i++) {
            //console.log(i)
            if(obj.pokemon[i].id == parseInt(request.body.id)) {
                data = {
                    "id": request.body.id,
                    "name": obj.pokemon[i].name,
                    "weight": obj.pokemon[i].weight,
                }
                response.render('home',data);
            }
        }
        // check num
        for(let i=0; i<obj.pokemon.length; i++) {
            //console.log(i)
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
        //console.log(obj.pokemon);
        response.render('newPoke',newPoke);
    });
});



/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));