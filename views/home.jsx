var React = require('react');

class Home extends React.Component {
  render() {
    return (
        <div>
        <h2>Creat A New Pokemon:</h2>
        <form method="POST" name="myPokemon" method="POST" action="/pokemon">
            <p>id</p>
            <input type="text" name="id"/>
            <p>Number</p>
            <input type="text" name="num"/>
            <p>Name</p>
            <input type="text" name="name"/>
            <p>Image upload</p>
            <input type="file" name="img"/>
            <p>height</p>
            <input type="text" name="height"/>
            <p>weight</p>
            <input type="text" name="weight"/>
            <input type="submit" value="Submit"/>
        </form>
        </div>
    );
  }
}

module.exports = Home;