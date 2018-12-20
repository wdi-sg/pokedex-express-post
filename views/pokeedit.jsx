var React = require('react');

class Pokeedit extends React.Component{
    render(){
        return(
            <div>
            <h3>Feel free to edit existing pokemon details</h3>
                <form method="POST" action={"/pokemon/" + this.props.input + "?_method=PUT"}>
                    name: <input name="name" type="text" value={this.props.pokemon[0].name} /> <br />
                    img: <input name="img" type="text" value={this.props.pokemon[0].img} /> <br />
                    height: <input name="height" type="text" value={this.props.pokemon[0].height}/> <br />
                    weight: <input name="weight" type="text" value={this.props.pokemon[0].weight} /> <br />
                    candy: <input name="candy" type="text" value={this.props.pokemon[0].candy}/> <br />
                    egg: <input name="egg" type="text" value={this.props.pokemon[0].egg} /> <br />
                    avg_spawns: <input name="avgspawns" type="text" value={this.props.pokemon[0].avg_spawns}/> <br />
                    spawn_time: <input name="spawntime" type="text" value={this.props.pokemon[0].spawn_time} /> <br />
                    type: <input name="type" type="text" value={this.props.pokemon[0].type}/> <br />
                    <span></span>
                    <input type="submit" value="Edit" />
                </form>
            </div>
            );
    }
}

module.exports = Pokeedit;