var React = require('react');

class Add extends React.Component {
  render() {

    return (
            <form method="POST" action="/pokemon">
                    <h1>Add New Pokemon</h1>
                    Name: <input name="name"/><br/>
                    Image: <input name="img"/><br/>
                    Height: <input name="height"/><br/>
                    Weight: <input name="weight"/><br/><br/>
                    <input type="submit" value="Add new Pokemon"/>
            </form>
    );
  }
}

module.exports = Add;