var React = require('react');

class Delete extends React.Component {
  render() {
    return (
      <html>
        <body>
          <div>
          <h1>Deleting {this.props.id} ?</h1>
          <form action={"/pokemon/" + this.props.id+'?_method=delete'} method="POST">
          <input type="submit" value="Submit"/>
          </form>
          </div>
          </body>
          </html>
    );
  }
}

module.exports = Delete;