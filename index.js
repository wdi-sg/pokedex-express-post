const express = require("express");
const jsonfile = require("jsonfile");
const FILE = "pokedex.json";
const app = express();

const reactEngine = require("express-react-views").createEngine();
app.engine("jsx", reactEngine);

app.set("views", __dirname + "/views");

app.set("view engine", "jsx");

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

//----------------------------
//----------------------------

//Submitting a new pokemon 
app.post("/pokemon/new", (req, res) => {
  let newPokemonObj = req.body;
  jsonfile.readFile(FILE, (err, obj) => {
    if (err) {
      return;
    }
    //Disallows blank fields from being submitted
    for (const property in req.body) {
      if (newPokemonObj[property] === "") {
        const comments = { comments: "Please complete all fields!" };
        res.render("pokemon-form", comments);
        return;
      }
    }
    //Checks that there are no duplicate names in existing pokemon array
    let pokemonArr = obj.pokemon;
    let duplicate = false;
    for (let index = 0; index < pokemonArr.length; index++) {
      const name = pokemonArr[index].name;
      if (name === newPokemonObj.name) {
        duplicate = true;
        break;
      }
    }
    if (duplicate) {
      const comments = { comments: "Error: Duplicate found in Name!" };
      res.render("pokemon-form", comments);
      return;
    }
    //Assigns correct Id and Number to new pokemon object before pushing it into the array 
    obj.lastKey = pokemonArr.length;
    newPokemonObj.id = obj.lastKey + 1;
    newPokemonObj.num = newPokemonObj.id.toString();
    pokemonArr.push(newPokemonObj);
    jsonfile.writeFile(FILE, obj, (err) => {
      if (err) {
        return;
      }
    });
    //Redirect to display newly added pokemon 
    res.redirect("http://127.0.0.1:3000/pokemon/display-new");
  });
});

//Form for creating new pokemon
app.get("/pokemon/new", (req, res) => {
  const comments = { comments: "" };
  res.render("pokemon-form", comments);
});

//Displays latest pokemon only
app.get("/pokemon/display-new", (req, res) => {
  jsonfile.readFile(FILE, (err, obj) => {
    let newIndex = obj.pokemon.length - 1;
    res.render("pokemon-display-last", obj.pokemon[newIndex]);
  });
});

//Displays all pokemon 
app.get("/pokemon", (req, res) => {
  jsonfile.readFile(FILE, (err, obj) => {
    res.render("pokemon-display-all", obj);
  });
});

app.get("/", (request, response) => {
  response.render("home");
});

app.listen(3000, () => console.log("Listening to port 3000"));
