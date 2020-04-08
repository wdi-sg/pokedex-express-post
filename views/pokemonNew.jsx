var React = require('react');
class Home extends React.Component {
  render() {

    return (>

      <html        <body>
          <div>
          <h1> Pokemon Info </h1>
            <form method="POST" action="/pokemon/id">
              Pokemon id:
              <input type="text" name="id"/><br/>
              Pokemon num:
              <input type="text" name="num"/><br/>
              Pokemon name:
              <input type="text" name="name"/><br/>
              Pokemon img:
              <input type="text" name="img"/><br/>
              Pokemon height:
              <input type="text" name="height"/><br/>
              Pokemon weight:
              <input type="text" name="weight"/><br/>
              <input type="submit" value="Submit"/>
            </form>
          </div>
        </body>
      </html>
    );
  }
}

module.exports = Home;