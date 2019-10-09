var React = require('react');
class Edit extends React.Component {
  render() {

    var pokemon = this.props.pokemon.name

    return (
      <html>
        <body>
          <div>

           <h1> EDIT POKEMON: {pokemon}</h1>

            <form method="POST" action= {"/pokemon/" + this.props.id + "?_method=put"}>
              ID:
              <input type="text" name="id" value = {this.props.pokemon.id}/><br/>
              Number:
              <input type="text" name="num" value = {this.props.pokemon.num}/><br/>
              Name:
              <input type="text" name="name" value = {this.props.pokemon.name}/><br/>
              Image:
              <input type="text" name="img" value = {this.props.pokemon.img}/><br/>
              Height:
              <input type="text" name="height" value = {this.props.pokemon.height} /><br/>
              Weight:
              <input type="text" name="weight" value = {this.props.pokemon.weight}/><br/>
              <input type="submit" value="Submit" />

             </form>

          </div>
        </body>
      </html>
    );
  }
}

module.exports = Edit;