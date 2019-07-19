var React = require('react');
var MainNavBar = require ('./components/mainNavbar');

class Main extends React.Component {
  render() {

    const pokemons = this.props.pokemonByType.map(pokemon => {
        return(<div style={{display: 'inline-block', color:'white'}}>
          <a href={`/pokemon/existing/${pokemon.id}`}><img src={pokemon.img} /></a>
          <p>{pokemon.num}. {pokemon.name}</p>
          </div>);
    });

    return (
      <html>
        <body style={{textAlign:'center', backgroundColor:'black'}}>
        <MainNavBar /><br /><br />
        <nav style={{textAlign:'center', styleDecoration:'underline', color: 'gold', fontSize: '20px'}}>
          <a href={'/pokemon/type/Bug'} style={{color:'gold'}}>Bugs</a>
          <span> | </span>
          <a href={'/pokemon/type/Dragon'} style={{color:'gold'}}>Dragon</a>
          <span> | </span>
          <a href={'/pokemon/type/Electric'} style={{color:'gold'}}>Electric</a>
          <span> | </span>
          <a href={'/pokemon/type/Fighting'} style={{color:'gold'}}>Fighting</a>
          <span> | </span>
          <a href={'/pokemon/type/Fire'} style={{color:'gold'}}>Fire</a>
          <span> | </span>
          <a href={'/pokemon/type/Flying'} style={{color:'gold'}}>Flying</a>
          <span> | </span>
          <a href={'/pokemon/type/Ghost'} style={{color:'gold'}}>Ghost</a>
          <span> | </span>
          <a href={'/pokemon/type/Grass'} style={{color:'gold'}}>Grass</a>
          <span> | </span>
          <a href={'/pokemon/type/Ground'} style={{color:'gold'}}>Ground</a>
          <span> | </span>
          <a href={'/pokemon/type/Ice'} style={{color:'gold'}}>Ice</a>
          <span> | </span>
          <a href={'/pokemon/type/Normal'} style={{color:'gold'}}>Normal</a>
          <span> | </span>
          <a href={'/pokemon/type/Poison'} style={{color:'gold'}}>Poison</a>
          <span> | </span>
          <a href={'/pokemon/type/Psychic'} style={{color:'gold'}}>Psychic</a>
          <span> | </span>
          <a href={'/pokemon/type/Rock'} style={{color:'gold'}}>Rock</a>
          <span> | </span>
          <a href={'/pokemon/type/Water'} style={{color:'gold'}}>Water</a>
        </nav><br /><br />
        <h1 style={{color: 'white'}}>List of Pokemon</h1><br />
        {pokemons}
        </body>
      </html>
    );
  }
}

module.exports = Main;