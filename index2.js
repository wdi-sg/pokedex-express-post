const express = require('express');
const jsonfile = require('jsonfile');

const FILE = 'pokedex.json';
// Init express app
const app = express();
//Configurations and set up
const reactEngine = require('express-react-views').createEngine();
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
//index
app.get('/index', (request,response)=> {

  //obj.pokemon.push(data);
  jsonfile.readFile(FILE, (err, obj) => {
    let allPokemon = [];

    for (i = 0; i < obj.pokemon.length; i++) {

      allPokemon.push(obj.pokemon[i].name);
      //console.log(currentPokemon);
    }
    let dataname = {
      name: allPokemon
    }
    response.render('all', dataname);
  });
});

//shows form
app.get('/pokemon/new', (request,response)=>{
    console.log(request.body);
    response.render("home");
})
//takes new pokemon
app.post('/pokemon', function(request, response) {
    var items = {
        id: request.body.id,
        num: request.body.num,
        name: request.body.name,
        img: request.body.img,
        height: request.body.height,
        weight: request.body.weight
    };

    jsonfile.readFile(FILE, (err, obj) =>{
        console.error(err);
        obj.pokemon.push(items);
        response.render('main', items);
    jsonfile.writeFile(FILE, obj, (err) => {

        response.send("Added pokemon: " + items.name)

         });
     //response.send(items);
})
})

app.get('/new', (request,response)=>{
    jsonfile.readFile('pokedex.json', (err, obj) => {
        let data={};
        let i = 0;
        for(i = 0;i<obj.pokemon.length;i++){
             data = {
            id: obj.pokemon[i].id,
            num: obj.pokemon[i].num,
            name: obj.pokemon[i].name,
            img: obj.pokemon[i].img,
            height: obj.pokemon[i].height,
            weight: obj.pokemon[i].weight
            }
    console.log(data);
    //response.send(data);
    response.render('main',data);
        }
    //console.log(data);
    //response.render('main',data);
    })
})
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));