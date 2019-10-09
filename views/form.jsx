var React = require('react');

class Home extends React.Component {
  render() {
    return (
      <html>
        <body>
          <div>
            <h1>Pokemon</h1>
            <h3>pokemon</h3>
            <form action="/pokemon" method="POST">
                ID:<input type="number" name="id"/><br/>
                Number:<input type="number" name="num"/><br/>
                Name: <input type="text" name="name"/><br/>
                Img:<input type="text" name="img"/><br/>
                Height: <input type="text" name="height"/><br/>
                Weight:<input type="text" name="weight"/><br/>
                <input type="submit"/>
            </form>
          </div>
        </body>
      </html>
    );
  }
}

module.exports = Home;