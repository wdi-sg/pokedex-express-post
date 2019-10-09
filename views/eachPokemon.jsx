var React = require('react');
class eachPoke extends React.Component {
  render() {
    return (
      <html>
        <body>
          <div>
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/International_Pok%C3%A9mon_logo.svg/1200px-International_Pok%C3%A9mon_logo.svg.png" style={{width: 30 + '%'}}/>
            <h1>{ this.props.name }</h1>
            <img src={this.props.img} />
            <h2>{ this.props.name }'s height is { this.props.height }</h2>
            <h2>{ this.props.name }'s weight is { this.props.weight }</h2>
          </div>
        </body>
      </html>
    );
  }
}

module.exports =eachPoke;