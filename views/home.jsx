var React = require('react');
var List = require('./list.jsx');

class Home extends React.Component {
  render() {

    let pokemonList = this.props.pokemon;

    return (
      <html>
        <body>
          <div>

            <h1>Pokedex</h1>
            <div>
                <List pokemonList={pokemonList}/>
            </div>
          </div>
        </body>
      </html>
    );
  }
}
module.exports = Home;