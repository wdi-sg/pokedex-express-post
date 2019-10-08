const React = require("react");

class New extends React.Component {
  render() {
    return (
      <html>
        <body>
          <div>
            <h1>New Pokemon Registration</h1>
            <form action="/pokemon/new" method="post" id="new">
                <label htmlFor="name">Name: </label>
                <input type="text" name="name" />
                <label htmlFor="img">Image: </label>
                <input type="text" name="img" />
                <label htmlFor="height">Height: </label>
                <input type="text" name="height" />
                <label htmlFor="weight">Weight: </label>
                <input type="text" name="weight" />
            </form>
            <button type="submit" form="new" value="submit">
                Submit
            </button>
          </div>
        </body>
      </html>
    )
  }
}

module.exports = New;
