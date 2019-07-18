var React = require('react');

class Delete extends React.Component {
  render() {
    var url = "/pokemon/"+this.props.pokemonId + "?_method=DELETE";
    return (
      <html>
        <body>
            <p>
                <a href={"/pokemon/"+this.props.pokemonId}>CLICK ON ME</a>
            </p>

            <div>
            <h1>Delete a Pokemon</h1>
            <h3>Pokemon: {this.props.pokemonKey.name}</h3>
            <form action={url} method="POST">
                <input type="submit"/>
            </form>

          </div>
        </body>
      </html>
    );
  }
}

module.exports = Delete;