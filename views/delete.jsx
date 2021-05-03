var React = require('react');
class Home extends React.Component {
  render() {
    var index = "/pokemon/" + this.props.index + "/delete?_method=delete"
    return (
      <html>
        <body>
            <div>
            <form method="POST" action={index}>
                <h1>Time to delete some pokemon</h1>
                <p> {this.props.name}</p>
                <input type="submit" value="submit"/>
                </form>
            </div>
        </body>
      </html>
    );
  }
}

module.exports = Home;