var React = require('react');

class Sortweight extends React.Component {
  render() {
    var compare = function(a, b){
        a = a.weight
        b = b.weight
        a = a.replace('kg','');
        b = b.replace('kg','');
        console.log(a);
        if (a < b){
            return -1;
        }
        if (a > b){
            return +1;
        }
        return 0;
    }

    let sortedWeight = this.props.pokemon.sort(compare);
    //console.log(sortedWeight)
    const pokemonSortWeight = sortedWeight.map ( obj => {
        var idURL= 'pokemon/' + obj.id
        return <li><a href={idURL}>{obj.name}</a></li>
    })

    return (
      <div>
        <form action='/'>
          <select name='sortby'>
            <option value=''>Sort by</option>
            <option value='name'>Name</option>
            <option value='id'>Id Number</option>
            <option value='weight'>Weight</option>
            <option value='height'>Height</option>
          </select>
          <input type='submit' value='Submit'/>
        </form>
        <ul>
        {pokemonSortWeight}
        </ul>
      </div>
    );
  }
}

module.exports = Sortweight;