const React = require('react');
class List extends React.Component {
    render() {

        let pokemonIndex = this.props.pokemon;

        let allNames = pokemonIndex.map(index => {
            return (<li><a href={index.id}>{index.name}</a></li>);
        })

        let createPokemon = <a href='/pokemon/new'>here</a>;
        let allPokemonPhotos = <a href='/pokemon/photos/'>here</a>;
        let allPokemonTypes = <a href='/pokemon/types'>here</a>;

        return (
            <html>
                <body>
                    <h1>Index</h1>
                    <h2>New Pokemon</h2>
                    <p>Found a new species? Click {createPokemon} to update the Pokedex!</p>
                    <h2>List of Pokemon Images</h2>
                    <p>View all Pokemon {allPokemonPhotos}</p>
                    <h2>List of Pokemon Types</h2>
                    <p>View all Pokemon {allPokemonTypes}</p>
                    <h2>List of all Pokemon</h2>
                    <ol>{allNames}</ol>
                </body>
            </html>
        );
    }
}

module.exports = List;