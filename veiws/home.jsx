const React = require('react');

class Home extends React.Component {

    render() {
     console.log(this.props);
    // console.log("Ends there")
    const pokemonName = this.props.name;

    console.log(pokemonName);
    const pokemonId = this.props.id;
    return (
    '<form method="POST" action="/pokemon/'+pokemonId+'?_method=PUT">'+
     '<div class="pokemon-attribute">'+
     'id: <input name="id" type="text" value="'+pokemonId+'"/>'+
     'name: <input name="name" type="text" value="'+pokemonName+'"/>'+
    '</div>'+
    '</form>'

    );
  }
}
module.export = Home;