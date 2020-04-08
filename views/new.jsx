var React = require('react');

class New extends React.Component{
    render() {
        let errorMessage;
        if (this.props.errorInput != undefined){
            errorMessage = this.props.errorInput + " " +this.props.errorKey;
        };

        return (
          <html>
            <body>
              <div>
                {errorMessage}
                <form method="POST" action="/newpokemon">
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