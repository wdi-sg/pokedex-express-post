var React = require("react");

//const Layout = require("./layout.jsx");

class showForm extends React.Component {
  render() {
    return (
      <div>
        <h1>View Pokemon</h1>
        <form
          method="POST"
          action={"/pokemon/" + this.props.index + "?_method=PUT"}
        >
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
        </form>
      </div>
    );
  }
}

module.exports = showForm;
