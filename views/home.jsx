var React = require('react');

class Home extends React.Component {
    render() {
        return (
            <html>
                <head>
                    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossOrigin="anonymous"/>
                </head>
                <body>
                    <div className="container">
                        <h1 className="pl-5">Welcome to the Pokedex</h1>
                        <div>
                            <label>Would you like to Browse the list of Pokemons?</label>
                            <a href="/pokemon/list">Pokemon List</a>
                        </div>
                        <div>
                            <label>Would you like to add a new Pokemon to your Pokedex?</label>
                            <a href="/pokemon/new">Add New Pokemon</a>
                        </div>
                        <div>
                            <label>Would you like to edit some existing Pokemon in the Pokedex?</label>
                            <a href="#">Edit Exisiting Entry</a>
                        </div>
                        <div>
                            <label>Woops, that isn't quite a pokemon. Would you like to remove that entry?</label>
                            <a href="#">Remove Entry From Pokedex</a>
                        </div>
                    </div>
                </body>
            </html>
        );
    }
}

module.exports = Home;