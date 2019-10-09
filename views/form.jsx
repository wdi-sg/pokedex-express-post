var React = require('react');

class Form extends React.Component {
    render() {
        return (
            <html>
        <body>
          <div>
            <h1>Hello. Enter the details of your new pokemon.</h1>
                <form method="POST" action="/pokemon">
              New Pokemon:<br/>
              ID : <input type="number" name="id"/><br/>
              No. : <input type="number" name="num"/><br/>
              Name : <input type="text" name="name"/><br/>
              Image URL : <input type="text" name="img"/><br/>
              Height: <input type="number" name="height"/><br/>
              Weight: <input type="number" name="weight"/><br/>
              <input type="submit" value="Submit"/>
              <p>Error: {this.props.err}</p>
            </form>
          </div>
        </body>
      </html>
        );
    }
}

module.exports = Form;