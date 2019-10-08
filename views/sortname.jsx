var React = require('react');
class SortName extends React.Component {
  render() {
    return (
      <html>
        <body>
          <div>
         <h1>Sorted by Alphabet</h1>
         name: {this.props}
  
          </div>
        </body>
      </html>
    );
  }
}

module.exports = SortName;