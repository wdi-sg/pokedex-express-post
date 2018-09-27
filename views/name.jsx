const React = require("react");
const pokedex = require("../pokedex");

class Name extends React.Component {
  render() {
    // Create Sort Function By Name
    const sortingFunctionByName = (a, b) => {
      if (a.name < b.name) {
        return -1;
      }
      if (a.name > b.name) {
        return +1;
      }
      return 0;
    };
    // Sort the Array By Name
    const pokedexNameSort = pokedex.pokemon.sort(sortingFunctionByName);
    // Map the sorted array into a list of names
    const pokeList = pokedexNameSort.map(pokemon => {
      return <li>{pokemon.name}</li>;
    });
    return (
      <div>
        <h1>Welcome to the Online Pokedex</h1>
        <ul>{pokeList}</ul>
      </div>
    );
  }
}

module.exports = Name;
