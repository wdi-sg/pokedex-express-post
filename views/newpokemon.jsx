const React = require('react');

class PokemonNew extends React.Component {
    render() {
        return (<form action="/pokemon" method="POST">
            ID<input type="text" name="ID"/><br/>
            Number<input type="text" name="number"/><br/>
            Name<input type="text" name="name"/><br/>
            Image<input type="text" name="Image"/><br/>
            Height<input type="text" name="Height"/><br/>
            Weight<input type="text" name="Weight"/><br/>
            <input type="submit"/>
        </form>);
    }
};

module.exports = PokemonNew;
