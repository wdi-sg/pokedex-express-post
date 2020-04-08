var React = require("react");

class DisplayLast extends React.Component {
  render() {
    let pokemonObj = this.props;
    return (
      <div>
        <h2>Newly Added Pokemon</h2>
        <p>Id: {pokemonObj.id}</p>
        <p>Name: {pokemonObj.name}</p>
        <p>Height: {pokemonObj.height}</p>
        <p>Weight: {pokemonObj.weight}</p>
        <img src={pokemonObj.img}></img>
      </div>
    );
  }
}

module.exports = DisplayLast;
