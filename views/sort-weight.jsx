var React = require("react");

class SortWeight extends React.Component {
  render() {
    let sortedWeightArr = this.props.arr;
    let sortedWeightArrHtml = sortedWeightArr.map((element) => {
      return (
        <li>
          {element.Name} - {element.Weight}
        </li>
      );
    });
    return (
      <html>
        <body>
          <h2>Pokemon - Sorted By Weight (kg):</h2>
          <div>
            <form method="GET" action="/pokemon/sort">
              <ul>{sortedWeightArrHtml}</ul>
            </form>
          </div>
        </body>
      </html>
    );
  }
}

module.exports = SortWeight;
