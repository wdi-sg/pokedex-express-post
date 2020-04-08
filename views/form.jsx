var React = require('react');

class Form extends React.Component {
  render() {
    return (
      <html>
        <head><link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous"></link></head>

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