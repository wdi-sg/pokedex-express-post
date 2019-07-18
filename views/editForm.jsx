var React = require('react');

class EditForm extends React.Component {
  render() {
    return (
      <html>
        <body>
          <div>
            <h1>Create an animal!</h1>
            <form method="POST" action={"/pokemon/"+this.props.index+'?_method=PUT'}>
                <p>Pokemon name</p>
                <input name="name" type="text" value={this.props.pokemonData.name}/>
                <p>Pokemon image</p>
                <input name="img" type="text" value={this.props.pokemonData.img}/>
                <p>Pokemon height</p>
                <input name="height" type="number" step="0.01" min="0" value={this.props.pokemonData.height}/>
                <p>Pokemon weight</p>
                <input name="weight" type="number" step="0.01" min="0" value={this.props.pokemonData.weight}/>
                <p>--</p>
                <input type="submit" value="edit this"/>
            </form>
          </div>
        </body>
      </html>
    );
  }
}

module.exports = EditForm;