var React = require('react');

class PokemonDetails extends React.Component {
  render() {
    return (
        <div>{this.props.data.candy}<br/>
            {this.props.data.candy_count}<br/>
            {this.props.data.egg}<br/>
            {this.props.data.avg_spawns}<br/>
            {this.props.data.spawn_time}<br/>
            </div>

    );
  }
}

module.exports = PokemonDetails;
