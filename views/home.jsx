var React = require('react');

class Home extends React.Component {
  render(){



    return (<h1>{this.props.pokeman.name}<div className="col">{this.props.pokeman.id}</div></h1>);
  }
}

module.exports = Home;