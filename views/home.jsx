const React = require('react');

class Home extends React.Component {
  render() {
    return (
      <div><form action="/" method="GET">
        <button type="submit" name="sortby" value="name">Sort by Name</button>
      </form>
      </div>
    );
  }
}

module.exports = Home;
