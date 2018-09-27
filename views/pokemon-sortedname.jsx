var React = require('react');

class PokemonName extends React.Component {
  render() {

    //write a function that sort arrays of object by string property in Javascript
    var compareName = function(a,b){
        if (a.name < b.name){
            return -1;
        }
        if (a.name > b.name){
            return +1;
        }
        return 0;
    }

    //this.props = obj
    let sortedName = this.props.pokemon.sort(compareName);
    let nameList = '';
    let pokemonSortName = sortedName.map( pokemon =>{
      return <li>{pokemon.name}</li>
    })

    //console.log(this.props.pokemon);
    return (
      <div>
        <h1>List of pokemon sorted by names!</h1>
        <ul>{pokemonSortName}</ul>
      </div>
    );
  }
}

module.exports = PokemonName;