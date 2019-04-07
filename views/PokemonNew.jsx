var React = require('react');

class PokemonDetails extends React.Component {

  render() {

    return (
   
        <form method="POST" action={"/pokemon"}>
        <div class="pokemon-attribute">
            id: <input name="name" type="text" placeholder="Please Enter the Pokemon Name"/>
            name: <input name="name" type="text" value={this.props.pokemonItem.name}/>
        </div>
    </form>
  
    )
  }

}

module.exports = PokemonDetails;
