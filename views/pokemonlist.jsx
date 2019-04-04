var React = require('react');

class RowItem extends React.Component {
    render(){
        let pokemon = this.props.pokemon;
        let index = this.props.index;
        return (
            <tr key={index}>
                <td id="rowId" key={"id-"+index}>{pokemon.id}</td>
                <td id="rowName" key={pokemon.name}><a href={"/pokemon/"+pokemon.id}>{pokemon.name}</a></td>
                <td id="rowImg" key={"img-"+index}><img src={pokemon.img}/></td>
            </tr>
        )
    }
};

class PrintPokemon extends React.Component {
    render(){
        let pokemonArray = this.props.pokemonArray;
        // console.log(pokemonArray);
        let pokemonRow = pokemonArray.map( (pokemon, index) => {return <RowItem pokemon={pokemon} index={index}></RowItem>;
            })
        return (
          <tbody>
            {pokemonRow}
          </tbody>
        );
        }
};

// generates table of pokemon
class PokemonList extends React.Component {
    render() {
        let pokemonArray = this.props.pokemonArray;

        return (
            <div>
                <table>
                  <thead>
                    <tr>
                      <th id="tableId">ID</th>
                      <th id="tableName">Name</th>
                      <th id="tableImage">Image</th>
                    </tr>
                  </thead>
                  <PrintPokemon pokemonArray={pokemonArray}/>
               </table>
            </div>
        )
    }
};

module.exports = PokemonList;