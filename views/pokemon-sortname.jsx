var React = require('react');

class Sortname extends React.Component {
  render() {
    var compare = function(a,b){
        if (a.name < b.name){
            return -1;
        }
        if (a.name > b.name){
            return +1;
        }
        return 0;
    }

    let sortedNames = this.props.pokemon.sort(compare);
    console.log(sortedNames)
    const pokemonSortName = sortedNames.map ( obj => {
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
        {pokemonSortName}
        </ul>
      </div>
    );
  }
}

module.exports = Sortname;