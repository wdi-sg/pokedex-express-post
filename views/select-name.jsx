const React = require('react');

class Select extends React.Component {
  render() {

    const pokemans = this.props.pokemon.map((pokemans) => {
      return <option>{pokemans.name}</option>
    });

    return (
      <div>
        <form action="/:id" method="post">
          <select name="" id="">
            {pokemans}
          </select>
        </form>
      </div>
    );
  }
}

module.exports = Select;
