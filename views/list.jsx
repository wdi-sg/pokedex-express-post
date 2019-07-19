var React = require('react');

class List extends React.Component {
  render() {

    let pokemonList = this.props.pokemonList.map(pokemon => {
        //here, pokemonList is a NAME from the parent (green text)
        return(
            <li><a href={"pokemon/page/"+pokemon.id}>{pokemon.name}</a></li>
        );
    });

    return (
      <ul>
        {pokemonList}
      </ul>
    );
  }
}
module.exports = List;
//call
// for non-array:
// <li>{this.props.pokemon}</li>,
// <List pokemon={this.props.id}></List>