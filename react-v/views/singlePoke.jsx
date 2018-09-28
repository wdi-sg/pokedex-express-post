var React = require('react');

class singlePoke extends React.Component {
  render() {
    console.log("THIS PROPS:", this.props )
    let link = parseInt(this.props.id) + 1;
    let editLink = this.props.id + "/edit";
    return (
      <div>
        <h1>
            {this.props.name}
        </h1>
        <p><img src={this.props.img}/></p>
        <li>{this.props.id}</li>
        <li>{this.props.name}</li>
        <li>{this.props.height}</li>
        <li>{this.props.weight}</li>
        <a href={editLink}>EDIT</a>
        <p><a href={link}>Next Pokemon</a></p>
      </div>
    );

  }
}

module.exports = singlePoke;

