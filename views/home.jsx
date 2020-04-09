var React = require('react');
class Home extends React.Component {
  render() {
    return (
      <html>
        <body>
          <div>
            <form method="POST" action="/pokemon">
              <label for="id">id: </label>
              <input type="number" name="id"/><br/><br/>
              <label for="num">num: </label>
              <input type="number" name="num"/><br/><br/>
              <label for="name">name: </label>
              <input type="text" name="name"/><br/><br/>
              <label for="img">img: </label>
              <input type="text" name="img"/><br/><br/>
              <label for="height">height: </label>
              <input type="text" name="height"/><br/><br/>
              <label for="weight">weight: </label>
              <input type="text" name="weight"/><br/><br/>
              <input type="submit" value="Submit"/>
            </form>
          </div>
        </body>
      </html>
    );
  }
}

module.exports = Home;