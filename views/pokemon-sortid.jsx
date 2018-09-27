var React = require('react');

class Sortid extends React.Component {
  render() {
    var compare = function(a, b){
        if (a.id < b.id){
            return -1;
        }
        if (a.id > b.id){
            return +1;
        }
        return 0;
    }

    let sortedId = this.props.pokemon.sort(compare);
    console.log(sortedId)
    const pokemonSortId = sortedId.map ( obj => {
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
        {pokemonSortId}
        </ul>
      </div>
    );
  }
}

module.exports = Sortid;