var React = require('react');
class EditPokemon extends React.Component {
  render() {
    return (
      <html>
        <body>
          <div>
            <h1>Pokemon Data</h1>
            <form method="POST" action= {"/pokemon/" + this.props.id + "?_method=put"}>
            ID: <input type="text" name="id" value={this.props.id}/><br />
            Num: <input type="text" name="num" value={this.props.num}/><br />
            Name: <input type="text" name="name" value={this.props.name}/><br />
            Img: <input type="text" name="img" value={this.props.img}/><br />
            Height: <input type="text" name="height" value={this.props.height}/><br />
            Weight: <input type="text" name="weight" value={this.props.weight}/><br />
            <input type="submit" value="Submit"/>
            </form>
          </div>
        </body>
      </html>
    );
  }
}

module.exports = EditPokemon;