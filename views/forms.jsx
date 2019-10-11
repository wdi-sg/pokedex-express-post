var React = require('react');

class Home extends React.Component {
  render() {
    return (
      <html>
        <body>
          <div>
            <h1>WOA FORM Hello</h1>
            <button>hello</button>
            <h3>pokemon</h3>
            <form action="/pokemon" method="POST">
                <input type="number" name="id"/><br/>
                <input type="number" name="num"/><br/>
                <input type="text" name="name"/><br/>
                <input type="text" name="img"/><br/>
                <input type="text" name="height"/><br/>
                <input type="text" name="weight"/><br/>
                <input type="submit"/>
            </form>
          </div>
        </body>
      </html>
    );
  }
}

module.exports = Home;