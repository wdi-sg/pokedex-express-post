var React = require('react');

class Delete extends React.Component {
    render() {
        var link = `/pokemon/${this.props.id}?_method=DELETE`;
        return (
            <form action= {link} method="POST">
                <h1>{this.props.name}</h1>
                <button>Delete from Pokedex</button>
            </form>
        );
    }
}

module.exports = Delete;