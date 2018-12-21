var React = require('react');

class Pokedetail extends React.Component{
    render(){
        return(
            <div>
            <h3>Check out the full details of pokemon {this.props.pokemon[0].name}</h3>
                <img src={this.props.pokemon[0].img} />
                <h5>ID: {this.props.pokemon[0].id}</h5>
                <h5>Name: {this.props.pokemon[0].name}</h5>
                <h5>height: {this.props.pokemon[0].height}</h5>
                <h5>Weight: {this.props.pokemon[0].weight}</h5>
                <h5>Candy: {this.props.pokemon[0].candy}</h5>
                <h5>Egg: {this.props.pokemon[0].egg}</h5>
                <h5>Average spawn: {this.props.pokemon[0].avg_spawns}</h5>
                <h5>Spawn time: {this.props.pokemon[0].spawn_time}</h5>
                <h5>Type: {this.props.pokemon[0].type}</h5>
                <form method="GET" action={"/pokemon/"}>
                    <input type="submit" value="Home" />
                </form>
            </div>
            );
    }
}

module.exports = Pokedetail;