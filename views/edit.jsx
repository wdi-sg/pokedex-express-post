var React = require('react');


class List extends React.Component {

    render() {

        return (
          <li>{this.props.item}</li>
          );

    }
}



class editPokemon extends React.Component {

  render() {
        // let fieldElements = this.props.map(item => {
        //                       return <li>{item}</li>
        //                     });

    return (
        <html>
        <head>
            <link rel="stylesheet" type="text/css" href="/style.css"/>
            <link href="https://fonts.googleapis.com/css?family=Exo+2" rel="stylesheet"/>
        </head>
        <body>
            <form action="/pokemon/pokemon.id?_method=PUT" method="POST" >
                <div className="pokemon-attribute">
                    <img src={this.props.img} className="pokeImage"/>
                        <ul id="inputList">
                            <li>id: <input name="id" type="text" value={this.props.id}/></li>
                            <li>num: <input name="num" type="text" value={this.props.num}/></li>
                            <li>name: <input name="name" type="text" value={this.props.name}/></li>
                            <li>img: <input name="img" type="text" value={this.props.img}/></li>
                            <li>height: <input name="height" type="text" value={this.props.height}/></li>
                            <li>weight: <input name="weight" type="text" value={this.props.weight}/></li>
                            <input type="submit"/>
                        </ul>
                </div>
            </form>
        </body>
        </html>
    );
  }
}

module.exports = editPokemon;