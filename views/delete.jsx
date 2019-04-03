var React = require('react');

class Delete extends React.Component {
  render() {

    let formAttribute = `/pokemon/${this.props.id}?_method=DELETE`;

    return (
        <body>
            <form method="POST" action={ formAttribute }>
                <h1>Delete Existing Pokemon - { this.props.name }</h1>
                Name: <label> { this.props.name } </label><br/>
                Image: <label>{ this.props.img } </label><br/>
                Height: <label> { this.props.height } </label><br/>
                Weight: <label> { this.props.weight } </label><br/>
                <input type="hidden" name="id" value= { this.props.id } /><br/>
                <input type="submit" value="Do you really want to delete existing Pokemon?"/>
            </form>
        </body>
    );
  }
}

module.exports = Delete;