var React = require('react');

class PokemonDetails extends React.Component {

    
  render() {
    
    const pokeList = this.props.pokemonList.map(poke => {
     return (<div key={poke.id}style={{display: 'inline-block', width: '380px', border: '2px solid blue', backgroundColor: 'rgb(194, 236, 245)'}}>
                <h1 style={{width: '380px', textAlign: 'center', lineHeight: '16px', marginBottom: '5px', fontSize: '24px'}}>{poke.name}</h1>
                <div>
                    <div style={{display:'inline-block', width:'120px'}} >
                        <img src={poke.img} alt={poke.name} style={{width: '120px', height: '120px'}} />
                    </div>
                    <div style={{display:'inline-block', marginLeft: '20px', width:'200px'}}>
                        <p>Candy : {poke.candy}</p>
                        <p>Height : {poke.height}</p>
                        <p>Weight : {poke.weight}</p>
                    </div>
                </div>
        </div>)
    });

    return (
        <div>
        {pokeList}
        </div> 
    )
  }
}

module.exports = PokemonDetails