const express = require('express');
const jsonfile = require('jsonfile');

const FILE = 'pokedex.json';
const PORT = process.env.PORT || 8080;
const app = express();

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  }),
);

const reactEngine = require('express-react-views').createEngine();

app.engine('jsx', reactEngine);
app.set('views', `${__dirname}/views`);
app.set('view engine', 'jsx');

app.listen(PORT);
