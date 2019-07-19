var React = require('react');
var MainNavBar = require ('./components/mainNavbar');


class Pokemon extends React.Component {
  render() {

    const pokemon = this.props.pokemon;

    return (
      <html>
        <body style={{textAlign:'center', backgroundColor:'black'}}>
        <MainNavBar />
        <h1 style={{color: 'white'}}>Pokemon Details</h1>
          <div style={{color:'white'}}>
            <a href={`/pokemon/existing/${pokemon.id}`}><img src={pokemon.img} /></a>
            <p>{pokemon.num}. {pokemon.name}</p>
            <p>Height: {pokemon.height}</p>
            <p>Weight: {pokemon.weight}</p>
            <p>Candy: {pokemon.Candy}</p>
            <p>Egg: {pokemon.egg}</p>
            <p>Average Spawn: {pokemon.avg_spawns}</p>
            <p>Spawn Time: {pokemon.spawn_time}</p>
          </div>

          <form method={'GET'} action={`/pokemon/existing/${pokemon.id}/edit`} style={{display: 'inline-block', marginRight: '20px', color: 'white'}}>
             <br /><input type="submit" value='Edit Pokemon' />
          </form>
          <form method={'GET'} action={`/pokemon/existing/${pokemon.id}/delete`} style={{display: 'inline-block', color: 'white'}}>
             <br /><input type="submit" value='Delete Pokemon' />
          </form>
        </body>
      </html>)
  }
}

module.exports = Pokemon;