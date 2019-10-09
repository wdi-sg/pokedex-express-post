const React = require("react");

class Delete extends React.Component {
  render() {
    const {id, name} = this.props;
    return (
      <html>
        <body>
          <h1>Delete {name}?</h1>
          <div>
            <form action={"/pokemon/" + id + "?_method=DELETE"} method="post">
              <button>
                  Delete
              </button>
            </form>
          </div>
        </body>
      </html>
    )
  }
}

module.exports = Delete;
