var React = require("react");

//const Layout = require("./layout.jsx");

class Form extends React.Component {
  render() {
    return (
      //<Layout>



        <div>

          <h1>Create an animal!</h1>
          <select name="size">
            <option value="1212">
              <a href="?sortby=name">sort by name</a>
            </option>
          </select>

          <a href="?sortby=name">sort by name</a>
          <form method="POST" action="/animals">
            <select name="size">
              <option value="1212">
                <a href="?sortby=name">sort by name</a>
              </option>
              <option value="4444">medium</option>
              <option value="345324">large</option>
            </select>
            <p>animal name</p>
            <input name="name" />
            <p>animal country</p>
            <input name="country" />
            <p>average weight</p>
            <input name="averageWeight" />
            <p>--</p>
            <input type="submit" />
          </form>
        </div>
      //</Layout>
    );
  }
}

module.exports = Form;
