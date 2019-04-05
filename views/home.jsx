var React = require('react');
var Layout = require('./layout')

class Home extends React.Component {

    render () {

        const pokemonArray = this.props.pokemon; // return the pokemon name array


        let allPokemon = pokemonArray.map(obj => {
            //console.log(obj.img)
            return <div class="image-container">
                <img src={obj.img} />
                <h5 class="card-title">{obj.name}</h5>
            </div>
        });


        return (<Layout>
            <h1>Welcome to the online Pokedex!</h1>
            <div class="displayImg-container">
                {allPokemon}
            </div>

        </Layout>);  // end of return

    }  // end of render
} // end of class home


module.exports = Home;