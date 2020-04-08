var React = require("react");

class SortName extends React.Component {
  render() {
    let sortedNameArr = this.props.nameArray;
    let sortedNameArrHtml = sortedNameArr.map((element) => {
      return <li>{element}</li>;
    });
    return (
      <html>
        <body>
          <h2>Pokemon - Sorted By Name:</h2>
          <div>
            <form method="GET" action="/pokemon/sort">
              <ul>
                {sortedNameArrHtml}
              </ul>
            </form>
          </div>
        </body>
      </html>
    );
  }
}

module.exports = SortName;
