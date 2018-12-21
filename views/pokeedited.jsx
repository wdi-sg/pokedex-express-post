var React = require('react');

class Pokeedited extends React.Component{
    render(){
        return(
            <div>
                <h3>Successfully edited. Take a look at the new details of the pokemon </h3>
                <h5>ID: {this.props.id}</h5>
                <h5>Name: {this.props.name}</h5>
                <h5>IMG: {this.props.img}</h5>
                <h5>height: {this.props.height}</h5>
                <h5>Weight: {this.props.weight}</h5>
                <h5>Candy: {this.props.candy}</h5>
                <h5>Egg: {this.props.egg}</h5>
                <h5>Average spawn: {this.props.avg_spawns}</h5>
                <h5>Spawn time: {this.props.spawn_time}</h5>
                <h5>Type: {this.props.type}</h5>
            </div>
            );
    }
}

module.exports = Pokeedited;