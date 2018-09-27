var React = require('react');

class New extends React.Component {
  render() {
    let actionURL = '/pokemon'
    return (
      <div>
        <form method="POST" action={actionURL}>
          <h1>Create your own Pokemon</h1>
          <p>Id</p>
          <input type="text" name="id"/>
          <p>Name</p>
          <input type="text" name="name"/>
          <p>Weight</p>
          <input type="text" name="weight"/>
          <p>Height</p>
          <input type="text" name="height"/>
          <br/>
          <input type='submit' value='Submit'/>
        </form>
      </div>
    );
  }
}

module.exports = New;