var React = require('react');

class PokemonId extends React.Component {
  render() {

    //write a function that sort arrays of object by string property in Javascript
    var compareId = function(a,b){
        if (a.id < b.id){
            return -1;
        }
        if (a.id > b.id){
            return +1;
        }
        return 0;
    }

    //this.props = obj
    let sortedId = this.props.pokemon.sort(compareId);
    let pokemonSortId = sortedId.map( pokemon =>{
      return <li>{pokemon.name}</li>
    })

    //console.log(this.props.pokemon);
    return (
      <div>
        <h1>List of pokemon sorted by names!</h1>
        <ul>{pokemonSortId}</ul>
      </div>
    );
  }
}

module.exports = PokemonId;