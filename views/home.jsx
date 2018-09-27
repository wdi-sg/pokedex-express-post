var React = require('react');

class Home extends React.Component {

  render() {

    const pokemons = this.props.pokemon.map( obj => {
      var name = obj.name
      var idURL= 'pokemon/' + obj.id
      return <li><a href={idURL}>{name}</a></li>
    });

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
        {pokemons}
        </ul>
      </div>
    );
  }
}

module.exports = Home;