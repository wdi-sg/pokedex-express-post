
var React = require('react');

class Form extends React.Component {
  render() {
    return (
      <html>
        <body>
          <div>
            <h1>Add a Pokemon!</h1>
            <form method="POST" action="/newPokemon">
                <p>Pokemon id:</p>
                <input name="id"/>
                <p>Pokemon number:</p>
                <input name="number"/>
                <p>Pokemon name:</p>
                <input name="name"/>
                <p>Pokemon height:</p>
                <input name="height"/>
                <p>Pokemon weight:</p>
                <input name="weight"/>
                <p></p>
                <input type="submit"/>
            </form>
          </div>
        </body>
      </html>
    );
  }
}

module.exports = Form;