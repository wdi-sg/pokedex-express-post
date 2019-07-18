var React = require('react');
var Pokemon  = require('./components/pokemonProfile.jsx');

class Home extends React.Component {
  render() {
    const pokemonList = this.props.pokemonsAll.map((pokemon)=>{
        return <Pokemon data={pokemon}/>
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
