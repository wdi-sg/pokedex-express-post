var React = require('react');
var DefaultLayout = require('./layouts/default');

class Add extends React.Component {
  render() {

    return (
            <DefaultLayout title="Add New Pokemon">
                <form method="POST" action="/pokemon">
                        <h1>Add New Pokemon</h1>
                        Name: <input name="name"/><br/>
                        Image: <input name="img"/><br/>
                        Height: <input name="height"/><br/>
                        Weight: <input name="weight"/><br/><br/>
                        <input className="btn btn-success" type="submit" value="Add new Pokemon"/>
                </form>
                <a className="btn btn-info back" href="/pokemon">Back to Pokedex</a>
            </DefaultLayout>
    );
  }
}

module.exports = Add;