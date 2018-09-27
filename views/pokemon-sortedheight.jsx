var React = require('react');

class PokemonName extends React.Component {
  render() {

    //write a function that sort arrays of object by string property in Javascript
    var compareHeight = function(a,b){
      if (a.height < b.height){
          return -1;
      }
      if (a.height > b.height){
          return +1;
      }
      return 0;
    }

    //this.props = obj
    let sortedHeight = this.props.pokemon.sort(compareHeight);
    let pokemonSortHeight = sortedHeight.map( pokemon =>{
      return <li>{pokemon.name}</li>
    })

    //console.log(this.props.pokemon);
    return (
      <div>
        <h1>List of pokemon sorted by height!</h1>
        <ul>{pokemonSortHeight}</ul>
      </div>
    );
  }
}

module.exports = PokemonName;