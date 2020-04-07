var React = require("react");

class Display extends React.Component {
  render() {
    let pokemon = this.props;
    return (
      <div>
        <h1>Pokemon Data</h1>
        <h2>Id: {pokemon.id}</h2>
        <h2>Name: {pokemon.name}</h2>
        <h2>Height: {pokemon.height}</h2>
        <h2>Weight: {pokemon.weight}</h2>
        <img src={pokemon.img}></img>
      </div>
    );
  }
}

module.exports = Display;
