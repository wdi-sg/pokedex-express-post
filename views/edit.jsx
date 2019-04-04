var React = require('react');
var DefaultLayout = require('./layouts/default');

class Edit extends React.Component {
  render() {

    let formAttribute = `/pokemon/${this.props.id}?_method=PUT`;

    return (
            <DefaultLayout title="Edit Existing Pokemon">
                <form method="POST" action={ formAttribute }>
                    <h1>Edit Existing Pokemon - { this.props.name } </h1>
                    Name: <input name="name" value= { this.props.name } /><br/>
                    Height: <input name="height" value= { this.props.height } /><br/>
                    Weight: <input name="weight" value= { this.props.weight } /><br/><br/>
                    <input className="btn btn-success" type="submit" value="Edit existing Pokemon"/>
                </form>
                <a className="btn btn-info back" href="/pokemon">Back to Pokedex</a>
            </DefaultLayout>
    );
  }
}

module.exports = Edit;