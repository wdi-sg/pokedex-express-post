var React = require('react');

class Home extends React.Component {
  render() {
    return (
      <html>
        <body>
          <div>
            <h1>Hello</h1>
            <form method="POST" action="/pokemon">
            <p>
               <input type="number" placeholder="Pokemon Id" name="id"/>
               {var}
            </p>
            <p>
                <input type="text" placeholder="Pokemon num" name="num"/>
            </p>
            <p>
                <input type="text" placeholder="Pokemon name" name="name"/>
            </p>
            <p>
                <input type="text" placeholder="Pokemon img" name="img"/>
            </p>
            <p>
                <input type="text" placeholder="Height" name="height"/>
            </p>
            <p>
                <input type="text" placeholder="Weight" name="weight"/>
            </p>
                <input type="submit" value="Submit"/>
            </form>
          </div>
        </body>
      </html>
    );
  }
}

module.exports = Home;