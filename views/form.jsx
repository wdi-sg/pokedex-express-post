var React = require('react');

class form extends React.Component {
  render() {

    let message = "welcome!";

    return (
      <div>
      <form action="/pokemon" method='POST' id ="something">
      <input type="text" name="pokemon.Id" placeholder="pokemon Id"/><br/>
      <input type="text" name="pokemon.num" placeholder="pokemon num"/><br/>
      <input type="text" name="pokemon.name" placeholder="pokemon name"/><br/>
      <input type="text" name="pokemon.image" placeholder="pokemon image"/><br/>
      <input type="text" name="pokemon.height" placeholder="pokemon height"/><br/>
      <input type="text" name="pokemon.weight" placeholder="pokemon weight"/>
      <button type="submit" form="something" value="submit">
               Submit
           </button><br/>
      </form>
      <h1>Hello, New Pokemon!</h1>
      <h1>{ message }</h1>
      </div>
    );
  }
}

module.exports = form;
//
