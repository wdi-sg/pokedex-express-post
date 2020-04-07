var React = require("react");

class HomeForm extends React.Component {
  render() {
    return (
      <html>
        <body>
          <div>
            <form method="POST" action="/pokemon/?sortby=name">
              <input type="submit" value="Sort by name"/>
            </form>
          </div>
        </body>
      </html>
    );
  }
}

module.exports = HomeForm;
