var React = require('react');

class home extends React.Component {

  render() {
    const people = this.props.data.map( person => {
      return <li>{pokemon.name}, {pokemon.weight}</li>
    });

    return (
      <div>
        <h1>List of everyone</h1>
        <ul>
        {people}
        </ul>
      </div>
    );
  }
}

module.exports = home;