var React = require('react');
class NewPokemon extends React.Component {
render() {

    const pokemon = this.props.pokemon.map( pokemon => {
        return <li>{pokemon}</li>
      });

return (
    
<html>
<body>
    <ul>
        {pokemon}
    </ul>
</body>
</html>
);
}
}

module.exports = NewPokemon;