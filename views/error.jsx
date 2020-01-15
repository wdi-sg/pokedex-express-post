var React = require('react');

class Home extends React.Component {
  render() {
    return (
      <html>
        <body>
          <div>
            <h1>Hello</h1>
            <h2>Trainer, you will have to fill in all the inputs before Submitting</h2>
            <form method="POST" action="/pokemon">
               <input type="number" placeholder="Pokemon Id" name="id"/>
                <input type="text" placeholder="Pokemon num" name="num"/>
                <input type="text" placeholder="Pokemon name" name="name"/>
                <input type="text" placeholder="Pokemon img" name="img"/>
                <input type="text" placeholder="Height" name="height"/>
                <input type="text" placeholder="Weight" name="weight"/>
                <input type="submit" value="Submit"/>
            </form>
          </div>
        </body>
      </html>
    );
  }
}

module.exports = Home;