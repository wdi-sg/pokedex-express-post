var React = require('react');

class Home extends React.Component {
  render() {

    let searchId = parseInt(this.props.search);
    let pokedex = this.props.pokedex;
    let pokemon;

    for (let i in pokedex) {
      if (pokedex[i].id === searchId) {
        pokemon = pokedex[i];
        break;
      }
    }

    if (pokemon) {

      return (
        <html>
          <header>
            <title>{pokemon.id} {pokemon.name}</title>
          </header>
          <body>
            <h1>{pokemon.name}</h1>
            <img src={pokemon.img} />
            <ul>
              <li>ID: {pokemon.id}</li>
              <li>Height: {pokemon.height}</li>
              <li>Weight: {pokemon.weight}</li>
            </ul>
          </body>
        </html>
      )

    } else {
      return (<p>Nothing found!</p>);
    }
  }
}

module.exports = Home;
