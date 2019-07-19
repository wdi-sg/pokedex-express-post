var React = require('react');

const divStyle = {
    display:"inline-block",
    textAlign:"center",
    color: "yellow",
    border: "2px solid rgba(53,106,186,0.8)",
    padding: "20px 40px"
};

const imgStyle = {
    display:"block"
};

class PokemonCard extends React.Component {
  render() {
    return (
        <div style={divStyle}>
            <h2>{this.props.name}</h2>
            <img style={imgStyle} src={this.props.img}>
            </img>
            <h4>{this.props.num}</h4>
            <p>Weight: {this.props.weight}</p>
            <p>Height: {this.props.height}</p>
        </div>
    );
  }
}

module.exports = PokemonCard;

// <img style={imgStyle} src={this.props.pokemonData.img}></img>
//             <h3>{this.props.pokemonData.name}</h3>
//             <p>Pokemon ID: {this.props.pokemonData.id}</p>
//             <p>Weight: {this.props.pokemonData.weight}</p>