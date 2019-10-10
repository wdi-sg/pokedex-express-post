var React = require('react');
class Edit extends React.Component {
  render() {



    return (
      <html>
        <body>
          <div>

            <h1> Do you REALLY want to delete {this.props.name}?</h1>
             <img src={this.props.img}/>

            <form method="POST" action= {"/pokemon/" + this.props.id + "?_method=delete"}>



              <input type="submit" value="DELETE FOREVER" />

             </form>

          </div>
        </body>
      </html>
    );
  }
}

module.exports = Edit;