var React = require('react');
var Pokesearch = require('./pokesearch')
var Pokecreate = require('./pokecreate')

class Header extends React.Component {
  render() {
    return (
      <html>
        <header>
          <title> POKEDEX </title>
        </header>
        <body>
        <h1> The 151 Pokedex </h1>
        <Pokesearch/>
        <Pokecreate/>
        </body>
      </html>
    );
  }
}

module.exports = Header;