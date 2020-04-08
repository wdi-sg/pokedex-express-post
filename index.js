const express = require('express');
const jsonfile = require('jsonfile');

const FILE = 'pokedex.json';

/**
 * ===================================
 * Configurations and set up
 * ===================================
 */

// Init express app
const app = express();


// tell your app to use the module
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));



// this line below, sets a layout look to your express project
const reactEngine = require('express-react-views').createEngine();
app.engine('jsx', reactEngine);

// this tells express where to look for the view files
app.set('views', __dirname + '/view');

// this line sets react to be the default view engine
app.set('view engine', 'jsx');



app.post('/pokemon', function(request, response) {

  //debug code (output request body)
  console.log(request.body);
jsonfile.readFile(FILE,(err,obj)=>{
    let nameCheck=false;
    let heightCheck=false;
    if(request.body.height>=100){

        response.send("Too high. Choose a different value")
        return;
    }

        let pokemonCount=0;
        let pokemonNameString="<ol>Pokemon Names";
        for(pokemonCount=0;pokemonCount<obj["pokemon"].length;pokemonCount++)
        {
                if(request.body.name === obj["pokemon"][pokemonCount]["name"])
                {
                    response.send("Exist in data base. Try again")
                    return;
                }
        }
    console.log(typeof request.body);
        console.log("The last number is "+obj["pokemon"][obj["pokemon"].length-1]["num"]);
    obj["pokemon"].push(request.body);
    let arrayLength=obj["pokemon"].length;
    obj["pokemon"][obj["pokemon"].length-1].num=arrayLength;
    obj["pokemon"][obj["pokemon"].length-1].id=arrayLength.toString();
    console.log(obj["pokemon"].length);
      const data=obj["pokemon"][obj["pokemon"].length-1];
      //response.send(data);
    //console.log("data passing through is"+data);
       response.render("newpokemon",data);
      jsonfile.writeFile(FILE, obj, (err) => {
    console.error(err)

    // now look inside your json file

  });


                            });

  // save the request body

                                            });



/**
 * ===================================
 * Routes
 * ===================================
 */

app.get('/pokemon/new', (req, res) => {
  // render a template form here

  //const data = {name: "Sterling Archer"};
  res.render('insert');


});
app.get('/test',(req,res)=>{
    jsonfile.readFile(FILE,(err,obj)=>{

    let pokemonName=[];
    const data={};
    pokemonName=obj["pokemon"];
    function compare(a, b) {
  // Use toUpperCase() to ignore character casing
  const pokemonNameA = a.name;
  const pokemonNameB = b.name;

  let comparison = 0;
  if (pokemonNameA > pokemonNameB) {
    comparison = 1;
  } else if (pokemonNameA < pokemonNameB) {
    comparison = -1;
  }
  return comparison;
}
    let rearrangedName=pokemonName.sort(compare)
    //res.send(rearrangedName)
    res.send('testing done')
                });

});
app.get('/pokemon/index',(req,res)=>{
    console.log(parseInt(req.query.options))
    jsonfile.readFile(FILE,(err,obj)=>{


    const data=obj["pokemon"][parseInt(req.query.options)];

    //res.send(data);
    res.render('pokemon',data);

                });

});

app.get('/pokemon/type',(req,res)=>{

    jsonfile.readFile(FILE,(err,obj)=>{

    let pokemonWithType=[];
    const data={};
        let pokemonCount=0;
        let pokemonTypeCount=0;
        for(pokemonCount=0;pokemonCount<obj["pokemon"].length;pokemonCount++)
        {
            for(pokemonTypeCount=0;pokemonTypeCount<obj["pokemon"][pokemonCount]["type"].length; pokemonTypeCount++)
                        {
                            if(req.query.options===obj["pokemon"][pokemonCount]["type"][pokemonTypeCount])
                                {
                                    pokemonWithType.push(obj["pokemon"][pokemonCount]);
                                }
                        }
        }
        data.heading=req.query.options;
        data.pokemon=pokemonWithType;
console.log(data);
    //res.send(data);
    res.render('type',data);

                });

            });

