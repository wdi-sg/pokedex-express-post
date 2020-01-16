var React = require('react');
class PokemonPages extends React.Component {
  render() {
    return (
      <html>
        <body>
          <div>
            <h1>Pokemon Name: { this.props.name }</h1>
            <h2>Details</h2>
            <img src={this.props.img}></img>
            <ul>
              <li>ID: {this.props.id}</li>
              <li>Number: {this.props.num}</li>
              <li>Height: {this.props.height}</li>
              <li>Weight: {this.props.weight}</li>
            </ul>
          </div>
        </body>
      </html>
    );
  }
}

module.exports = PokemonPages;