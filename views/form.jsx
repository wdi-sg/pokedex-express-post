var React = require('react');

class Home extends React.Component {
  render() {
    return (
      <html>
        <body>
          <div>
          <h1>GOTTA CATCH THEM ALL! DIGIMON!</h1>
          <form action="/pokemon" method="POST">
          <p>ID:</p><input type="number" name="id"/><br/>
          <p>Num:</p><input type="number" name="num"/><br/>
          <p>Name:</p><input type="text" name="name"/><br/>
          <p>Image:</p><input type="text" name="img"/><br/>
          <p>Height:</p><input type="text" name="height"/><br/>
          <p>Weight</p><input type="text" name="weight"/><br/>
          <input type="submit" value="Submit"/>
          </form>
          </div>
          </body>
          </html>
    );
  }
}

module.exports = Home;