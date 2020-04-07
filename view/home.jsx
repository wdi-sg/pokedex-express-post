var React = require('react');
class Home extends React.Component {
  render() {
    return (
      <html>
        <body>
          <div>
            <h1>Hello!</h1>
                <form method="GET" action="/sortByName" >
                    <select id="options" name="options" >
                        <option value="Name" >Name</option>
                        <option value="Weight">Weight</option>
                        <option value="Height">Height</option>

                    </select>
                    <input type="submit" value="Submit"></input>
                </form>


          </div>
        </body>
      </html>
    );
  }
}

module.exports = Home;