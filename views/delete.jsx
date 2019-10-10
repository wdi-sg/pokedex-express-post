var React = require('react');
class Delete extends React.Component {
  render() {
    return (
      <html>
        <body>
          <div>
            <form action = {"/pokemon/"+this.props.id+"?_method=delete"} method = "POST">
                <h1>Delete Pokemon Information</h1>
                <br />
                <input type="submit"  />
            </form>
          </div>
        </body>
      </html>
    );
  }
}

module.exports = Delete;