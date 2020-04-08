var React = require("react");

class Display extends React.Component {
  render() {
    let pokemon = this.props.pokemon;
    return (
      <div>
        <p>Id: {pokemon.id}</p>
        <p>Name: {pokemon.name}</p>
        <p>Height: {pokemon.height}</p>
        <p>Weight: {pokemon.weight}</p>
        <img src={pokemon.img}></img>
      </div>
    );
  }
}

module.exports = Display;
