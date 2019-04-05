var React = require('react');
var Layout = require('./layout.jsx')

class Mon extends React.Component {

    render() {


    const pokemon = this.props;
    //console.log(pokemon);

    var valueAttribute = `/pokemon/${pokemon.id}?_method=PUT`
    var name = `${pokemon.name}`

        return (
            <Layout>
               Pokémon info goes here
            </Layout>
        );
    }
}



module.exports = Mon;