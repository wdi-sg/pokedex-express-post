var React = require('react');

class Home extends React.Component {
  render() {
    return (
      <html>
        <body>
          <div>
            <h1>Pokedex</h1>
            <button>Pokemon</button>
            <a href="http://google.com">click me</a>
            <h3>Pokemon Name</h3>
             <form action="/pokemon" method="POST">
                <input type="text" name="name"/><br/>
                <input type="text" name="height"/><br/>
                <input type="text" name="weight"/><br/>
                <input type="number" name="id"/><br/>
                <input type="number" name="num"/><br/>
                 <input type="text" name="img"/><br/>
                <input type="submit"/>
            </form>
          </div>
        </body>
      </html>
    );
  }
}

module.exports = Home;