var React = require('react');

class Home extends React.Component {
  render() {
    return (
      <html>
        <body>
          <div>
            <h1>Welcome to Kelly Lim's Pokedex</h1>
            <h2>Pokemon Name</h2>
             <form action="/pokemon" method="POST">
                <h4>Name:</h4>
                <input type="text" name="name" required/><br/>
                <h4>Height:</h4>
                <input type="text" name="height" required/><br/>
                <h4>Weight:</h4>
                <input type="text" name="weight" required/><br/>
                <h4>ID:</h4>
                <input type="number" name="id" required/><br/>
                <h4>Num:</h4>
                <input type="number" name="num" required/><br/>
                <h4>Img:</h4>
                <input type="url" name="img" required/><br/><br/>
                <input type="submit"/>
            </form>
          </div>
        </body>
      </html>
    );
  }
}

module.exports = Home;