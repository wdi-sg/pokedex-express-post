var React = require('react');
class myHome extends React.Component {
  render() {
    return (
      <html>
        <body>
          <div>
            <form action = "/pokemon" method = "POST">
                <h1>New Pokemon Information</h1>
                ID: <input type="text" name="id" />
                <br />
                Number: <input type="text" name="num" />
                <br />
                Name: <input type="text" name="name" />
                <br />
                Image: <input type="text" name="img" />
                <br />
                Height: <input type="text" name="height" />
                <br />
                Weight: <input type="text" name="weight" />
                <br />
                <input type="submit" value="Submit" />
            </form>
          </div>
        </body>
      </html>
    );
  }
}

module.exports = myHome;