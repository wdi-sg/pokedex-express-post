var React = require('react');

class Pokemon extends React.Component {
  render() {
        const pokemonList = this.props.pokemon.map((mon) => {
            return <li><a href={'/pokemon/'+mon.id}>{mon.name}</a></li>
        });

    return (

          <div>
            <h1>Pokemon Data</h1>
            <ul>
                {pokemonList}
            </ul>
          </div>

    );
  }
}

module.exports = Pokemon;