var React = require('react');

class deletepokemon extends React.Component {
  render() {
    return (
      <div>
        <h1>Delete {this.props.name}</h1>
        <p>Are you sure you want to delete {this.props.name}? This action cannot be undone.</p>
        <form method="POST" action={this.props.action}>
            Delete pokemon<input type="submit" value="Submit"/>
        </form>
      </div>
    );
  }
}

module.exports = deletepokemon;