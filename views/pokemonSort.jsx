var React = require('react');


class ListItem extends React.Component {

    render() {
        return (
          <div>
          <p> {this.props.pokemon.name} # {this.props.pokemon.num} </p>
          <img src={this.props.pokemon.img}/>
          <p> weight: {this.props.pokemon.weight} </p>
          <p> height: {this.props.pokemon.height} </p>
          </div>
        );
    }
}

class List extends React.Component {

    render() {
        function createDiv(item, index) {
            return <ListItem pokemon={item}> </ListItem>;
        }

        let itemsElements = this.props.listOfPokemon.map(createDiv);

        return (
            <div>
            {itemsElements}
            </div>
        );
    }
}

module.exports = List;




