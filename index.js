const express = require("express");
const app = express();
const http = require('http').Server(app)
const io = require('socket.io')(http);
const path = require("path");
const jsonfile = require('jsonfile');
const file = 'pokedex.json'

app.use(express.static('public'))

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname + '/public/main/index.html'));
});
io.on('connection', function (socket) {
  console.log('a user connected');
  socket.on('disconnect', function () {
    console.log('user disconnected');
  });
  socket.on('search query', function (query) {
    //  searchPokedex(query);
    //   console.log(query)
    queryResult(`${query}`)
    //io.emit('search result', msg);
  });
});
http.listen(3001, function () {
  console.log('listening on *:3001');
});
let result;
const searchPokedex = (query) => {
  jsonfile.readFile(file, (err, obj) => {
    const pokemons = obj['pokemon'];
    for (let poke in pokemons) {
      if (pokemons[poke].name.toLowerCase() == query) {
        result = pokemons[poke];
      }


    }
      io.emit('search result', result)
    console.log(result)

    // jsonfile.writeFile(file, obj, (err) => {
    // });
  }); //  console.log(result)

}

const queryResult = (query) => {
  let result = searchPokedex(`${query}`);
}