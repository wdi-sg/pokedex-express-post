const React = require('react');

class addPokemon extends React.Component {
    render(){
        return(
            <html>
                <body>
                    <div>
                        <h1>Edit Pokemon: {this.props.pokemonObj.name}</h1>
                        <img src={"http://www.serebii.net/pokemongo/pokemon/"+this.props.pokemonObj.num+".png"}/>
                        <form action={"/pokemon/"+this.props.id+"?_method=put"} method="POST">
                            Name: <input type="text" name="name" value={this.props.pokemonObj.name}/>
                            <br/>
                            Num: <input type="text" name="num" value={this.props.pokemonObj.num}/>
                            <br/>
                            Height: <input type="text" name="height" value={this.props.pokemonObj.height}/>
                            <br/>
                            Weight: <input type="text" name="weight" value={this.props.pokemonObj.weight}/>
                            <br/>
                            <input type="submit"/>
                        </form>
                    </div>
                </body>
            </html>
        );
    }
}

module.exports = addPokemon;