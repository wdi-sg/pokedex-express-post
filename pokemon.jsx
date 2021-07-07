var React = require('react');

class Pokemon extends React.Component {
  render() {
    console.log("THIS PROPS:", this.props )
    return (
      <div>
          {this.props.pokemon.name}
          <img src={this.props.pokemon.img} />
      </div>
    );
  }
}

module.exports = Pokemon;