var React = require('react');

class Home extends React.Component {
  render() {
    return (

      <div>
        <h1>POKEDEX</h1>
        <h2>Pokemons</h2>
        <a href="/pokemon">See all Pokemons</a>

        <h2>To add new Pokemon, please fill in form below.</h2>
        <a href="/pokemon/new">Add new pokemon</a>
      </div>

    );
  }
}

module.exports = Home;