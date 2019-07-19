var React = require('react');
var MainNavBar = require ('./components/mainNavbar');

class PokemonEdit extends React.Component {
  render() {

    const pokemon = this.props.pokemon;

    return (
      <html>
        <body style={{textAlign:'center', backgroundColor:'black'}}>
        <MainNavBar />
        <div style={{display:'flex', flexWrap:'wrap', width:'40%', margin:'0 auto'}}>
          <div style={{display: 'inline-block', color:'white', width:'50%', textAlign:'center'}}>    
              <h2 style={{color: 'white'}}>Pokemon Details</h2>
              <a href={`/pokemon/existing/${pokemon.id}`}><img src={pokemon.img} /></a>
              <p>{pokemon.num}. {pokemon.name}</p>
              <p>Height: {pokemon.height}</p>
              <p>Weight: {pokemon.weight}</p>
              <p>Candy: {pokemon.Candy}</p>
              <p>Egg: {pokemon.egg}</p>
              <p>Average Spawn: {pokemon.avg_spawns}</p>
              <p>Spawn Time: {pokemon.spawn_time}</p>
            </div>
          <div style={{display: 'inline-block', color:'white', width:'50%', textAlign:'center'}}>
            <h2 style={{color: 'white'}}>Edit Pokemon Details</h2>
            <form method={'POST'} action={`/pokemon/existing/${pokemon.id}/edit?_method=put`} style={{color: 'white', width:'50%', margin:'0 auto', textAlign:'center'}}>
              <br /><br />Name: <input type={'text'} name={'name'} placeholder={'Name'} value={pokemon.name} />
              <br /><br />Height: <input type={'number'} name={'height'} placeholder={'Height'} value={parseFloat(pokemon.height)}  step={0.01}/>
              <br /><br />Weight: <input type={'number'} name={'weight'} placeholder={'Weight'} value={parseFloat(pokemon.weight)}  step={0.01} />
              <br /><br />Image Url: <input type={'text'} name={'img'} placeholder={'Image'} value={pokemon.img} />
              <br /><br />Egg: <input type={'text'} name={'egg'} placeholder={'Egg'} value={pokemon.egg}  />
              <br /><br />Average Spawn: <input type={'number'} name={'avg_spawns'} placeholder={'Average Spawns'} value={parseFloat(pokemon.avg_spawns)} />
              <br /><br />Spawn Time: <input type={'text'} name={'spawn_time'} placeholder={'Spawn Time'} value={pokemon.spawn_time} />
              <br /><br /><input type={'submit'} value={'Submit Edit'} />
            </form>
          </div>
        </div>
        </body>
      </html>
    );
  }
}

module.exports = PokemonEdit;