const React = require('react');
class Pokemon extends React.Component {
  render() {
    return (
      <html lang="en" dir="ltr">
        <body style={{fontFamily: "sans-serif", textAlign: "center"}}>
            <img src={this.props.img}/>
            <h1>{this.props.name}</h1>
            <p>ID: {this.props.id}</p>
            <p>Weight: {this.props.weight}</p>
            <p>Height: {this.props.height}</p>

            <div>
                <a href="/">Back to Home</a>
            </div>
        </body>
      </html>
    );
  }
}

module.exports = Pokemon;
