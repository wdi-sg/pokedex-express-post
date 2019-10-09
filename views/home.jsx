var React = require('react');

class Home extends React.Component {
  render() {

let pokemonArr = this.props.pokemon;
let allPokemon;

pokemonArr.map(function(pokemon) {
    allPokemon = <p>{pokemon.name}</p>
})


    return (
      <html>
        <body>
          <div>
            <h1>Hello</h1>
            <a href = "http://127.0.0.1:3000/pokemon/new">Click me to add new pokemon</a>
            <h2>These are all the existing pokemon</h2>
            {allPokemon}
          </div>
        </body>
      </html>
    );
  }
}

module.exports = Home;