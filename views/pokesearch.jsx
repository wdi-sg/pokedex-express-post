var React = require('react');

class Pokesearch extends React.Component {
  render() {
    return (
        <div>
          <h2> Pokemon Search </h2>
          <form method="POST" action="/pokemon/searchid">
            <label for="id">Search By Id</label>
            <br/>
            <input type="text" name="id"/>
            <input type="submit" value="Submit"/>
            <br/>
          </form>

          <form method="POST" action="/pokemon/searchname">
            <label for="name">Search By Name</label>
            <br/>
            <input type="text" name="name"/>
            <input type="submit" value="Submit"/>
            <br/>
          </form>

        </div>
    );
  }
}

module.exports = Pokesearch;