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
// this line below, sets a layout look to your express project
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

const methodOverride = require('method-override');
app.use(methodOverride('_method'));

app.get('/pokemon/:id/edit', (request, response => {
  console.log(request.body);
    jsonfile.readFile(file, (err,obj)=>{
      console.log(obj);
      var pokemon;
      let id = parseInt(request.params.id);
      let html = '<form method="POST" action="/pokemon/'+pokemon.id+'?_method=put">id: <input name="id" type="text" value="'+pokemon.id+'"/>num: <input name="num" type="text" value="'+pokemon.num+'"/>name: <input name="name" type="text" value="'+pokemon.name+'"/>img: <input name="name" type="text" value="'+pokemon.img+'"/>height: <input name="name" type="text" value="'+pokemon.height+'"/>weight: <input name="name" type="text" value="'+pokemon.weight+'"/></form>';
        response.send(html);
    });
   }));

   app.get("/putrequest/pokemon/:id", (request, response)=>{
    let html = `<a href="/names/0/edit">edit</a>`;
    response.send(html);
})
app.put("/pokemon/:id", (request, response) => {
 //read the file in and write out to it
     console.log(request.params.idd);
 jsonfile.readFile(file, (err,obj)=>{
   let id = parseInt(request.params.id);
   obj.pokemon[id].id= request.body.id;
   obj.pokemon[id].num = request.body.num;
   obj.pokemon[id].name = request.body.name;
   obj.pokemon[id].img = request.body.img;
   obj.pokemon[id].height = request.body.height;
   obj.pokemon[id].weight = request.body.weight;
     jsonfile.writeFile(file, obj,(err)=>{
     response.send("Successful!");
 })
 })
});
app.listen(3000);

 response.render("Edit", pokedex);



/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */

app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));
