var React = require('react');

class Edit extends React.Component {
  render() {

    let formAttribute = `/pokemon/${this.props.id}?_method=PUT`;

    return (
        <body>
            <form method="POST" action={ formAttribute }>
                <h1>Edit Existing Pokemon - { this.props.name } </h1>
                Name: <input name="name" value= { this.props.name } /><br/>
                Image: <input name="img" value= { this.props.img } /><br/>
                Height: <input name="height" value= { this.props.height } /><br/>
                Weight: <input name="weight" value= { this.props.weight } /><br/><br/>
                <input type="submit" value="Edit existing Pokemon"/>
            </form>
        </body>
    );
  }
}

module.exports = Edit;