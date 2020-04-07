var React = require('react');

class Home extends React.Component {
  render() {
    return (
      <html>
        <body>
          <div>
            <h1>Hello, Good evening! You are welcomed to add a new pokemon to the new pokedex.</h1>
          </div>
          <div>
          <form method="POST" action="/pokemon">
                <input type="text" name="id" placeholder="id"></input>
                <br></br>
                <input type="text" name="num" placeholder="num"></input>
                <br></br>
                <input type="text" name="name" placeholder="name"></input>
                <br></br>
                <input type="text" name="img" placeholder="img"></input>
                <br></br>
                <input type="text" name="height" placeholder="height"></input>
                <br></br>
                <input type="text" name="weight" placeholder="weight"></input>
                <br></br>
                <button type="submit">Create!</button>
          </form>
          </div>
        </body>
      </html>
    );
  }
}

module.exports = Home;