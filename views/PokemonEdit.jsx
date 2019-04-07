var React = require('react');

class PokemonEdit extends React.Component {

    render() {
        return (
            <form method="POST" action={"/pokemon/"+ this.props.pokemonItem.id + "?_method=PUT"}>
                <div class="pokemon-attribute">
                    id: <input name="id" type="text" value={this.props.pokemonItem.id}/>
                    name: <input name="name" type="text" value={this.props.pokemonItem.name}/>
                </div>
            </form>
        )
    }

}

module.exports = PokemonEdit
