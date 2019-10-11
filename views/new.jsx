const React = require('react');

class New extends React.Component {
  render() {
    return (
      <html>
        <body>
          <div>
          <form method="POST" action="/pokemon">
            Pokemon details:<br/><br/>
            id: <input type="text" name="id"/><br/><br/>
            num: <input type="text" name="num"/><br/><br/>
            name: <input type="text" name="name"/><br/><br/>
            img: <input type="text" name="img"/><br/><br/>
            height: <input type="text" name="height"/><br/><br/>
            weight: <input type="text" name="weight"/><br/><br/>
            <input type="submit" value="Submit"/>
          </form>
          </div>
        </body>
      </html>
    );
  }
}

module.exports = New;