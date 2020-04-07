var React = require('react');
class New extends React.Component {
  render() {
    return (
      <html>
        <body>
          <div>
            <form method="POST" action="/pokemon">
            ID:
            <input type="text" name="id"></input>
            Num:
            <input type="text" name="num"></input>
            Name:
            <input type="text" name="name"></input>
            Img:
            <input type="text" name="img"></input>
            Height:
            <input type="text" name="height"></input>
            Weight:
            <input type="text" name="weight"></input>
            <input type="submit" value="submit"></input>
            </form>
          </div>
          {this.props.error}
        </body>
      </html>
    );
  }
}

module.exports = New;