const React = require('react');
class Form extends React.Component {
  render() {
    return (
      <html lang="en" dir="ltr">
        <body>
        <h1>Submit a Pokemon!</h1>
          <form method="POST" action="/pokemon">
            <input type="number" name="id" placeholder="id"/ >
            <input type="number" name="num" placeholder="num"/ >
            <input type="text" name="name" placeholder="name"/ >
            <input type="text" name="img" placeholder="img"/ >
            <input type="text" name="height" placeholder="height"/ >
            <input type="text" name="weight" placeholder="weight"/ >
            <input type="submit" value="Submit" />
          </form>
        </body>
      </html>
    );
  }
}

module.exports = Form;
