const React = require('react');

class Home extends React.Component {
    render(){
        var x = parseInt(this.props.pokemonObj.num) - 1
        return(
            <html>
                <body>
                    <div>
                        <h1>Selected Pokemon: {this.props.pokemonObj.name}</h1>
                        <img src={"http://www.serebii.net/pokemongo/pokemon/"+this.props.pokemonObj.num+".png"}/>
                        <br/>
                        Name: {this.props.pokemonObj.name}
                        <br/>
                        Num: {this.props.pokemonObj.num}
                        <br/>
                        Height: {this.props.pokemonObj.height}
                        <br/>
                        Weight: {this.props.pokemonObj.weight}
                        <br/>
                        <form action={'/pokemon/'+x+'/edit'} method="GET">
                            <input type="submit"/>
                        </form>
                    </div>
                </body>
            </html>
        );
    }
}

module.exports = Home;