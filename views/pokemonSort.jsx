var React = require('react');


class ListItem extends React.Component {

    render() {
        return (
          <div className = "box">
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
        <html>
        <head>
            <link rel="stylesheet" href="/style.css"/>
        </head>
            <body>
            <div className = "containerOfBox">
            {itemsElements}
            </div>
            </body>
        </html>
        );
    }
}

module.exports = List;




