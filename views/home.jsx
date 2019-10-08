var React = require('react');
class Home extends React.Component {
  render() {
    return (
      <html>
        <body>
          <div>
         <h1>HOME</h1>
        <form method="GET" action="/?" >
        <input type="submit" name="sortby" value="name"/>
        </form>
          </div>
        </body>
      </html>
    );
  }
}

module.exports = Home;