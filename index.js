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

// HOME PAGE
app.get('/', (req, res) => {
  jsonfile.readFile(FILE, (err, obj) => {
    if (req.query.sortby === 'id') return res.render('list-pokemon', { object: obj });
    if (req.params[0] === undefined) return res.render('index', { object: obj });
    return res.send('Wrong part of town');
  });
});

app.listen(PORT);
