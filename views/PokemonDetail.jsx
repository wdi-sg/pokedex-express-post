import React from 'react';

class PokemonDetail extends React.Component {
  render() {
    return (
      <div>
        <h1>{this.props.name}</h1>
        <img src={this.props.img} alt={this.props.name} />
        <h2>ID</h2>
        <p>{this.props.id}</p>
        <h2>Height</h2>
        <p>{this.props.height}</p>
        <h2>Weight</h2>
        <p>{this.props.weight}</p>
      </div>
    );
  }
}

export default PokemonDetail;
