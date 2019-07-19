var React = require('react');

class Delete extends React.Component {
  render() {
    var url = "/pokemon/"+this.props.pokemonId + "?_method=PUT";
    return (
      <html>
        <body>
          <div>
            <h1>Edit Pokemon!!!!!!</h1>
            <p>Pokemon: {this.props.pokemonKey.name}</p>
            <form action={url} method="POST">
                <p>Name:</p>
                <input name="name" value={this.props.pokemonKey.name}/>
                <p>Height:</p>
                <input name="height" value={this.props.pokemonKey.height}/>
                <p>Weight:</p>
                <input name="weight" value={this.props.pokemonKey.weight}/>
                <input type="submit"/>
            </form>

          </div>
        </body>
      </html>
    );
  }
}

module.exports = Delete;