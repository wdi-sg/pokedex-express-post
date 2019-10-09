var React = require('react');

class Editform extends React.Component {
  render() {
    return (
      <html>
        <body>
          <div>
            <h1>Edit your pokemon</h1>
            <form method="POST" action="/pokemon/new/added">
              Pokemon info:<br/>
              <input type="text" name="id" placeholder="id"/><br/>
              <input type="number" name="num" placeholder="num"/><br/>
              <input type="text" name="name" placeholder="name"/><br/>
              <input type="url" name="img" placeholder="img"/><br/>
              <input type="text" name="height" placeholder="height"/><br/>
              <input type="text" name="weight" placeholder="weight"/><br/>
              <input type="submit" value="Submit"/>
            </form>
          </div>
        </body>
      </html>
    );
  }
}

module.exports = Editform;