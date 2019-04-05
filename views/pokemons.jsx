var React = require("react");


class ListItem extends React.Component {

    render() {
        return (
          <li>{this.props.pokemon}</li>
        );
    }
}



class Pokemons extends React.Component {

    render() {
        // const pokeArray = this.props.pokemon;
        let pokeList = this.props.pokemon.map((pokemon, index) => {
            return <ListItem item={pokemon}></ListItem>;
        });

    return (
        <ul>
            {pokeList}
        </ul>
    );
    }
}

module.exports = Pokemons;