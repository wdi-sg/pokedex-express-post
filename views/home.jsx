var React = require('react');

class Edit extends React.Component {
  render() {
    var url = "/pokemon/"+this.props.editedPokemonId + "?_method=PUT";
    return (
      <html>
        <body>
          <div>
            <h1>Edit a pokemon</h1>
            <p>Pokemon: {this.props.editedPokemon.name}</p>
            <form action={url} method="POST">
                <p>Name</p>
                <input name="name" value={this.props.editedPokemon.name}/>
                <p>height</p>
                <input name="height" value={this.props.editedPokemon.height}/>
                <input type="submit"/>
            </form>

          </div>
        </body>
      </html>
    );
  }
}

module.exports = Edit;