var React = require('react');
class edit extends React.Component {

  render() {
    const url="edited/"+this.props.pokemon.id+"?_method=put";
    return (
      <html>
        <body>
          <div>
            <h1  style={{textAlign: "Center"}}>Hello </h1>
            <h2  style={{textAlign: "Center"}}>For Editing data </h2>
                <form method="POST" action={url}  style={{textAlign: "Center"}}>


                    name:<input id= "name" type="text" name="name" placeholder="Enter Name" readonly value={this.props.pokemon.name}
    oninvalid="this.setCustomValidity('Enter Valid Name Here')"
    oninput="this.setCustomValidity('')" ></input>
                    <br></br><br></br>
            id:<input id= "id" type="number" name="id" placeholder="Enter id" readonly value={this.props.pokemon.id}
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

module.exports = edit;