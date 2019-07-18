var React = require('react');

class Home extends React.Component {
    render() {
        const pokemon = this.props.pokemonKey.map(pokemon =>

           <li key={pokemon.name}>
           Name: {pokemon.name}
           Height: {pokemon.height}
           Weight: {pokemon.weight}
           <img src={pokemon.img} />
           </li>
        );
    return (
      <html>
        <body>
          <div>
            <h1>Hello! Welcome to Pokedex!</h1>
          </div>
          <ul>
            {pokemon}
          </ul>
        </body>
      </html>
    );
  }
}

module.exports = Home;