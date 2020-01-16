var React = require('react');
class PokemonPages extends React.Component {
  render() {
    let formUrl = "/pokemon/"+this.props.id+"?_method=put";
    return (
      <html>
        <body>
          <form action={formUrl} method="POST">
          Pokemon Name: <input type="text" name="name" value={this.props.name}/><br></br>
          ID:<input type="text" name="id" value={this.props.id}/><br></br>
          Number:<input type="text" name="num" value={this.props.num}/><br></br>
          Image URL:<input type="text" type="text" name="img" value={this.props.img}/><br></br>
          Height:<input type="text" name="height" value={this.props.height}/><br></br>
          Weight:<input name="weight" type="text" value={this.props.weight}/><br></br>
          <input type="submit"/>
          </form>
        </body>
      </html>
    );
  }
}

module.exports = PokemonPages;