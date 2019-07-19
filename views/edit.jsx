var React = require('react');

class Edit extends React.Component {
  render() {
    var url = "/pokemon/"+this.props.pokemon.id + "?_method=PUT";
    return (
      <html>
        <body>
          <div>
            <h1>Edit {this.props.pokemon.name}</h1>
            <img src={this.props.pokemon.img}/>
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
                <p>AnimalPage</p>
                <input name="img" value={this.props.pokemon.img}/>
                <br/><br/>
                <input type="submit"/>
                <br/>
            </form>
          </div>
        </body>
      </html>
    );
  }
}

module.exports = Edit;
