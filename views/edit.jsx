const React = require("react");

class Edit extends React.Component {
  render() {
    const {
      id,
      name,
      img,
      height,
      weight,
    } = this.props;
    console.log(id)
    return (
      <html>
        <body>
          <div>
            <h1>Modify Pokemon Details</h1>
            <form action={"/pokemon/"+ id + "?_method=put"} method="post" id="edit">
              <div>
                <label htmlFor="name">Name: </label>
                <input type="text" name="name" defaultValue={name}/>
              </div>
              <div>
                <label htmlFor="img">Image: </label>
                <input type="text" name="img" defaultValue={img}/>
              </div>
              <div>
                <label htmlFor="height">Height: </label>
                <input type="text" name="height" defaultValue={height}/>
              </div>
              <div>
                <label htmlFor="weight">Weight: </label>
                <input type="text" name="weight" defaultValue={weight}/>
              </div>
            </form>
            <button type="submit" form="edit" value="submit">
                Submit
            </button>
          </div>
        </body>
      </html>
    )
  }
}

module.exports = Edit;
