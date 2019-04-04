var React = require('react');

class Home extends React.Component {

  render() {

    let putAction = `/pokemon/${this.props.id}?_method=PUT`;

    return (
        <body>
            <h1>Edit Pokémon Details</h1>
                <form method="POST" action={putAction}>
                ID: <span>{this.props.id}</span><br/>
                NUMBER: <input name="num" type="text" value={this.props.num}/><br/>
                NAME: <input name="name" type="text" value={this.props.name}/><br/>
                IMAGE: <input name="img" type="text" value={this.props.img}/><br/>
                HEIGHT: <input name="height" type="text" value={this.props.height}/><br/>
                WEIGHT: <input name="weight" type="text" value={this.props.weight}/><br/>
                CANDY: <input name="candy" type="text" value={this.props.candy}/><br/>
                CANDY COUNT: <input name="candy_count" type="text" value={this.props.candy_count}/><br/>
                EGG: <input name="egg" type="text" value={this.props.egg}/><br/>
                AVERAGE SPAWNS: <input name="ave_spawns" type="text" value={this.props.avg_spawns}/><br/>
                SPAWN TIME: <input name="spawn_time" type="text" value={this.props.spawn_time}/><br/>
                <input type="submit" value="Submit"/>
            </form>
        </body>
    );
  }
}

module.exports = Home;