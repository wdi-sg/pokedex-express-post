var React = require('react');
class deletePoke extends React.Component {
  render() {
    return (
      <html>
        <body>
          <div>
            <h1>Are You Sure You Want to Delete {this.props.name}??</h1>
            <img src={this.props.img} style={{width: 15 + '%'}}/><br/><br/>
            <form method='POST' action={'/pokemon/'+this.props.id+"?_method=delete"}>
                <input type='submit' value='Submit'/>
            </form>
          </div>
        </body>
      </html>
    );
  }
}

module.exports = deletePoke;