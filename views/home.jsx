const React = require("react");

class Home extends React.Component {
  render() {
    const {pokeArr} = this.props;
    return (
      <html>
        <body>
          <div>
            {pokeArr.map((data, i) => (
              <div key={i}>
                  <p>{data}</p>
              </div>
            ))}
            <form action="/" method="get">
              <button name="sort" value="sort">
                  Sort
              </button>
            </form>
          </div>
        </body>
      </html>
    )
  }
}

module.exports = Home;
