var React = require('react');
var DefaultLayout = require('./layouts/default');

class Delete extends React.Component {
  render() {

    let formAttribute = `/pokemon/${this.props.id}?_method=DELETE`;

    return (
            <DefaultLayout title="Delete Existing Pokemon">
                <form method="POST" action={ formAttribute }>
                    <h1>Delete Existing Pokemon - { this.props.name }</h1>
                    Name: <label> { this.props.name } </label><br/>
                    Height: <label> { this.props.height } </label><br/>
                    Weight: <label> { this.props.weight } </label><br/>
                    <input type="hidden" name="id" value= { this.props.id } /><br/>
                    <input className="btn btn-danger" type="submit" value="Do you really want to delete existing Pokemon?"/>
                </form>
                <a className="btn btn-info back" href="/pokemon">Back to Pokedex</a>
            </DefaultLayout>
    );
  }
}

module.exports = Delete;