const React = require('react');

class PokemonNew extends React.Component {
    render() {
        return (<form action="/pokemon" method="POST">
            ID<input type="text" name="ID" defaultValue={this.props.pokemon.id}/>{this.props.idFailure.id}<br/>
            Number<input type="text" name="Number" defaultValue={this.props.pokemon.num}/>{this.props.idFailure.num}<br/>
            Name<input type="text" name="name" defaultValue={this.props.pokemon.name}/>{this.props.idFailure.name}<br/>
            Image<input type="text" name="Image" defaultValue={this.props.pokemon.img}/>{this.props.idFailure.img}<br/>
            Height<input type="text" name="Height" defaultValue={this.props.pokemon.height}/>{this.props.idFailure.height}<br/>
            Weight<input type="text" name="Weight" defaultValue={this.props.pokemon.weight}/>{this.props.idFailure.weight}<br/>
            <input type="submit"/>
        </form>);
    }
};

module.exports = PokemonNew;
