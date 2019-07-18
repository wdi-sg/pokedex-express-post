var React = require('react');

class Individual extends React.Component{
    render(){
        var url = "/pokemon/"+this.props.pokemonId;
        return(
            <html>
                <body>
                    <div>
                        <h1>

                        </h1>
                        <p>Pokemon: {this.props.pokemon.name}</p>
                        <form method="POST" action={url}>
                        <button type="submits">delete data</button>
                        </form>
                    </div>
                </body>
            </html>
        );
    };
};

module.exports = Individual;