var React = require('react');
var Pokesearch = require('./pokesearch');
var Pokecreate = require('./pokecreate');
var Pokeedit = require('./pokeedit');
var Pokedestroy = require('./pokedestroy');

class Header extends React.Component {
  render() {
    return (
      <html>
        <header>
          <title> POKEDEX </title>
          <link rel="stylesheet" href="/style.css"></link>
        </header>
        <body>
        <h1> The 151 Pokedex </h1>
        <Pokesearch/>
        <Pokecreate/>
        <Pokeedit/>
        <Pokedestroy/>
        </body>
      </html>
    );
  }
}

module.exports = Header;