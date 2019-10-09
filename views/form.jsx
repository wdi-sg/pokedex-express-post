var React = require('react');

class Form extends React.Component {
    render() {
        return (
            <html>
        <body>
          <div>
            <h1>Enter the details of your new pokemon.</h1>
                <form method="POST" action="/pokemon">
              New Pokemon:<br/>
              ID : <input type="number" name="id" required/><br/>
              No. : <input type="number" name="num" required/><br/>
              Name : <input type="text" name="name" required/><br/>
              Image URL : <input type="text" name="img" required/><br/>
              Height : <input type="number" name="height" required/><br/>
              Weight : <input type="number" name="weight" /><br/>
              <input type="submit" value="Submit"/>
            </form>
          </div>
        </body>
      </html>
        );
    }
}

module.exports = Form;