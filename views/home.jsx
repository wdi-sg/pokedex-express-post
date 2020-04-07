var React = require('react');
class Home extends React.Component {
  render() {
    return (
      <html>
        <body>
          <div>
            <h1><u>Pokemon Entry</u></h1>
            <form method="POST" action="/pokemon">
              <p>id:</p>
              <input type="number" name="id"/>
              <p>num:</p>
              <input type="number" name="num"/>
              <p>name:</p>
              <input type="text" name="name"/>
              <p>image link:</p>
              <input type="text" name="img"/>
              <p>height:</p>
              <input type="text" name="height"/>
              <p>weight:</p>
              <input type="text" name="weight"/>
              <br/><br/>
              <input type="submit" value="Submit"/>
            </form>
          </div>
        </body>
      </html>
    );
  }
}

module.exports = Home;