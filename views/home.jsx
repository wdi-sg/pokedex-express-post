var React = require('react');

class Home extends React.Component {
    render() {
        const pokemon = this.props.pokemonKey.map(pokemon =>
           <div key={pokemon.name} className="pokemon">
                <img src={pokemon.img} />
                <ul>
                    <li>Name: {pokemon.name}</li>
                    <li>Height: {pokemon.height}</li>
                    <li>Weight: {pokemon.weight}</li>
                </ul>
           </div>
        );
    return (
      <html>
        <body>
          <div>
            <h1>Hello! Welcome to Pokedex!</h1>
          </div>
          <div>
            {pokemon}
          </div>
        </body>
      </html>
    );
  }
}

module.exports = Home;