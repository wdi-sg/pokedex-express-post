var React = require('react');

class Pokemon extends React.Component {
  render() {

        const pokemonList = this.props.pokemon.map((mon) => {
            return <li><a href={'/pokemon/'+mon.id}>{mon.name}</a></li>
        });

    return (

          <div>
            <h1>Pokemon List</h1>
            <a href="/">Back to Home page</a>
            <ul>
                {pokemonList}
            </ul>
          </div>

    );
  }
}

module.exports = Pokemon;