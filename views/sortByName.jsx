var React = require('react');
class SortByName extends React.Component {
  render() {

    let list2 = this.props.names.map(name => {
        return <li>{name}</li>
    });

    return (
      <html>
        <head>
            <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous"/>
        </head>
        <body>
          <div className="container">
            <h1>Welcome to the online Pokdex!</h1>
            <div className="jumbotron">
              <form method="GET" action="/pokemon">
                <label>Sort by:</label>
                <select name="sortby">
                  <option value="id">Id</option>
                  <option value="name">Name</option>
                  <option value="height">Height</option>
                  <option value="weight">Weight</option>
                </select>
                <input className="btn-danger" type="submit" value="Submit"/>
              </form>
            </div><br/>
            <div className="jumbotron"><ul>{ list2 }</ul></div>
          </div>
        </body>
      </html>
    );
  }
}

module.exports = SortByName;