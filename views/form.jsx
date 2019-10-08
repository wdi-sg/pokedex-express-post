var React = require('react');

class Form extends React.Component {
    render() {
        return (
            <html>
        <body>
          <div>
            <h1>Hello. Enter the details of your new pokemon.</h1>
                <form method="POST" action="/pokemon">
              New Pokemon:
              <input type="number" name="id"/>
              <input type="number" name="num"/>
              <input type="text" name="name"/>
              <input type="text" name="img"/>
              <input type="number" name="height"/>
              <input type="number" name="weight"/>
              <input type="submit" value="Submit"/>
            </form>



          </div>
        </body>
      </html>
        );
    }
}

module.exports = Form;