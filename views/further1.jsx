var React = require('react');

class Further1 extends React.Component {

  render() {

    let delAction = `/pokemon/${this.props.id}?_method=delete`;

        return (
            <body>
                <form method="POST" action={delAction}>
                    <h1>Delete Pokémon Details</h1>
                    <div>ID: {this.props.id}</div>
                    <div>NUMBER: {this.props.num}</div>
                    <div>NAME: {this.props.name}</div>
                    <input type="submit" value="Delete"/>
                </form>
            </body>
        );
    }
}

module.exports = Further1;