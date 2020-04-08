var React = require('react');

class List extends React.Component {
  render() {

    let pokedex = this.props.dex;
    let pokelist = pokedex.map((mon) => {
      let link = "../pokemon/" + mon.id;
      return <li key={mon.id}><a href={link}>{mon.name}</a></li>;
    });

    return (
      <html>
        <body>
          <div>
            <form method="GET" action="/">
              <select id="sort" name="sortby">
                <option value="default">Default (Number)</option>
                <option value="name">Name</option>
                <option value="weight">Weight</option>
                <option value="height">Height</option>
                <option value="namedesc">Name (Desc)</option>
                <option value="weightdesc">Weight (Desc)</option>
                <option value="heightdesc">Height (Desc)</option>
              </select><br/>
              <input type="submit" value="Sort"></input>
            </form>
          </div>

          <div>
            <a href="../pokemon/new">Add a Pokemon!</a>
          </div>

          <div>
            <ul>
              {pokelist}
            </ul>
          </div>
        </body>
      </html>
    );
  }
}

module.exports = List;
