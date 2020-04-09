var React = require('react');

class Main extends React.Component {
  render() {

    return (
      <div>
        <p>POKEMON:{this.props.name}</p>
        <p>ID:{this.props.id}</p>
        <p>NUM:{this.props.num}</p>
        <p>NAME:{this.props.name}</p>
        <p>IMAGE:{this.props.img}</p>
        <p>HEIGHT:{this.props.height}</p>
        <p>WEIGHT:{this.props.weight}</p>

      </div>
    );
  }
}

module.exports = Main;