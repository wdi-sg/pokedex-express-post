var React = require('react');
class Edit extends React.Component {
  render() {
    return (
      <html>
        <body>
          <div>
            <form action = {"/pokemon/"+this.props.id+"?_method=put"} method = "POST">
                <h1>Edit Pokemon Information</h1>
                ID: <input type="text" name="id" value={this.props.id} />
                <br />
                Number: <input type="text" name="num" value={this.props.num} />
                <br />
                Name: <input type="text" name="name" value={this.props.name} />
                <br />
                Image: <input type="text" name="img" value={this.props.image} />
                <br />
                Height: <input type="text" name="height" value={this.props.height} />
                <br />
                Weight: <input type="text" name="weight" value={this.props.weight} />
                <br />
                <input type="submit" value="Submit" />
            </form>
          </div>
        </body>
      </html>
    );
  }
}

module.exports = Edit;