var React = require('react');

class Delete extends React.Component{
    render(){
        var url = "/pokemon/"+this.props.pokemonId+"?_method=PUT";
        return(
            <html>
                <body>
                    <div>
                        <h1>Delete entry</h1>
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

module.exports = Delete;