var React = require('react');

class Pokemon extends React.Component {
    render() {
        let pokemonSelected = this.props.object;

        // anything within "" is a string, for JSX variable.key cannot be indicated inside, so you have to define outside of return where the code reader understands javascript
        //double quote not applicable for variable
        // within { } in jsx, you can access a value from an object, e.g. {variable.name}
        let actionPath = "/pokemon/" + pokemonSelected.id + "?_method=PUT"
        console.log("------------------------------");

        return (
            <div>
                Pokemon Attributes:
                <form method = "POST" action = {actionPath}>
                    <div></div>
                    <img src={pokemonSelected.img}></img>
                    <div></div>
                    <span style = {{ marginRight: 1.95 + 'em' }}> Number: </span> <input name="number" value={pokemonSelected.num}/>
                        <div> </div>
                    <span style = {{ marginRight: 2.85 + 'em' }}> Name: </span><input name="name" value={pokemonSelected.name}/>
                        <div> </div>
                    <span style = {{ marginRight: 3.0 + 'em' }}> Image </span><input name="image" value={pokemonSelected.img}/>
                        <div> </div>
                    <span style = {{ marginRight: 2.5 + 'em' }}> Height: </span><input name="height" value={pokemonSelected.height}/>
                        <div> </div>
                    <span style = {{ marginRight: 2.36 + 'em' }}> Weight: </span><input name="weight" value={pokemonSelected.weight}/>
                        <div></div>
                    <input type = "submit" value = "Submit"></input>
                </form>
            </div>

        );
    }
}

module.exports = Pokemon;