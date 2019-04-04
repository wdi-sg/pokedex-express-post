var React = require('react');
const json = require('../pokedex.json');

// console.log(json.pokemon.length);


class Pokecreate extends React.Component {
  render() {
    return (
        <div>
          <h2> Create Your Own Pokemon </h2>
          <form method="post" action="/pokemon/new/creation">
            <label for="id">id</label>
            <input type="text" name="id" value={json.pokemon.length + 1} readonly="readonly"/>

            <label for="num">num</label>
            <input type="text" name="num" value={json.pokemon.length + 1} readonly="readonly"/>

            <br/> <br/>

            <label for="name">name</label>
            <input type="text" name="name"/>

            <label for="img">img</label>
            <input type="text" name="img"/>

            <label for="height">height</label>
            <input type="text" name="height"/>

            <label for="weight">weight</label>
            <input type="text" name="weight"/>

            <input type="submit" value="Submit"/>
          </form>
        </div>
    );
  }
}

module.exports = Pokecreate;


          // <form method="POST" action="/pokemon/search">
          //   <label for="id">Id</label>
          //   <br/>
          //   <input type="text" name="id"/>
          //   <input type="submit" value="Submit"/>
          //   <br/>


          //   <label for="name">Name</label>
          //   <br/>
          //   <input type="text" name="name"/>
          //   <input type="submit" value="Submit"/>
          //   <br/>
          // </form>