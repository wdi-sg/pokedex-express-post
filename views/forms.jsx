
var React = require('react');
class Forms extends React.Component {
  render() {
    return (
      <html>
        <body>
          <div>
            <form method="POST" action="/pokemon">
              id:
              <input type="text" name="id"></input>
              num:
              <input type="text" name="num"></input>
              name:
              <input type="text" name="name"></input>
              img:
              <input type="text" name="img"></input>
              height:
              <input type="text" name="height"></input>
              weight:
              <input type="text" name="weight"></input>
              <input type="submit" value="Submit"></input>
            </form>
          </div>
        </body>
      </html>
    );
  }
}

module.exports = Forms;
