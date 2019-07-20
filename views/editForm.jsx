var React = require('react');

class EditForm extends React.Component {
  render() {
    return (
      <html>
        <body>
          <div>
            <h1>Edit your pokemon: {this.props.pokemon.name}</h1>
          </div>
          <div>
          <form method="POST" action={"/pokemon/"+ this.props.pokemon.id + '?_method=PUT'}>

            <p>Pokemon Form:</p>
            <input type="text" name="id" placeholder="id" value={this.props.pokemon.id}/>
            <input type="text" name="num" placeholder="num" value={this.props.pokemon.num}/>
            <input type="text" name="name" placeholder="name" value={this.props.pokemon.name}/>
            <input type="text" name="img" placeholder="img" value={this.props.pokemon.img}/>
            <input type="text" name="height" placeholder="height"value={this.props.pokemon.height}/>
            <input type="text" name="weight" placeholder="weight"value={this.props.pokemon.weight}/>
            <input type="submit" value="Edit"/>

          </form>
          </div>
        </body>
      </html>
    );
  }
}

module.exports = EditForm;