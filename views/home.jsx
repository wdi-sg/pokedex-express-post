var React = require('react');

class Home extends React.Component {
  render() {



  const pokemons = this.props.pokemon.map( pokemon => {
  return <li>
            {pokemon.name}&nbsp;&nbsp;
            <a href={`/pokemon/${pokemon.id}`}>View</a>&nbsp;&nbsp;
            <a href={`/pokemon/${ pokemon.id }/edit`}>edit</a> &nbsp;&nbsp;
            <a href={`/pokemon/${ pokemon.id }/delete`}>delete</a>
        </li>
  })

    return (
        <body>
        <h1>Welcome to Pokedex!</h1><br/>
        <form>
             <select name="sortby">
            <option value="id">id</option>
            <option value="name">name</option>
            </select>
            <input type="submit" value="Sort"/>
        </form>
         <br/>
            <a href={"/pokemon/new"}>Create new pokemon</a>
         <br/>
            <ul>
                {pokemons}
            </ul>
        </body>
    );
  }
}

module.exports = Home;