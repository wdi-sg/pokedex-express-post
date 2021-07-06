var React = require('react');
class Home extends React.Component {
  render() {
    return (
      <html>
        <body>
          <div>
            <form method="GET" action="/pokemon/?">
            <input type="hidden" name="sortby" value="name"/>
            <div><input type="submit" value="Sort by name"/></div>
            </form>
            <form method="GET" action="/pokemon/?">
            <input type="hidden" name="sortby" value="weight"/>
            <div><input type="submit" value="Sort by weight"/></div>
            </form>
            <form method="GET" action="/pokemon/?">
            <input type="hidden" name="sortby" value="height"/>
            <div><input type="submit" value="Sort by height"/></div>
            </form>
          </div>
        </body>
      </html>
    );
  }
}

module.exports = Home;