var React = require('react');

class allpokemon extends React.Component {
  render() {
    return (
        <div>
        <h2>Name: {this.props.name}</h2>
        <p>id: {this.props.id}</p>
        <p>Number: {this.props.num}</p>
        <p>Height: {this.props.height}</p>
        <p>Weight: {this.props.Weight}</p>
        </div>
    );
  }
}

module.exports = allpokemon;