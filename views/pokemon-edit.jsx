var React = require('react');

class PokemonEdit extends React.Component {
  render() {
    let pokemonId = this.props.pokemon.id;
    let actionURL = '/pokemon/'+pokemonId+'?_method=PUT'
    return (
      <div>
        <form method="POST" action={actionURL}>
          <h1>Modify {this.props.pokemon.name}'s information</h1>
          <p>Id</p>
          <input name="id" value={this.props.pokemon.id}/>
          <p>Name</p>
          <input name="name" value={this.props.pokemon.name}/>
          <p>Weight</p>
          <input name="weight" value={this.props.pokemon.weight}/>
          <p>Height</p>
          <input name="height" value={this.props.pokemon.height}/>
          <br/>
          <input type='submit' value='Submit'/>
        </form>
      </div>
    );
  }
}

module.exports = PokemonEdit;