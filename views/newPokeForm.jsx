var React = require("react");

//const Layout = require("./layout.jsx");

class Form extends React.Component {
  render() {
    return (
      <div>
        <h1>Pokemon</h1>
        <form method="POST" action="/pokemon">
          ID:
          <input type="number" name="id" />
          Num:
          <input type="text" name="num" />
          Name:
          <input type="text" name="name" />
          img:
          <input type="text" name="img" />
          Height:
          <input type="text" name="height" />
          Weight:
          <input type="text" name="weight" />
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

module.exports = Form;
