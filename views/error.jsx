var React = require("react");
class Validate extends React.Component {
  render() {
    return (
      <html>
        <body>
          <div>
            <form method="POST" action="/pokemon">
              <p>ID: <input type="text" name="id" /></p>
              <p>NUM: <input type="text" name="num" /></p>
              <p> NAME: <input type="text" name="name"  /></p>
              <p>IMG: <input type="text" name="img" /></p>
              <p>Height: <input type="text" name="height" /></p>
              <p> Weight: <input type="text" name="weight" /></p>
            
             
              <input type="submit" />
            </form>
            <h2 style={{color:"red"}}>Please fill in all inputs</h2>
          </div>
        </body>
      </html>
    );
  }
}

module.exports = Validate;
