var React = require('react');

class edit extends React.Component {
  render() {
    var url = "/pokemon/"+this.props.pokemonId.id + "?_method=PUT";
    return (
      <html>
        <body>
          <div>
          <h1> Edit Pokemon Data </h1>
            <form method="POST" action={url} >
                <p>Name</p>
                <input name="name" defaultValue={this.props.pokemonId.name}/>
                <p>ID</p>
                <input name="id" defaultValue={this.props.pokemonId.id}/>
                <p>Num</p>
                <input name="num" defaultValue={this.props.pokemonId.num}/>
                <p>Height</p>
                <input name="height" defaultValue={this.props.pokemonId.height}/>
                <p>Weight</p>
                <input name="weight" defaultValue={this.props.pokemonId.weight}/>
                <input type="submit"/>
            </form>

          </div>
        </body>
      </html>
    );
  }
}

module.exports = edit;