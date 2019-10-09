var React = require('react');

class Newform extends React.Component {
  render() {
    return (
      <html>
        <body>
          <div>
            <h1>Hello pokelovers</h1>
            <form method="POST" action="/pokemon/new/added">
              Pokemon info:<br/>
              <input type="text" name="id" placeholder="id"/><br/>
              <input type="number" name="num" placeholder="num"/><br/>
              <input type="text" name="name" placeholder="name"/><br/>
              <input type="url" name="img" placeholder="img"/><br/>
              <input type="number" name="height" placeholder="height"/><br/>
              <input type="number" name="weight" placeholder="weight"/><br/>
              <input type="submit" value="Submit"/>
            </form>
          </div>
        </body>
      </html>
    );
  }
}

module.exports = Newform;