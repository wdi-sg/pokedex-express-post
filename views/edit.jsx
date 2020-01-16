var React = require('react');

class edit extends React.Component {
  render() {
    return (
      <html>
        <body>
            <form action="/pokemon?_method=put" method="POST">
            ID: <input name="id"/><br/>
            Num: <input name="num"/><br/>
            Name: <input name="name"/><br/>
            Img: <input name="img"/><br/>
            Height: <input name="height"/><br/>
            Weight: <input name="weight"/><br/>
            <input type="submit" value="Submit"/>
            </form>
        </body>
      </html>
    );
  }
}

module.exports = edit;