var React = require('react');
var PokemonProfile  = require('./components/pokemonProfile.jsx');

class Home extends React.Component {
  render() {
    const pokemonList = this.props.pokemonsAll.map((pokemon)=>{
        return <PokemonProfile data={pokemon}/>
    });
    return (
      <html>
        <body>
          <h1>All Pokemons</h1>
          <div>{pokemonList}</div>
        </body>
      </html>
    );
  }
}

module.exports = Home;
