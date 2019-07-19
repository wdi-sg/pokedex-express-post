var React = require('react');

class Onepokemon extends React.Component {
  render() {
    console.log('creating a pokemon data li?');
    return (
        <li>
            {this.props.name} : {this.props.id} : {this.props.weight}
        </li>
    );
  }
}

module.exports = Onepokemon;