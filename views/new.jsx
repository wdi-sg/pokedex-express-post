var React = require('react');

class Home extends React.Component {
 
  render() {
    return (
      <html>
        <body>
          <div>
            <form method="POST" action="/pokemon">
              Enter New Pokemon:<br/><br/>
              <input type="number" name="id" placeholder="ID"></input> <br/>
              <input type="number" name="num" placeholder="Num"></input><br/>
              <input type="text" name="name" placeholder="Name"></input><br/>
              <input type="text" name="img" placeholder="Img"></input><br/>
              <input type="text" name="height" placeholder="Height"></input><br/>
              <input type="text" name="weight" placeholder="Weight"></input><br/><br/>
              <input type="submit" value="Enter" ></input>
            </form>

          </div>
        </body>
      </html>
    );
  }
}

module.exports = Home;