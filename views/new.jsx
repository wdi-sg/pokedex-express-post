var React = require('react');
class New extends React.Component {
  render() {
    return (
      <html>
        <body>
          <div>
            <form method="POST" action="/pokemon">
                <div>Pokemon Id:</div><input type="text" name="id" required/>
                <div>Pokemon Number:</div><input type="text" name="num" required/>
                <div>Pokemon Name:</div><input type="text" name="name" required/>
                <div>Pokemon Image:</div><input type="text" name="img" required/>
                <div>Pokemon Height:</div><input type="text" name="height" required/>
                <div>Pokemon Weight:</div><input type="text" name="weight" required/>
                <div><input type="submit" value="Submit"/></div>
            </form>
          </div>
        </body>
      </html>
    );
  }
}

module.exports = New;