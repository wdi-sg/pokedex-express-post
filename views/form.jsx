var React = require('react');
class Form extends React.Component {
  render() {
    return (
      <html>
        <body>
          <div>
            <form method="POST" action="/pokemon">
            <p>ID:</p>
            <input type="text" name="id"/>
            <p>Num:</p>
            <input type="text" name="num"/>
            <p>Name:</p>
            <input type="text" name="name"/>
            <p>Img:</p>
            <input type="text" name="img"/>
            <p>Height:</p>
            <input type="text" name="height"/>
            <p>Weight:</p>
            <input type="text" name="weight"/>
            <div><input type="submit" value="Submit"/></div>
            </form>
          </div>
        </body>
      </html>
    );
  }
}

module.exports = Form;