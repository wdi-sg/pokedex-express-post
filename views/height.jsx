const React = require('react');
const pokedex = require('../pokedex')

class Height extends React.Component {
		render() {
            // Create Sort Function By Height
            const sortingFunctionByHeight = (a, b) => {
              if (a.height < b.height) {
                return -1;
              }
              if (a.height > b.height) {
                return +1;
              }
              return 0;
            };
			// Sort the Array By Height
			const pokedexHeightSort = pokedex.pokemon.sort(sortingFunctionByHeight);
			// Map the sorted array into a list of names
			const pokeList = pokedexHeightSort.map(pokemon => {
				return (
                    <li>Name : {pokemon.name} | Height : {pokemon.height}</li>
        )
			})
        return (
            <div>
            <h1>Welcome to the Online Pokedex</h1>
						<ul>{pokeList}</ul>
        </div>);
    }
}

module.exports = Height;
