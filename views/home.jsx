var React = require('react');

class Home extends React.Component {
  render() {
    return (
      <html>
        <body>
          <div>
            <h1>Hello pokelovers</h1>
            <form method="POST" action="/pokemon">
              Pokemon info:
              <input type="text" name="id"/>
              <input type="text" name="num"/>
              <input type="text" name="name"/>
              <input type="text" name="img"/>
              <input type="text" name="height"/>
              <input type="text" name="weight"/>
              <input type="submit" value="Submit"/>
            </form>
          </div>
        </body>
      </html>
    );
  }
}

module.exports = Home;