app.get('/pokemon/:id', (request, response) => {

  // get json from specified file
  jsonfile.readFile(FILE, (err, obj) => {

    // check to make sure the file was properly read
    if( err ){

      console.log("error with json read file:",err);
      response.status(503).send("error reading filee");
      return;
    }
    // obj is the object from the pokedex json file
    // extract input data from request
    let inputId = parseInt( request.params.id );

    var pokemon;

    // find pokemon by id from the pokedex json file
    for( let i=0; i<obj.pokemon.length; i++ ){

      let currentPokemon = obj.pokemon[i];

      if( currentPokemon.id === inputId ){
        pokemon = currentPokemon;
      }
    }

    if (pokemon === undefined) {

      // send 404 back
      response.status(404);
      response.send("not found");
    } else {

      response.send(pokemon);
    }
  });
});



app.get('/', (req, res) => {
   //const data = {name: "Sterling Archer"};

jsonfile.readFile(FILE,(err,obj)=>{

    let pokemonNames=[];
    const data={};
        let pokemonCount=0;
        let pokemonNameString="";
        let context={pokemon:[]};
        for(pokemonCount=0;pokemonCount<obj["pokemon"].length;pokemonCount++)
        {
                pokemonNames.push(obj["pokemon"][pokemonCount]["name"]);
        }
    data.pokemon=pokemonNames;

    let pokemonType=[];


        for(pokemonCount=0;pokemonCount<obj["pokemon"].length;pokemonCount++)
        {
                pokemonType.push(obj["pokemon"][pokemonCount]["type"]);
        }
        let typing=pokemonType.flat(Infinity);
        const uniqueType=new Set(typing);
        const uniqueTypeArray=[...uniqueType];
        data.type=uniqueTypeArray;
        //res.send(data)
    res.render('home',data);

                });

//  res.render('home');
});

