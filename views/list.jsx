var React = require('react');

class List extends React.Component {
    render() {
        const list = this.props.pokedex;

        const pokemonElement = list.map( pokemon => {
            let hrefStr = '/pokemon/'+pokemon.id;
            return (
                <div>
                    <a href={hrefStr}>#{pokemon.num}{pokemon.name}</a><p></p>
                </div>
                )
        })

        return (
            <html>
                <head>
                    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossOrigin="anonymous"/>
                </head>
                <body>
                    <div className="container">
                        <h1>Pokemon List</h1>
                        <div>
                        {pokemonElement}
                        </div>
                    </div>
                </body>
            </html>
        );
    }
}

module.exports = List;