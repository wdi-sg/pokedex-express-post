const express = require('express');
const app = express();

const jsonfile = require('jsonfile');
const file = './pokedex.json';

const methodOverride = require('method-override');

//method override
app.use(methodOverride('_method'));

//static files
app.use(express.static(__dirname + '/public'));

//urlEncoded
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//view enngine
app.set("view engine", "ejs");

//HOMEPAGE
app.get('/', (req, res) =>{
    jsonfile.readFile(file, (err, obj) =>{
        res.render('home', obj);
    })
})
//SORT POKEMONS
app.get('/sort', (req, res) =>{
    console.log(req.body)
    res.redirect(`/`)
})
//EDIT PAGE
app.get('/pokemon/:id', (req, res) =>{
    jsonfile.readFile(file, (err, obj) =>{
        objAddOn = obj;
        objAddOn.addOn = {req};
        res.render('edit', objAddOn);
    })
});
//ADD POKEMONS
app.post('/pokemon/:id/add', (req, res)=>{
    console.log(req.body);
    jsonfile.readFile(file, (err, obj) =>{
        console.log(obj);
        // obj.push(req.body)
        jsonfile.writeFile(file, obj, (err)=>{
            if(err){console.log(err)};
        });
    });
    res.redirect(`/pokemon/${req.params.id}`)
});
//EDIT POKEMONS
app.put('/pokemon/:id/edit', (req, res)=>{
    console.log(req.body);
    res.redirect(`/pokemon/${req.params.id}`)
});
app.listen(3000, ()=>{console.log('PORT 3000 PORT 3000 PORT 3000 PORT 3000')})