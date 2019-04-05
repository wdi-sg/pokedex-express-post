var React = require('react');

class Pokeedit extends React.Component {
  render() {
    return (
        <div>
          <h2> Edit Pokemon</h2>
            <form method="POST" action="/pokemon/pokeeditform">
            <label for="id">Search By Id</label>
            <br/>
            <input type="text" name="id"/>
            <input type="submit" value="Submit"/>
            <br/>
          </form>
        </div>
    );
  }
}

module.exports = Pokeedit;