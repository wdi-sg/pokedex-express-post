var React = require('react');

class Edit extends React.Component {
  render() {
    var url = "/pokemon/"+this.props.pokemonId + "?_method=PUT";
    return (
      <html>
        <body>
            <p>
                <a href={"/pokemon/"+this.props.pokemonId}>CLICK ON ME</a>
            </p>

            <div>
            <h1>Edit a Pokemon</h1>
            <h3>Pokemon: {this.props.pokemonKey.name}</h3>
            <form action={url} method="POST">
                <p>name</p>
                <input name="name" value={this.props.pokemonKey.name}/>
                <p>height</p>
                <input name="height" value={this.props.pokemonKey.height}/>
                <p>weight</p>
                <input name="weight" value={this.props.pokemonKey.weight}/>
                <input type="submit"/>
            </form>

          </div>
        </body>
      </html>
    );
  }
}

module.exports = Edit;