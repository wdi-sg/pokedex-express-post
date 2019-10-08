const React = require("react");

class Home extends React.Component {
  render() {
    const {pokeArr} = this.props;
    return (
      <html>
        <body>
          <div>
            <form action="/" method="get">
              <select name="sortby">
                <option value="ascending">Ascending</option>
                <option value="descending">Descending</option>
              </select>
              <button>
                  Sort
              </button>
            </form>
            {pokeArr.map((data, i) => (
              <div key={i}>
                  <p>{data}</p>
              </div>
            ))}
          </div>
        </body>
      </html>
    )
  }
}

module.exports = Home;
