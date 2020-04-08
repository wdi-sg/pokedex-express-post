var React = require('react');
class insert extends React.Component {
  render() {
    return (
      <html>
        <body>
          <div>
            <h1  style={{textAlign: "Center"}}>Hello </h1>
            <h2  style={{textAlign: "Center"}}>For Insert data </h2>
                <form method="POST" action="/pokemon"  style={{textAlign: "Center"}}>

                    <span>Name: </span>
                    <input id= "name" type="text" name="name" placeholder="Enter Name" required
    oninvalid="this.setCustomValidity('Enter Valid Name Here')"
    oninput="this.setCustomValidity('')" ></input>
                    <br></br><br></br>
                    <span>Img: </span>
                    <input type="text" name="img" placeholder="Enter link" required
    oninvalid="this.setCustomValidity('Enter Valid link Here')"
    oninput="this.setCustomValidity('')"></input>
                    <br></br><br></br>
                    <span>Height: </span>
                    <input type="text" name="height" placeholder="Enter Height" required
    oninvalid="this.setCustomValidity('Enter Valid Height Here')"
    oninput="this.setCustomValidity('')"></input>
                    <br></br><br></br>
                    <span>Weight: </span>
                    <input type="text" name="weight"  placeholder="Enter Weight" required
    oninvalid="this.setCustomValidity('Enter Valid Weight Here')"
    oninput="this.setCustomValidity('')"></input>
                    <br></br><br></br>
                    <input type="submit" value="Submit"></input>
                </form>

                <h2  style={{textAlign: "Center"}}>To return home </h2>
            <form method="GET" action="/" style={{textAlign: "Center"}}>
            <input type="submit" value="Return Home"></input>
            </form>

          </div>
        </body>
      </html>
    );
  }
}

module.exports = insert;