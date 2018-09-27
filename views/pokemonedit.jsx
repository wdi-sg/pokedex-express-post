var React = require('react');

class Pokemon extends React.Component {
  render() {
    console.log("THIS PROPS:", this.props.pokemon )
    let pokemonId = this.props.pokemon.id;
    let actionUrl = '/pokemon/'+pokemonId+'?_method=PUT'
    return (
      <div>
        <h1>EDIT POKEMON</h1>
        <form method="POST" action={actionUrl}>
          <p>id</p>
          <input name="id" value={this.props.pokemon.id}/>
          <p>name</p>
          <input name="name" value={this.props.pokemon.name}/>
          <p>height</p>
          <input name="height" value={this.props.pokemon.height}/>
          <input type="submit" />
        </form>
      </div>
    );
  }
}

module.exports = Pokemon;