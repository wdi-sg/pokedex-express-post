var React = require('react');

class Pokemon extends React.Component {
  render() {

        const pokemonList = this.props.pokemon.map((mon) => {
            return <li key={mon.id}><a href={'/pokemon/'+mon.id}>{mon.name}</a></li>
        });

    return (


        <body>
          <div>
            <h1>Pokemon List</h1>
            <a href="/">Back to Home page</a>
            <ul>
                {pokemonList}
            </ul>
          </div>
        </body>
    );
  }
}

module.exports = Pokemon;