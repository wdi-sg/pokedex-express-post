let React = require('react');

class Delete extends React.Component {
  render() {
    console.log("this is delete" + this.props.id);
    let override = '/pokemon/' + this.props.id + '?_method=delete';
    return(
      <html>
        <body>
          <h1>Delete: {this.props.pokemon.name}</h1>
          <form action={override} method="POST">
            <p>delete this pokemon by pressing the delete button</p>
            <input type="submit" defaultValue="Delete"/>
          </form>
        </body>
      </html>
    );
  }
}

module.exports = Delete;