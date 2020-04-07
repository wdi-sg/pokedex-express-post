var React = require('react');

class Form extends React.Component {
  render() {
    return (
      <html>
        <body>
          <div>
              <form method="POST" action="/pokemon">
                <p>Pokemon id:</p>
                <input type="text" name="id"/>
                <br/>
                <p>Pokemon num:</p>
                <input type="text" name="num"/>
                <br/>
                <p>Pokemon name:</p>
                <input type="text" name="name"/>
                <br/>
                <p>Pokemon img:</p>
                <input type="text" name="img"/>
                <br/>
                <p>Pokemon height:</p>
                <input type="text" name="height"/>
                <br/>
                <p>Pokemon weight:</p>
                <input type="text" name="weight"/>
                <br/>
                <button type="submit" value="Submit">Submit</button>
              </form>
          </div>
        </body>
      </html>
    );
  }
}

module.exports = Form;