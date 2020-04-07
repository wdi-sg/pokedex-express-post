var React = require('react');

class page extends React.Component {
  render() {
    return (
      <html>
        <body>
          <div>
            <form method="POST" action="/pokemon">
                Enter the following details for your new pokemon:
                <div>ID: <input type="text" name="id"/></div>
                <div>Number: <input type="text" name="num"/></div>
                <div>Name: <input type="text" name="name"/></div>
                <div>Image: <input type="text" name="img"/></div>
                <div>Height: <input type="text" name="height"/></div>
                <div>Weight: <input type="text" name="weight"/></div>
                <div><input type="submit" value="Submit"/></div>
            </form>
          </div>
        </body>
      </html>
    );
  }
}

module.exports = page;