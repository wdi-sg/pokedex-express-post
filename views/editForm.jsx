var React = require('react');

class editForm extends React.Component {
  render() {
    return (
      <html>
        <body>
          <div>
            <h1>Edit a Pokemon!</h1>
            <form method="POST" action={"/pokemon/"+this.props.pokemonData.id+'?_method=PUT'}>
                <p>Pokemon id:</p>
                <input name="id" defaultValue={this.props.pokemonData.id}/>
                <p>Pokemon number:</p>
                <input name="num" defaultValue={this.props.pokemonData.num}/>
                <p>Pokemon name:</p>
                <input name="name"  defaultValue={this.props.pokemonData.name}/>
                <p>Pokemon height:</p>
                <input name="height"  defaultValue={this.props.pokemonData.height}/>
                <p>Pokemon weight:</p>
                <input name="weight"  defaultValue={this.props.pokemonData.weight}/>
                <p></p>
                <input type="submit"/>
            </form>
          </div>
        </body>
      </html>
    );
  }
}

module.exports = editForm;