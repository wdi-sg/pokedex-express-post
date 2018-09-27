import React from 'react';

class PokemonList extends React.Component {
  render() {
    const pokemonList = this.props.pokemons.map(pokemon => {
      const pokemonLink = '/pokemon/' + pokemon.id;
      return <li className="list-group-item text-center"><a href={pokemonLink}>{pokemon.name}</a></li>;
    });

    return (
      <html>
        <head>
          <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossOrigin="anonymous" />
        </head>
        <body>
          <div className="container">
            <h1 className="text-center">Sort by {this.props.sortBy}</h1>
            <ul className="list-group">
              {pokemonList}
            </ul>
          </div>
        </body>
      </html>
    );
  }
}

export default PokemonList;
