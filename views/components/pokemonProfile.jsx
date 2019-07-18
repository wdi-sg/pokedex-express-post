var React = require('react');

class PokemonProfile extends React.Component {
  render() {
    return (
        <div><img src={this.props.data.img}/><br/>{this.props.data.id} <br/>{this.props.data.num} <br/>{this.props.data.name}<br/>{this.props.data.weight}<br/>{this.props.data.height}<br/></div>

    );
  }
}

module.exports = PokemonProfile;
