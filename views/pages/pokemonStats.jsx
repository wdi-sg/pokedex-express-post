var React = require('react'); // req npm library
var Header = require('../components/header'); // req file path
var PokemonCard = require('../components/pokemonCard');

const bodyStyle = {
    textAlign: "center",
    backgroundColor: "black",
    color: "yellow"
}

class PokemonStats extends React.Component {
  render() {
    return (
      <html>
        <body style={bodyStyle}>
          <div>
            <Header/>
            <PokemonCard img={this.props.pokemonData.img} name={this.props.pokemonData.name} height={this.props.pokemonData.height} weight={this.props.pokemonData.weight} num={this.props.pokemonData.num}/>
            <a href={"/pokemon/"+this.props.index+"/edit"}>Edit</a>
          </div>
        </body>
      </html>
    );
  }
}

module.exports = PokemonStats;