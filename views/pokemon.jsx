var React = require('react');
class Pokemon extends React.Component {
  render() {
    return (
      <html>
        <body>
          <div>
            Added Pokemon: {this.props.pokemon[this.props.pokemon.length - 1].name}
          </div>
        </body>
      </html>
    );
  }
}

module.exports = Pokemon;