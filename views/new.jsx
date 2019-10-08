var React = require('react');
class New extends React.Component {
  render() {
    return (
      <html>
        <body>
          <div>
            <form method="POST" action="/pokemon">
                <div>Pokemon Id:</div><input type="text" name="id"/>
                <div>Pokemon Number:</div><input type="text" name="num"/>
                <div>Pokemon Name:</div><input type="text" name="name"/>
                <div>Pokemon Image:</div><input type="text" name="img"/>
                <div>Pokemon Height:</div><input type="text" name="height"/>
                <div>Pokemon Weight:</div><input type="text" name="weight"/>
                <div><input type="submit" value="Submit"/></div>
            </form>
          </div>
        </body>
      </html>
    );
  }
}

module.exports = New;