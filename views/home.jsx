
var React = require('react');

class Home extends React.Component {
  render() {
    return (
      <html>
        <body>
          <div>
          <form method="POST" action="/pokemon">
            <p>Id:   </p><input type="number" name="id" min="1"/><br/>
            <p>Num:   </p><input type="number" min="1" name="num"/><br/>
            <p>Name:  </p><input type="text" name="name"/><br/>
            <p>Img:   </p><input type="text" name="img"/><br/>
            <p>Height:</p><input type="text" name="height"/><br/>
            <p>Weight:</p><input type="text" name="weight"/><br/>
            <input type="submit" value="Submit"/>
          </form>
          </div>
        </body>
      </html>
    );
  }
}

module.exports = Home;