const React = require('react');
const ReactDom = require('react-dom')

class Create extends React.Component {
  render() {
    return (
      <html>
        <body>
          <div>
          <h1>Create</h1>
          <ul>
            <li>id: {this.props.body.id}</li>
            <li>num: {this.props.body.num}</li>
            <li>name: {this.props.body.name}</li>
            <li>img: {this.props.body.img}</li>
            <li>height: {this.props.body.height}</li>
            <li>weight: {this.props.body.weight}</li>
          </ul>
          </div>
        </body>
      </html>
    );
  }
}

module.exports = Create;