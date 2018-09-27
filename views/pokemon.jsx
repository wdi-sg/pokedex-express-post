var React = require('react');

class Pokemon extends React.Component {
    render() {
        let pokemonSelected = this.props.object;
        let actionPath = "/pokemon/" + pokemonSelected.id + "?_method=PUT"
        console.log("------------------------------")
        return (
            <div>
                <div>Pokemon Attributes: </div>
                    <form method="POST" action={actionPath}>
                    <img src={pokemonSelected.img}></img>
                    <span style={{ marginRight: 2 + 'em' }}> Number: </span> <input name="number" value={pokemonSelected.num}/>
                    <div></div>
                    <span style={{ marginRight: 2.9 + 'em' }}> Name: </span><input name="name" value={pokemonSelected.name}/>
                    <div></div>
                    <span style={{ marginRight: 3.4 + 'em' }}> Image </span><input name="image" value={pokemonSelected.img}/>
                    <div></div>
                    <span style={{ marginRight: 2.57 + 'em' }}> Height: </span><input name="height" value={pokemonSelected.height}/>
                    <div></div>
                    <span style={{ marginRight: 2.46 + 'em' }}> Weight: </span><input name="weight" value={pokemonSelected.weight}/>
                    <div></div>
                    <input type="submit" value="Submit"></input>
                </form>
            </div>

        );
    }
}

module.exports = Pokemon;