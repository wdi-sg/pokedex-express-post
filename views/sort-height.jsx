var React = require("react");

class SortHeight extends React.Component {
  render() {
    let sortedHeightArr = this.props.arr;
    let sortedHeightArrHtml = sortedHeightArr.map((element) => {
      return (
        <li>
          {element.Name} - {element.Height}
        </li>
      );
    });
    return (
      <html>
        <body>
          <h2>Pokemon - Sorted By Height (m):</h2>
          <div>
            <form method="GET" action="/pokemon/sort">
              <ul>{sortedHeightArrHtml}</ul>
            </form>
          </div>
        </body>
      </html>
    );
  }
}

module.exports = SortHeight;
