var React = require('react');

class Home extends React.Component {
  render() {
    return (
      <html>
        <body>
            <h1>New Pokemon:</h1>
            <form method="POST" action="/pokemon">
                <input type="text" name="id" placeholder="id" /><br/>
                <input type="text" name="num" placeholder="num"/><br/>
                <input type="text" name="name" placeholder="name"/><br/>
                <input type="text" name="img" placeholder="img"/><br/>
                <input type="text" name="height" placeholder="height"/><br/>
                <input type="text" name="weight" placeholder="weight"/><br/>
                <input type="submit" value="Submit"/><br/>
            </form>
        </body>
      </html>
    );
  }
}

module.exports = Home;
