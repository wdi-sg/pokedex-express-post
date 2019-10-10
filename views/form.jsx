var React = require('react');

class Form extends React.Component {
  render() {
    return (
      <html>
        <body>
          <div>
            <h1>Pokemon Data</h1>
            <h1>HELLO I AM COLLABORATING</h1>
            <form method="POST" action="/pokemon">
            ID: <input type="text" name="id"/><br />
            Num: <input type="text" name="num"/><br />
            Name: <input type="text" name="name"/><br />
            Img: <input type="text" name="img"/><br />
            Height: <input type="text" name="height"/><br />
            Weight: <input type="text" name="weight"/><br />
            <input type="submit" value="Submit"/>
            </form>
          </div>
        </body>
      </html>
    );
  }
}

module.exports = Form;