var React = require('react');

class New extends React.Component {
  render() {
    var url = "/pokemon/"+ "?_method=POST";
    return (
      <html>
        <body>
            <h1>Pokemon Details</h1>
            <form action={url} method="POST">
              ID: <input name="id" value={this.props.num}/> <br />
              Num: <input name="num" value={this.props.num}/> <br />
              Pokemon Name: <input name="name" value="name"/> <br />
              Image: <input name="img" value=""/> <br />
              Height: <input name="height" value="height in m"/> <br />
              Weight: <input name="weight" value="weight in kg"/> <br />
              <input type="submit" value="Submit"/>
            </form>
            <p><a href="/pokemon">Back to main</a></p>
         </body>
        </html>
    );
  }
}

module.exports = New;