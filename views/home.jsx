var React = require('react');

class Home extends React.Component {
  render() {
    var pokeId = this.props.id;
    return (
      <div>
        <h1>Hello {this.props.name} </h1>
        <form method="POST" action="/pokemon/:id">
            <input type="text" name="id" value={this.props.id}/> <br/>
            <input type="text" name="id" value={this.props.num}/> <br/>
            <input type="text" name="id" value={this.props.name}/> <br/>
            <input type="text" name="id" value={this.props.img}/> <br/>
            <input type="text" name="id" value={this.props.height}/> <br/>
            <input type="text" name="id" value={this.props.weight}/> <br/>
            <input type="text" name="id" value={this.props.candy}/> <br/>
            <input type="text" name="id" value={this.props.candy_count}/> <br/>
            <input type="text" name="id" value={this.props.egg}/> <br/>
            <input type="text" name="id" value={this.props.avg_spawns}/> <br/>
            <input type="text" name="id" value={this.props.spawn_time}/> <br/>
            <input type="submit" value="Submit"/>
        </form>
      </div>
    );
  }
}

module.exports = Home;