import React from 'react';

class PokemonList extends React.Component {
  render() {
    const pokemonList = this.props.pokemons.map(pokemon => {
      const pokemonLink = '/pokemon/' + pokemon.id;
      return <li><a href={pokemonLink}>{pokemon.name}</a></li>;
    });

    return (
      <div>
        <ul>
          {pokemonList}
        </ul>
      </div>
    );
  }
}

export default PokemonList;
