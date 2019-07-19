var React = require('react');

class DeleteForm extends React.Component {
  render() {
    return (
      <html>
        <body>
          <div>
            <h1>Delete your pokemon {this.props.pokemon.name} ???????</h1>
          </div>
          <div>
          <form method="POST" action={"/pokemon/"+ this.props.pokemon.id + '?_method=DELETE'}>
            <input type="hidden" />
            <input type="submit" value="DELETE"/>

          </form>
          </div>
        </body>
      </html>
    );
  }
}

module.exports = DeleteForm;