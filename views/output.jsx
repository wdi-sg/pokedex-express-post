var React = require('react');
var DefaultLayout = require('./layouts/default');

class Output extends React.Component {
  render() {
    return (
          
          <DefaultLayout title="Display Pokemon">
          <div>
            <h2>ID: { this.props.id }</h2>
            <h2>Pokemon Name: { this.props.name }</h2>
            <h2>Height: { this.props.height } | weight: { this.props.weight }</h2>
            <img src={ this.props.img }/>
          </div>
          </DefaultLayout>

    );
  }
}

module.exports = Output;