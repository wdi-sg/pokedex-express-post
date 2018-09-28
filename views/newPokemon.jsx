var React = require('react');

class NewPokemon extends React.Component {
  render() {
    return (
      <div>
        <form method="POST" action="/pokemon">
        <h2>Create New Pokemon: </h2>
        id: <input type = "text" name = "id"/>
        num: <input type = "text" name = "num"/>
        name: <input type = "text" name = "name"/>
        img: <input type = "text" name = "img"/>
        height: <input type = "text" name = "height"/>
        weight: <input type = "text" name = "weight"/>
        <input type = "submit" value = "Submit"/>
      </form>
      </div>
    );
  }
}

module.exports = NewPokemon;
