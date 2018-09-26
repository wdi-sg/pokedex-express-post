const React = require('react');

class Select extends React.Component {
  render() {

    const pokemans = this.props.pokemon.map((pokemans) => {
      return <li key={pokemans.id}>{pokemans.name}</li>
    });

    return (
      <div>
        <ol>
          {pokemans}
        </ol>
      </div >
    );
  }
}

module.exports = Select;
