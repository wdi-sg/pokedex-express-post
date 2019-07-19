var React = require('react');

class Home extends React.Component {

  render() {
    //code logic goes here
    return (
      <html>
        <body style={{backgroundColor: "rgba(0,0,0,0.5)", textAlign:"center"}}>
          <div>
            <h1 style={{color: "#FFFFFF"}}>You have deleted a pokemon!</h1>
          </div>
          <div>
            <p style={{color: "#FFFFFF"}}><a href="/pokemon">Back to main</a></p>
          </div>
        </body>
      </html>
    );
  }
}

module.exports = Home;
