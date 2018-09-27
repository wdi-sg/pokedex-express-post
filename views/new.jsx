var React = require('react');

class Home extends React.Component {
  render() {

    return (
      <html>
        <header>
          <title>Add a New Pokemon</title>
        </header>
        <body>
          <h1>Add a New Pokemon!</h1>
          <form method="POST" action="/pokemon">
            Name: <input type="text" name="name" /><br/>
            Image: <input type="text" name="img" /><br/>
            Height: <input type="text" name="height" /><br/>
            Weight: <input type="text" name="weight" /><br/>
            <input type="submit" value="Submit" /><br/>
          </form>
        </body>
      </html>
    )
  }
}

module.exports = Home;
