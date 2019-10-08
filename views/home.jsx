var React = require('react');
class Home extends React.Component {
  render() {
    return (
      <html>
        <body>
          <div>
            <h1>Product ID: { this.props.productId }!</h1>
            <h2>Title: { this.props.title }</h2>
            <h2>Description: { this.props.description }</h2>
          </div>
        </body>
      </html>
    );
  }
}

module.exports = Home;