const React = require('react');
const pokedex = require('../pokedex')

class Weight extends React.Component {
		render() {
            // Create Sort Function By Weight
            const sortingFunctionByWeight = (a, b) => {
                let weightSplit = {
                    a: a.weight.split(" "),
                    b: b.weight.split(" ")
                }
              if (weightSplit.a[0] < weightSplit.b[0]) {
                return -1;
              }
              if (weightSplit.a[0] > weightSplit.b[0]) {
                return +1;
              }
              return 0;
            };
			// Sort the Array By Weight
			const pokedexWeightSort = pokedex.pokemon.sort(sortingFunctionByWeight);
			// Map the sorted array into a list of names
			const pokeList = pokedexWeightSort.map(pokemon => {
				return (
                    <li>Name : {pokemon.name} | Weight : {pokemon.weight}</li>
        )
			})
        return (
            <div>
            <h1>Welcome to the Online Pokedex</h1>
						<ul>{pokeList}</ul>
        </div>);
    }
}

module.exports = Weight;
