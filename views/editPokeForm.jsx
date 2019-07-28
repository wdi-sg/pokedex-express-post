var React = require("react");

//const Layout = require("./layout.jsx");

class editForm extends React.Component {
  render() {
    return (
      <div>
        <h1>Edit Pokemon</h1>
        <form method="PUT" action="/pokemon">
          ID:
          <input
            type="number"
            name="id"
            value={this.props.pokemonData.id}
          />
          Num:
          <input
            type="text"
            name="num"
            value={this.props.pokemonData.num}
          />
          Name:
          <input
            type="text"
            name="name"
            value={this.props.pokemonData.name}
          />
          img:
          <input
            type="text"
            name="img"
            value={this.props.pokemonData.img}
          />
          Height:
          <input
            type="text"
            name="height"
            value={this.props.pokemonData.height}
          />
          Weight:
          <input
            type="text"
            name="weight"
            value={this.props.pokemonData.height}
          />
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

module.exports = editForm;
