var React = require('react');

class Form extends React.Component {
  render() {
    return (
      <html>
        <body>
          <div>
            <h1>The Pokeform</h1>
            <form method="POST" action="/pokemon">
              ID: <input type="text" name="id"></input>
              <br></br>
              num: <input type="text" name="num"></input>
              <br></br>
              name: <input type="text" name="name"></input>
              <br></br>
              img: <input type="text" name="img"></input>
              <br></br>
              height: <input type="text" name="height"></input>
              <br></br>
              weight: <input type="text" name="weight"></input>
              <br></br>
              <input type="submit" value="Submit"></input>
            </form>
          </div>
          <p>{this.props.message}</p>
        </body>
      </html>
    );
  }
}

module.exports = Form;