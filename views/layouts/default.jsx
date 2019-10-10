var React = require('react');

class DefaultLayout extends React.Component {
  render() {
    return (
<html lang="en">
  <head><title>{this.props.title}</title>
        <link
  rel="stylesheet"
  href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
  integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
  crossorigin="anonymous"/>
  </head>
        <body id="page-top">
        <div className="container">
        <div className="rowrow mx-auto">
        <div className="col-8">
        {this.props.children}
        </div>
        </div>
        </div>
        </body>
        </html>
    );
  }
}

module.exports = DefaultLayout;