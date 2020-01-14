var React = require('react');
class PokemonPages extends React.Component {
  render() {
    return (
      <html>
        <body>
          <div>
            <h1>Pokemon Name: { this.props.name }</h1>
            <h2>Details</h2>
            <ul>
              <li>ID: {this.props.id}</li>
              <li>Number: {this.props.num}</li>
              <li>Height: {this.props.weight}</li>
              <li>Weight: {this.props.height}</li>
            </ul>
          </div>
        </body>
      </html>
    );
  }
}

module.exports = PokemonPages;