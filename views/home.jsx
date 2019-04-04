var React = require('react');

var PokemonList = require('./pokemonlist');

// NewPokeButton redirects to /pokemon/new
class NewPokeButton extends React.Component {
    render() {
        return (
            <div>
                <form method="get" action="/pokemon/new">
                Want to create a custom pokemon?&nbsp;&nbsp;
                <input type="submit" value="Create new Pokemon"/>
                </form>
            </div>
        )
    }
};

// redirects to /pokemon/id/edit - not functional yet
class EditPokeButton extends React.Component {
    render() {
        return (
            <div>
                <form method="get" action={"/pokemon/edit"}>
                <p>Want to edit a pokemon?</p>
                <input type="number" min="1" name="id"/>
                <input type="submit" value="Edit Pokemon"/>
                </form>
            </div>
        )
    }
};

// checks how user wants list of pokemon sorted
class SelectSort extends React.Component {
    render() {
        return (
            <div>
                <form method="get" action="/">
                    <span>Sort pokemon by:&nbsp;</span>
                    <select name="sortby">
                        <option value="name">Name</option>
                        <option value="id">ID</option>
                    </select>
                    &nbsp;
                    <input type="submit" value="Submit"/>
                </form>
            </div>
        )
    }
};


class home extends React.Component {
    render() {
        let pokemonArray = this.props.pokemonArray;
        return (
            // console.log(pokemonArray),
<html>
<head>
    <title>Pokedex</title>
    <link rel="stylesheet" type="text/css" href="/home.css"></link>
</head>

<body>
    <div className="pageWrapper">
        <h1>Welcome to the online Pokedex!</h1>
        <NewPokeButton/>
        <br/>
        <SelectSort/>
        <div className="displayContainer">
            <PokemonList pokemonArray={pokemonArray}/>
        </div>
    </div>
</body>
</html>
        );
    }
}

module.exports = home;