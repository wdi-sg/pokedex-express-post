var React = require('react');

class PokemonEdit extends React.Component {
  render() {
    let pokemonId = this.props.pokemon.id;
    let actionURL = '/pokemon/'+pokemonId+'?_method=PUT'
    return (
     <html>
    <head>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous"/>
    </head>
    <body>
      <div class="container">
        <form method="POST" action={actionURL} name="edit"  onsubmit="return validateForm()">
          <h1>Modify {this.props.pokemon.name}'s information</h1>
          <p>Id</p>
          <input name="id" value={this.props.pokemon.id} readonly="readonly"/>
          <p>Name</p>
          <input name="name" value={this.props.pokemon.name} minlength="2" required/>
          <p>Weight</p>
          <input name="weight" value={this.props.pokemon.weight}/>
          <p>Height</p>
          <input name="height" value={this.props.pokemon.height}/>
          <br/>
          <input type='submit' value='Submit'/>
        </form>
      </div>
      </body></html>
    );
  }
}

module.exports = PokemonEdit;