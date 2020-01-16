var React = require('react');

class Home extends React.Component {
  render() {
    var name = this.props.name
    var img = this.props.img
    var height = this.props.height
    var weight = this.props.weight
    var index = "/pokemon/" + this.props.index + "/edit?_method=put"
    return (
      <html>
        <body>
          <div>
            <h1>Hello</h1>
            <p> Are you here to edit this pokemon</p>
            <form method="POST" action={index}>
            <p>
                <input type="text" name="name" value={name}/>
            </p>
            <p>
                <input type="text" name="img" value={img}/>
            </p>
            <p>
                <input type="text" name="height" value={height}/>
            </p>
            <p>
                <input type="text" name="weight"  value={weight}/>
            </p>
                <input type="submit" value="Submit"/>
            </form>
          </div>
        </body>
      </html>
    );
  }
}

module.exports = Home;