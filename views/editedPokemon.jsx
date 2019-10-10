
var React = require('react');
class EditedPokemon extends React.Component {
    render() {
        return (
            <html>
        <body>
          <div>
            <h1>edited pokemon: {this.props.name}</h1>
            <h2>{this.props.height}</h2>
          </div>
        </body>
      </html>
            )
    }
}


module.exports = EditedPokemon;