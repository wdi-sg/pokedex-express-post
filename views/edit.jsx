var React = require('react');

class Home extends React.Component {
  render() {

    let id = parseInt(this.props.id);
    let pokedex = this.props.pokedex;
    let pokemon;

    for (let i in pokedex) {
      if (pokedex[i].id === id) {
        pokemon = pokedex[i];
        break;
      }
    }

    let postAction = "/" + pokemon.id + "?_method=PUT";

    return (
      <html>
        <header>
          <title>Edit {pokemon.name}</title>
        </header>
        <body>
          <h1>Edit {pokemon.name}:</h1>
          <img src={pokemon.img} />
          <form method="POST" action={postAction}>
            //readOnly is jsx version of html readonly, value can't be changed
            ID: <input type="text" name="id" value={pokemon.id} readOnly/><br/>
            Name: <input type="text" name="name" value={pokemon.name} /><br/>
            Image: <input type="text" name="img" value={pokemon.img} /><br/>
            Height: <input type="text" name="height" value={pokemon.height} /><br/>
            Weight: <input type="text" name="weight" value={pokemon.weight} /><br/>
            <input type="submit" value="Submit" /><br/>
          </form>
        </body>
      </html>
    )
  }
}

module.exports = Home;
