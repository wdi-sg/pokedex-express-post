var React = require("react");

class updateForm extends React.Component {

    render() {

        let pokemon = this.props.pokemon;
        let formlink = "/pokemon?_method=PUT";
        let backlink = "/pokemon/"+pokemon.id;

        return (
             updateInfo =
                         <html>
                            <form method="POST" action="/pokemon?_method=PUT">
                            <h1>UPDATE NEW POKEMON</h1>
                            <p>ID:</p>
                            <p><input name="id" value={pokemon.id}/></p>
                            <p>NUM:</p>
                            <p><input name="id" value={pokemon.num}/></p>
                            <p>POKEMON NAME:</p>
                            <p><input name ="name" value={pokemon.name}/></p>
                            <p>POKEMON IMAGE:</p>
                            <p><input name ="image" value={pokemon.img}/></p>
                            <p>HEIGHT:</p>
                            <p><input name ="height" value={pokemon.height}/></p>
                            <p>WEIGHT:</p>
                            <p><input name ="weight" value={pokemon.weight}/></p>
                            <p>CANDY:</p>
                            <p><input name ="type" value={pokemon.candy}/></p>
                            <p>CANDY COUNT:</p>
                            <p><input name ="type" value={pokemon.candy_count}/></p>
                            <p>EGG:</p>
                            <p><input name ="egg" value={pokemon.egg}/></p>
                            <p>AVERAGE SPAWNS:</p>
                            <p><input name ="spawns" value={pokemon.avg_spawns}/></p>
                            <p><input type="submit" value="Submit"/></p>
                            </form>;
                        </html>
)}

        module.exoprts = updateForm;