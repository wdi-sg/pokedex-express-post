var React = require('react');

class Delete extends React.Component {
  render() {
    var url = "/pokemon/"+this.props.pokemon.id + "?_method=DELETE";
    return (
      <html>
        <body>
          <div>
            <h1>Delete Pokemon</h1>
            <p>pokemon: {this.props.pokemon.name}</p>
            <form action={url} method="POST">
                <button type="submit">Delete {this.props.pokemon.name}</button>
            </form>
          </div>
        </body>
      </html>
    );
  }
}

module.exports = Delete;
