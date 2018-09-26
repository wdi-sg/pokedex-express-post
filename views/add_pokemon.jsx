const React = require('react');

class AddPokemon extends React.Component {
  render() {

    return (
      <form action="/pokemon" method="post">
        <label htmlFor="id">ID</label>
        <input type="text" name="id" /><br></br>
        <label htmlFor="num">Num</label>
        <input type="text" name="num" /><br></br>
        <label htmlFor="name">Name</label>
        <input type="text" name="name" /><br></br>
        <label htmlFor="img">Img</label>
        <input type="text" name="img" /><br></br>
        <label htmlFor="height">Height</label>
        <input type="text" name="height" /><br></br>
        <label htmlFor="num">Weight</label>
        <input type="text" name="weight" /><br></br>
        <input type="submit" />
      </form>
    );
  }
}

module.exports = AddPokemon;
