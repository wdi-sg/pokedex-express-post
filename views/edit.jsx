var React = require('react');

class EditPokemon extends React.Component {

    render() {
        const chosenPokemon = this.props.searchPoke;

        return (
            <html>
            <link rel="stylesheet" type="text/css" href="/style.css"/>
            <body>
            <img src={chosenPokemon.img}></img><br/>
            <h2>{chosenPokemon.name}</h2>
            <p>Height: {chosenPokemon.height}</p><br/>
            <p>Weight: {chosenPokemon.weight}</p><br/>
            <p>Candy: {chosenPokemon.candy}</p><br/>
            <p>Candy Count: {chosenPokemon["candy_count"]}</p><br/><br/>
            
            
            <h3>Edit {chosenPokemon.name}'s Information Below</h3><br/>
                <form method="POST" action={"/pokemon/" + this.props.searchPoke.id + "?_method=PUT"}>
                    <input name="id" value={chosenPokemon.id} style={{display: 'none'}}/>
                    <input name="height" placeholder="Height"/><br/>
                    <input name="weight" placeholder="Weight"/><br/>
                    <input name="candy" placeholder="Candy"/><br/>
                    <input name="candy_count" placeholder="Candy Count"/><br/>
                    <input type="submit"/>
                </form>
            </body>
            </html>

        );
    }
}

module.exports = EditPokemon;
