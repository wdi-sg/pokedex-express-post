var React = require("react");

class Form extends React.Component {
  render() {
    return (
      <html>
        <body>
          <div>
            <form method="POST" action="/pokemon">
              <h2>Add New Pokemon:</h2>
              <input type="text" name="id" placeholder="id (above 151)"/><br></br>
              <input type="text" name="num" placeholder="number (above 151)"/><br></br>
              <input type="text" name="name" placeholder="name"/><br></br>
              <input type="text" name="img" placeholder="image link"/><br></br>
              <input type="text" name="height" placeholder="height"/><br></br>
              <input type="text" name="weight" placeholder="weight"/><br></br>
              <input type="submit" value="Submit"/>
            </form>
            <p>
              {this.props.comments}
            </p>
          </div>
        </body>
      </html>
    );
  }
}

module.exports = Form;
