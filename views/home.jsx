var React = require('react');
class Home extends React.Component {
  render() {
    return (
      <html>
        <body>
          <div>

           <h1> POKEMON</h1>

            <form method="POST" action="/pokemon">
              ID:
              <input type="text" name="id" />
              Number:
              <input type="text" name="num" />
              Name:
              <input type="text" name="name" />
              Image:
              <input type="text" name="img" />
              Height:
              <input type="text" name="height" />
              Weight:
              <input type="text" name="weight" />
              <input type="submit" value="Submit" />

             </form>


          </div>
        </body>
      </html>
    );
  }
}

module.exports = Home;