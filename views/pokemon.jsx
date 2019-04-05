var React = require('react');

class Home extends React.Component {
  render() {
    return (
      <div>
        <h1>Hello </h1>
        <h1>id is {this.props.id}</h1>
        <h1>num is {this.props.num}</h1>
        <h1>name is {this.props.name}</h1>
        <h1>img is {this.props.img}</h1>
        <h1>height is {this.props.height}</h1>
        <h1>weight is {this.props.weight}</h1>
        <h1>candy is {this.props.candy}</h1>
        <h1>candy_count is {this.props.candy_count}</h1>
        <h1>egg is {this.props.egg}</h1>
        <h1>avg_spawns is {this.props.avg_spawns}</h1>
        <h1>spawn_time is {this.props.spawn_time}</h1>

      </div>
    );
  }
}

module.exports = Home;