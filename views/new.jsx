var React = require('react');

class New extends React.Component{
    render() {
        return (
          <html>
            <body>
              <div>
                <form method="POST" action="/pokemon">
                  <input type="text" name="id" placeholder="id"></input><br></br>
                  <input type="text" name="num" placeholder="num"></input><br></br>
                  <input type="text" name="name" placeholder="name"></input><br></br>
                  <input type="text" name="img" placeholder="img"></input><br></br>
                  <input type="text" name="height" placeholder="height"></input><br></br>
                  <input type="text" name="weight" placeholder="weight"></input><br></br>
                  <input type="submit" value="Submit"></input>
                </form>
              </div>
            </body>
           </html>
        );
    }
}

module.exports = New;