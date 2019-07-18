var React = require('react');

class Onepokemon extends React.Component {
    render() {
    return (
      <html>
        <body>
          <div>
            <h1>Hello! My name is {this.props.pokemonData.name}!</h1>
          </div>
          <div>
            <div key={this.props.pokemonData.name} className="pokemon">
                <img src={this.props.pokemonData.img} />
                <ul>
                    <li>Name: {this.props.pokemonData.name}</li>
                    <li>Height: {this.props.pokemonData.height}</li>
                    <li>Weight: {this.props.pokemonData.weight}</li>
                </ul>
           </div>
          </div>
        </body>
      </html>
    );
  }
}

module.exports = Onepokemon;