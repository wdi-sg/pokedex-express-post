var React = require('react');

class Home extends React.Component {

  render() {
    return (
      <html>
        <body>
          <div>
            <p>Sorry but this id "{this.props.id}", belongs to {this.props.name}!</p>
            <form method="get" action="/pokemon/new">
                <button type="submit">Continue</button>
            </form>

          </div>
        </body>
      </html>
    );
  }
}

module.exports = Home;