var React = require('react');


class PokemonProfile extends React.Component {
  render() {
    var url = "/pokemon/"+this.props.data.id;

    const aStyle = {
        textDecoration: 'none',
        color: 'black'
      };
    return (
        <div className="pokemon">
          <a style={aStyle} href={url}>
            <img src={this.props.data.img}/><br/>
            {this.props.data.id} <br/>
            {this.props.data.num} <br/>
            {this.props.data.name}<br/>
            {this.props.data.weight}<br/>
            {this.props.data.height}<br/>
          </a>
        </div>

    );
  }
}

module.exports = PokemonProfile;
