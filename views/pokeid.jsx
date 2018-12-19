var React = require('react');

class pokeid extends React.Component {
  render() {
  const name = this.props.name.map( username => {
      return <li>{username}</li>
    });
    const email = this.props.email.map( mail => {
      return <li>{mail}</li>
    });
    return (
      <div>
        <h1>Hello</h1>
        <ul>
            {name} -- {email}
        </ul>
      </div>
    );
  }
}

module.exports = pokeid;