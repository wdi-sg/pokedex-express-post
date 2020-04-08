var React = require('react');
class Form extends React.Component {
  render() {
    return (
      <html>
      <body>
      <div>
      <form method="POST" action="/pokemon/new">
      <h1>Search Pokemon:</h1>
      <input type="text" name="id" placeholder="Id"/>
      <input type="number" name="num" placeholder="Num"/>
      <input type="text" name="name" placeholder="Name"/>
      <input type="text" name="img" placeholder="Img"/>
      <input type="number" name="height" placeholder="Height"/>
      <input type="number" name="weight" placeholder="Weight"/>
      <input type="submit" value="Submit"/>
      </form>
      </div>
      </body>
      </html>
      );
}
}

module.exports = Form;