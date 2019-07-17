var React = require('react');

class Home extends React.Component {
  render() {
    return (
      <html>
        <body>
          <div>
            <h1>It's working!</h1>
            <h1>Input ID:{this.props.id}</h1>
            <form method="POST" action="/pokemon/:id?_method=PUT">
            <input type="text" name="" value={this.props.id}></input><br />
            <input type="text" name="" value={this.props.num}></input><br />
            <input type="text" name="" value={this.props.name}></input><br />
            <input type="text" name="" value={this.props.img}></input><br />
            <input type="text" name="" value={this.props.height}></input><br />
            <input type="text" name="" value={this.props.weight}></input><br />
            <input type="submit" value="Submit"></input>
            </form>
          </div>
        </body>
      </html>
    );
  }
}

module.exports = Home;