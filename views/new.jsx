const React = require("react");

class New extends React.Component {
  render() {
    return (
      <html>
        <body>
          <div>
            <h1>New Pokemon Registration</h1>
            <form action="/pokemon/new" method="post" id="new">
              <div>
                <label htmlFor="name">Name: </label>
                <input type="text" name="name" />
              </div>
              <div>
                <label htmlFor="img">Image: </label>
                <input type="text" name="img" />
              </div>
              <div>
                <label htmlFor="height">Height: </label>
                <input type="text" name="height" />
              </div>
              <div>
                <label htmlFor="weight">Weight: </label>
                <input type="text" name="weight" />
              </div>
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
