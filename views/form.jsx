var React = require('react');

class Home extends React.Component {
  render() {

    let message = "welcome!";

    return (
      <div>
      <form action="/pokemon" method='POST'>
      <input type="text" name="pokemon" placeholder="pokemon Id"/><br/>
      <input type="text" name="pokemon" placeholder="pokemon num"/><br/>
      <input type="text" name="pokemon" placeholder="pokemon name"/><br/>
      <input type="text" name="pokemon" placeholder="pokemon image"/><br/>
      <input type="text" name="pokemon" placeholder="pokemon height"/><br/>
      <input type="text" name="pokemon" placeholder="pokemon weight"/><input type="submit"/><br/>
      </form>
      <h1>Hello, New Pokemon!</h1>
      <h1>{ message }</h1>
      </div>
    );
  }
}

module.exports = Home;
//
