//Set up installled:
//npm init
//npm install express
//npm install -g nodemon
//npm install method-override

const express = require('express');
const jsonfile = require('jsonfile');
const file = 'pokedex.json'; //or whatever your json file is called
const app = express();
const reactEngine = require('express-react-views').createEngine();
app.engine('jsx', reactEngine);
app.set('views', __dirname + '/views');
app.set('view engine', 'jsx');
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
const methodOverride = require('method-override')
app.use(methodOverride('_method'));

//-----------------SETUP DONE-------------------//

//FUNC: THIS IS THE MAIN PAGE
app.get('/', (request, response) => {
    //add the list of pokemon
    //add the sorting function inside
  response.send(" Welcome to Pokedex, discovered a new Pokemon? Type '/pokemon/new'. ");
});

//FUNC: THIS IS TO FIND SPECIFIC POKEMON HEIGHT AND WEIGHT
app.get('/:pokemon', (request, response) => {
    let pokemonName = request.params.pokemon;
    let pokemonFound = false;
    jsonfile.readFile(file, (err, obj) => {
    if (err) {
        console.log('err');
    } else{
        console.log(pokemonName);
        for ( let i = 0; i < obj.pokemon.length; i++) {
            if (obj.pokemon[i].name.toLowerCase() === pokemonName.toLowerCase()){

                let target = obj.pokemon[i];
                let pokeName = obj.pokemon[i].name;
                let pokeWeight = obj.pokemon[i].weight;
                let pokeHeight = obj.pokemon[i].height;

                response.send( pokeName + " height is " + pokeWeight + " weight is " + pokeHeight);
                pokemonFound = true;
                break;
            }
        }
        if (!pokemonFound) {
            response.send( "No Pokemon" );
        }
    }
    })
});


// FUNC: CREATE FORM TO UPDATE NEW POKEMON
//STAGE 1: CREATE FORM PART

app.get('/pokemon/new', (request, response) => {

    let newInfo = '';

    newInfo =
              '<form method="POST" action="/pokemon">' +
              '<h1>UPDATE NEW POKEMON</h1>' +
              '<p>ID:</p>' +
              '<p><input name="id" value=" "/></p>' +
              '<p>NUM:</p>' +
              '<p><input name="id" value=" ""></p>' +
              '<p>POKEMON NAME:</p>' +
              '<p><input name ="name" value=" "></p>' +
              '<p>POKEMON IMAGE:' +
              '<p><input name ="image" value=" "></p>' +
              '<p>HEIGHT:' +
              '<p><input name ="height" value=" "></p>' +
              '<p>WEIGHT:</p>' +
              '<p><input name ="weight" value=" "></p>' +
              '<p>CANDY:</p>' +
              '<p><input name ="type" value=" "></p>' +
              '<p>CANDY COUNT:</p>' +
              '<p><input name ="type" value=" "></p>' +
              '<p>EGG:</p>' +
              '<p><input name ="egg" value=" "></p>' +
              '<p>AVERAGE SPAWNS:</p>' +
              '<p><input name ="spawns" value=" "></p>' +
              '<p><input type="submit" value="Submit"></p>' +
              '</form>';


response.send(newInfo);
console.log("form sent!");
});

// //STAGE 2: TO SUBMIT FORM INFO
app.post('/pokemon', (request,response) => {

  var formInfo = request.body;
  console.log( formInfo );

  // save in data file
  jsonfile.readFile(file, (err, obj) => {
    if( err ){
      console.log("error reading file");
      console.log(err)
    }

    console.log("what i currently have");
    console.log(obj.pokemon);

    // save data
    obj.pokemon.push(formInfo); // THIS IS TO INSERT DATA INTO THE JSON DATABASE
    // obj[key] = value;

    jsonfile.writeFile(file, obj, (err) => {
      if( err ){
        console.log("error writing file");
        console.log(err)
        response.status(503).send("no!");
      }else{
        console.log("~~~~~~~yay");

        console.log( "send response");
        response.send("New Pokemon is updated in Pokedex!");
      }

    });
  });

  console.log( "send response");
  response.send("yes!");
});


//Create form to update information to existing information
app.get('/pokemon/:id/edit', (request, response) => {


    jsonfile.readFile(file, (err, Obj)=> {
        let pokemonId = parseInt(request.params.id);
        let arrayId = (pokemonId - 1); //because the pokemon.id is 1, therefore to retrieve the array id (-1)

        obj.pokemon[arrayId].name = request.body.name;
        obj.pokemon[arrayId].img = request.body.img;
        obj.pokemon[arrayId].height = request.body.height;
        obj.pokemon[arrayId].weight = request.body.weight;
        obj.pokemon[arrayId].candy = request.body.candy;
        obj.pokemon[arrayId].candy_count = request.body.candy_count;
        obj.pokemon[arrayId].egg = request.body.egg;
        obj.pokemon[arrayId].avg_spawns = request.body.avg_spawns;
        obj.pokemon[arrayId].spawn_time= request.body.spawn_time;

        const changeObj = obj;

        jsonfile.writeFile(file, changeObj, (err)) => {

        }





        if(err) {
            console.log(err);
        }
        else{
            const animal = Obj.pokemon[id];




        }

        response.render('updateForm', data)
  });

});

app.get('/animals/:id/edit', (request, response)=>{

  jsonfile.readFile('data.json', (err, dataObj)=>{

    let animalsIndex = request.params.id;
    const animal = dataObj.animals[animalsIndex];

    const data = {
      index: animalsIndex,
      animalData : animal
    };

    console.log( data );

    response.render('editForm', data)
  });


  // response.send("WOW YAS");
});




app.put('/pokemon/:id/edit', (request, response)=>{

  console.log("REQUEST BODY");
  console.log( request.body);

  jsonfile.readFile('pokedex.json', (err, dataObj)=>{

    let id = request.params.id;
    // const currentAnimal = dataObj.animals[animalsIndex];
    dataObj.pokemon[pokemonIndex] = request.body;

    jsonfile.writeFile('pokedex.json', dataObj, (err)=>{
      response.send("WOW WORKS");
    });


  });

  response.send('PUT WORKS');
});
;


const PORT = 3000;
app.listen(PORT, ()=>{ console.log("starting to listen!"); })