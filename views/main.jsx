var React = require('react');
var MainNavBar = require ('./components/mainNavbar');

class Main extends React.Component {
  render() {

    const pokemons = this.props.pokedex.map(pokemon => {
        return(<div style={{display: 'inline-block', color:'white'}}>
          <a href={`/pokemon/existing/${pokemon.id}`}><img src={pokemon.img} /></a>
          <p>{pokemon.num}. {pokemon.name}</p>
          <p>{pokemon.height}</p>
          <p>{pokemon.weight}</p>
          </div>);
    });

    return (
      <html>
        <body style={{textAlign:'center', backgroundColor:'black'}}>
        <MainNavBar />
        <div style = {{textAlign:'right'}}>
            <span style={{color: 'white', display:'inline-block'}}>Sort By: </span>
            <form method={'GET'} action={'/pokemon'} style={{color: 'white', display:'inline-block' , margin:'0 20px'}}>
              <select name={"sortby"} style = {{margin:'0 20px 0 0'}}>
                <option value={"id"}>ID</option>
                <option value={"name"}>Name</option>
                <option value={"height"}>Height</option>
                <option value={"weight"}>Weight</option>
              </select>
              <input type="submit" />
            </form>
        </div>
        <h1 style={{color: 'white'}}>List of Pokemon by {this.props.query}</h1>
        {pokemons}
        </body>
      </html>
    );
  }
}

module.exports = Main;