app.get('/sortByName', function(request, response) {

  //debug code (output request body)
  console.log("--------------------------");
  console.log(typeof request.query.options);
jsonfile.readFile(FILE,(err,obj)=>{


    if(request.query.options==="Name")
    {

        ///more refined style////
    let pokemonName=[];
    let data={};
    pokemonName=obj["pokemon"];
    function compare(a, b) {
  // Use toUpperCase() to ignore character casing
  const pokemonNameA = a.name;
  const pokemonNameB = b.name;

  let comparison = 0;
  if (pokemonNameA > pokemonNameB) {
    comparison = 1;
  } else if (pokemonNameA < pokemonNameB) {
    comparison = -1;
  }
  return comparison;
}
    let rearrangedName=pokemonName.sort(compare)
        data["heading"]="Name";
        data.pokemon=rearrangedName;

        //response.send(data);
        response.render(`sort`,data);
        return;
/* Draft first work
        let pokemonNames=[];
        let pokemonCount=0;
        let pokemonNameString="";
        let context={pokemon:[]};
        for(pokemonCount=0;pokemonCount<obj["pokemon"].length;pokemonCount++)
        {
                pokemonNames.push(obj["pokemon"][pokemonCount]["name"]);
        }
        pokemonNames=pokemonNames.sort();
        //console.log(pokemonNames);
            for(pokemonCount=0;pokemonCount<pokemonNames.length;pokemonCount++)
        {
                context.pokemon.push(pokemonNames[pokemonCount]);
                pokemonNameString+=`<li>${pokemonNames[pokemonCount]}</li>`;
        }
            console.log(context);*/
        //response.send(pokemonNameString);
        //const data={output:pokemonNameString};

    }
    if(request.query.options==="Weight"){
let pokemonWeight=[];
    let data={};
    pokemonWeight=obj["pokemon"];
    function compare(a, b) {
  // Use toUpperCase() to ignore character casing
  const pokemonWeightA = a.weight;
  const pokemonWeightB = b.weight;

  let comparison = 0;
  if (pokemonWeightA > pokemonWeightB) {
    comparison = 1;
  } else if (pokemonWeightA < pokemonWeightB) {
    comparison = -1;
  }
  return comparison;
}
    let rearrangedWeight=pokemonWeight.sort(compare)
        data["heading"]="Weight";
        data.pokemon=rearrangedWeight;
        //response.send(data);
         response.render(`sortweight`,data);
        //response.send(pokemonNameString);
        return;
/*first draft
        let pokemonNameWeight=[];
        let pokemonCount=0;
        let pokemonNameString="<ol>Pokemon Sort By Weight"
        let context={pokemon:[]};
        for(pokemonCount=0;pokemonCount<obj["pokemon"].length;pokemonCount++)
        {
                let pokemonName=obj["pokemon"][pokemonCount]["name"];
                let pokemonWeight=obj["pokemon"][pokemonCount]["weight"].replace(/[^0-9.]/g, "");
                console.log(pokemonWeight);
                pokemonNameWeight.push([pokemonName, pokemonWeight]);

        }
            pokemonNameWeight.sort(function(a,b){
                return a[1]-b[1];
            })

        for(pokemonCount=0;pokemonCount<pokemonNameWeight.length;pokemonCount++)
        {
            context.pokemon.push(`${pokemonNameWeight[pokemonCount][0]}: ${pokemonNameWeight[pokemonCount][1]} kg.`);
                pokemonNameString+=`<li>${pokemonNameWeight[pokemonCount][0]}: ${pokemonNameWeight[pokemonCount][1]} kg.</li>`;
        }
        pokemonNameString+="</ol>";*/

    }
    if(request.query.options==="Height"){
let pokemonHeight=[];
    let data={};
    pokemonHeight=obj["pokemon"];
    function compare(a, b) {
  // Use toUpperCase() to ignore character casing
  const pokemonHeightA = a.height;
  const pokemonHeightB = b.height;

  let comparison = 0;
  if (pokemonHeightA > pokemonHeightB) {
    comparison = 1;
  } else if (pokemonHeightA < pokemonHeightB) {
    comparison = -1;
  }
  return comparison;
}
    let rearrangedHeight=pokemonHeight.sort(compare)
        data["heading"]="Weight";
        data.pokemon=rearrangedHeight;
        //response.send(data);
         response.render(`sortheight`,data);
        //response.send(pokemonNameString);
        return;
/*
        let pokemonNameHeight=[];
        let pokemonCount=0;
        let context={pokemon:[]};
        let pokemonNameString="<ol>Pokemon Sort By Height"
        for(pokemonCount=0;pokemonCount<obj["pokemon"].length;pokemonCount++)
        {
                let pokemonName=obj["pokemon"][pokemonCount]["name"];
                let pokemonHeight=obj["pokemon"][pokemonCount]["height"].replace(/[^0-9.]/g, "");
                pokemonNameHeight.push([pokemonName, pokemonHeight]);

        }
            pokemonNameHeight.sort(function(a,b){
                return a[1]-b[1];
            })

        for(pokemonCount=0;pokemonCount<pokemonNameHeight.length;pokemonCount++)
        {
                context.pokemon.push(`${pokemonNameHeight[pokemonCount][0]}: ${pokemonNameHeight[pokemonCount][1]} m.`);
                pokemonNameString+=`<li>${pokemonNameHeight[pokemonCount][0]}: ${pokemonNameHeight[pokemonCount][1]} m.</li>`;
        }
        console.log(context);
        //pokemonNameString+="</ol>";
        response.render(`byheight`,context);
       // response.send(pokemonNameString);
        return;*/
    }


                            });


                                            });
/**
 * ===================================
 * Creating a form
 * ===================================
 */




/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));