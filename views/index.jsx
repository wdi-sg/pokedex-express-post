var React = require('react');
class Index extends React.Component {
  render() {
    return (
      <html>
        <body>
          <div>
            <h1>Welcome to the online Pokdex!</h1>
            <div>
              <form method="GET" action="/pokemon">
                <label>Sort by:</label>
                <select name="sortby">
                  <option value="id">Id</option>
                  <option value="name">Name</option>
                  <option value="height">Height</option>
                  <option value="weight">Weight</option>
                </select>
                <input type="submit" value="Submit"/>
              </form>
            </div><br/>
            <div>{ this.props.list }</div>
          </div>
        </body>
      </html>
    );
  }
}

module.exports = Index;