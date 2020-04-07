var React = require('react');
class Home extends React.Component {
  render() {
    return (
      <html>
        <body>
          <div>
            <h1 style={{textAlign: "Center"}}>Hello!</h1>
            <h2 style={{textAlign: "Center"}}>Click here to sort the current pokemon by categories.</h2>
                <form method="GET" action="/sortByName" style={{textAlign: "Center"}}>
                    <select id="options" name="options" >
                        <option value="Name" >Name</option>
                        <option value="Weight">Weight</option>
                        <option value="Height">Height</option>

                    </select>
                    <input type="submit" value="Submit"></input>
                </form>

            <h2 style={{textAlign: "Center"}}>Click here to add pokemon.</h2>
            <form method="GET" action="/pokemon/new" style={{textAlign: "Center"}}>
            <input type="submit" value="Insert New Pokemon"></input>
            </form>

          </div>
        </body>
      </html>
    );
  }
}

module.exports = Home;