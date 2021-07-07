var React = require('react');

class editForm extends React.Component {
  render() {
    let pokemonId = this.props.pokemon.id;
    let actionUrl = '/pokemon/' + pokemonId + '?_method=PUT';
    return (
      <div>
      <h1>EDIT POKEMON</h1>
      <img src={this.props.pokemon.img}/>
        <form method="POST" action={actionUrl}>
          <div>Pokemon ID</div>
          <input name="id" value={this.props.pokemon.id}/>

          <div>Pokemon Name</div>
          <input name="name" value={this.props.pokemon.name}/>

          <div>Pokemon Image</div>
          <input name="img" value={this.props.pokemon.img}/>

          <div>Pokemon Height</div>
          <input name="height" value={this.props.pokemon.height}/>

          <div>Pokemon Weight</div>
          <input name="weight" value={this.props.pokemon.weight}/>

          <input type="submit"/>
        </form>
      </div>
    );

  }
}

module.exports = editForm;

