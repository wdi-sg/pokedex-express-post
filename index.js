const express = require('express');
const jsonfile = require('jsonfile');
const file = 'pokedex.json';
const app = express();

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

app.post('/pokemon', (request, response) => {
  console.log("POSASJHDBASJHDB")
  console.log(request.body);
})

app.get('/pokemon/new', (request,response)=> {
  console.log("LOADED")
  response.send(`<form method="POST" action="/pokemon">ID:<input type="text" name="id"><input type="submit" value="submit"></form>`);
});

app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));
