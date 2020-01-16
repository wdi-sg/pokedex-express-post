var React = require('react');

class PokemonPages extends React.Component {

  render() {

    const pokemon = this.props.name.map( pokemon => {
      return <li>{pokemon}</li>
    });

    return (
      <div>
      <h1>List of all Pokemon</h1>
        <ul>
        {pokemon} {pokemon}
        </ul>
      </div>
    );
  }
}

module.exports = PokemonPages;