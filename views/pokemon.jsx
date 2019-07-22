var React = require('react');


class PokemonPage extends React.Component {
  render() {
    return (
      <html>
        <body>
          <div>
            <img src= {this.props.pokemonData.img} />
            <p> {this.props.pokemonData.name} &nbsp;&nbsp;
            <a href={"/pokemon/"+this.props.pokemonData.id+"/detail"}>Detail</a>&nbsp;&nbsp;
            <a href={"/pokemon/"+this.props.pokemonData.id+"/edit"}>Edit</a>&nbsp;&nbsp;
            <a href={"/pokemon/"+this.props.pokemonData.id+"/delete"}>Delete</a>
            </p>
          </div>
        </body>
      </html>
    );
  }
}

module.exports = PokemonPage;