var React = require('react');

class Edit extends React.Component {
  render() {
    var url = "/pokemon/"+this.props.pokemon.id + "?_method=PUT";
    return (
      <html>
        <body>
          <div>
            <h1>Edit Pokemon</h1>
            <p>pokemon: {this.props.pokemon.name}</p>
            <form action={url} method="POST">
                <p>name</p>
                <input name="name" value={this.props.pokemon.name}/>
                <p>id</p>
                <input name="id" value={this.props.pokemon.id}/>
                <p>number</p>
                <input name="num" value={this.props.pokemon.num}/>
                <p>height</p>
                <input name="height" value={this.props.pokemon.height}/>
                <p>weight</p>
                <input name="weight" value={this.props.pokemon.weight}/>
                <p>image</p>
                <input name="image" value={this.props.pokemon.img}/>
                <br/>
                <input type="submit"/>
            </form>
          </div>
        </body>
      </html>
    );
  }
}

module.exports = Edit;
