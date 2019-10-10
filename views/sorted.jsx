var React = require('react');

class Home extends React.Component {
  render() {
    return (
      <html>
        <body>
            <h1>Pokedex sort by {this.props.sortParam}</h1>
            <ul>{this.props.pokemonSorted.map(pokemon => (
                // react.fragment that functions as div, but doesn't display on page
                <React.Fragment>
                    <li><img src={pokemon.img}/></li>
                    <li>Pokemon: {pokemon.name}</li>
                    <li>Weight: {pokemon.weight}</li>
                    <li>Height: {pokemon.height}</li>
                    <hr/>
                </React.Fragment>
            )
            )}
            </ul>
        </body>
      </html>
    );
  }
}

module.exports = Home;