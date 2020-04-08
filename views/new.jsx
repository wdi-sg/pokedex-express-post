var React = require('react');
class New extends React.Component {
  render() {
    return (
      <html>
        <body>
          <div>
            <form method="POST" action="/pokemon">
              <div>
                ID:
                <input type="text" name="id"></input>
              </div>
              <div>
                Num:
                <input type="text" name="num"></input>
              </div>
              <div>
                Name:
                <input type="text" name="name"></input>
              </div>
              <div>
                Img:
                <input type="text" name="img"></input>
              </div>
              <div>
                Height:
                <input type="text" name="height"></input>
              </div>
              <div>
                Weight:
                <input type="text" name="weight"></input>
              </div>
              <div>
                <input type="submit" value="submit"></input>
              </div>
            </form>
          </div>
          {this.props.error}
        </body>
      </html>
    );
  }
}

module.exports = New;