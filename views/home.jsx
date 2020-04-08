var React = require("react");

class HomeForm extends React.Component {
  render() {
    return (
      <html>
        <body>
          <div>
            <h3>Sort Pokemon By Categories</h3>
            <form method="GET" action="/pokemon/sort">
              <select name="options">
                <option value="sortbyname">Name</option>
                <option value="sortbyweight">Weight</option>
                <option value="sortbyheight">Height</option>
              </select>
              <br></br>
              <br></br>
              <input type="submit" value="Submit"/>
            </form>

            <h3>Add A New Pokemon</h3>
            <form method="GET" action="/pokemon/new">
              <input type="submit" value="Add A New Pokemon"/>
            </form>
            
            <h3>View All Pokemon</h3>
            <form method="GET" action="/pokemon">
              <input type="submit" value="View All Pokemon"/>
            </form>
          </div>
        </body>
      </html>
    );
  }
}

module.exports = HomeForm;
