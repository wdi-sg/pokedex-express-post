var React = require('react');

class Home extends React.Component {
  render() {
    return (
      <html>
        <body>
          <div>
            <form>
                ID:<br>
                    <input type="text" name="id" value="id"><br>
                Number:<br>
                    <input type="text" name="number" value="number">
                Name:<br>
                  <input type="text" name="name" value="name">
                Image:<br>
                  <input type="text" name="image" value="image">
                Height:<br>
                  <input type="text" name="height" value="height">
                Weight:<br>
                  <input type="text" name="weight"value="weight">
                  <br><br>
                <input type="submit" value="Submit">
            </form>
          </div>
        </body>
      </html>
    );
  }
}

module.exports = Home;