var React = require('react');

class Pokecreate extends React.Component {
  render() {
    return (
        <div>
          <h2> Create Your Own Pokemon </h2>
          <form method="post" action="/pokemon/new/creation">
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