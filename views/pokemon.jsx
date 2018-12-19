var React = require('react');

class Pokemon extends React.Component {
  render() {

    return (
      <div>
        <img src={this.props.img}/>
        <ul>
            <li>{"Number: #" + this.props.num}</li>
            <li>{"Name: " + this.props.name}</li>
            <li>{"Height: " + this.props.height}</li>
            <li>{"Weight: " + this.props.weight}</li>
            <li>{"Type: " + this.props.type}</li>
        </ul>
      </div>
    );
  }
}

module.exports = Pokemon;