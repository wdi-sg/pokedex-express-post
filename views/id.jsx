var React = require('react');

class Home extends React.Component {
  render() {

    let searchId = parseInt(this.props.search);
    let pokedex = this.props.pokedex;
    let pokemon;

    for (let i in pokedex) {
      if (pokedex[i].id === searchId) {
        pokemon = pokedex[i];
        break;
      }
    }

    if (pokemon) {

      let type;
      let typeBox = "";

      let types = ["Normal", "Flying", "Fire", "Water", "Ground", "Rock", "Ice", "Electric", "Bug", "Psychic", "Poison", "Fighting", "Dragon", "Grass", "Ghost"];

      let typeSelector = types.map( type => {
        return <option value={type}>{type}</option>
      })

      if (pokemon.type) {
        type = pokemon.type.map( type => {
          return <li>{type}</li>
        })

        typeBox = <li>Type:<ul>{type}</ul></li>;

      } else {
      }

      let postAction = "/" + pokemon.id;


      return (
        <html>
          <header>
            <title>{pokemon.id} {pokemon.name}</title>
          </header>
          <body>
            <h1>{pokemon.name}</h1>
            <img src={pokemon.img} />
            <ul>
              <li>ID: {pokemon.id}</li>
              <li>Height: {pokemon.height}</li>
              <li>Weight: {pokemon.weight}</li>
              {typeBox}
            </ul>
            <p>Edit Pokemon's Type:</p>
            <form method="POST" action={postAction}>
              <select name="typeOne">
                <option value = "" selected>Select type 1...</option>
                {typeSelector}
              </select>
              <select name="typeTwo">
                <option value = "" selected>Select type 2...</option>
                {typeSelector}
              </select>
              <input type="submit" value="Type" />
            </form>
          </body>
        </html>
      )

    } else {
      return (<p>Nothing found!</p>);
    }
  }
}

module.exports = Home;
