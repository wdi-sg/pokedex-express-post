var React = require("react");
var Display = require("./pokemon-display");

class DisplayAll extends React.Component {
  render() {
    let pokemons = this.props.pokemon.map((element) => {
      return <Display pokemon={element} />;
    });
    return (
      <div>
        <h1>All Pokemon Data</h1>
        {pokemons}
      </div>
    );
  }
}

module.exports = DisplayAll;
