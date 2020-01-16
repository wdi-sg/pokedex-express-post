var React = require('react');
class PokemonPages extends React.Component {
  render() {
    let formUrl = "/pokemon/"+this.props.id+"?_method=delete";
    return (
      <html>
        <body>
          <form action={formUrl} method="POST">
          Pokemon Name: <input type="text" name="name" value={this.props.name}/><br></br>
          ID:<input type="text" name="id" value={this.props.id}/><br></br>
          <input type="submit" value="Delete"/>
          </form>
        </body>
      </html>
    );
  }
}

module.exports = PokemonPages;