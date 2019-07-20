var React = require('react');

class CreateForm extends React.Component {
  render() {
    return (
      <html>
        <body>
          <div>
            <h1>Hello this works</h1>
          </div>
          <div>

          <form method="POST" action="/pokemon">

            <p>Pokemon Name:</p>
            <input type="text" name="id" placeholder="id"/>
            <input type="text" name="num" placeholder="num"/>
            <input type="text" name="name" placeholder="name"/>
            <input type="text" name="img" placeholder="img"/>
            <input type="text" name="height" placeholder="height"/>
            <input type="text" name="weight" placeholder="weight"/>
            <input type="submit" value="Submit"/>


          </form>
          </div>
        </body>
      </html>
    );
  }
}

module.exports = CreateForm;