var React = require('react');

class Delete extends React.Component {
    render() {
        let formAction = '/pokemon/' + this.props.id + '?_method=delete';
        return (
            <html>
                <body>
                    <h2>Deleting {this.props.name}!!!</h2>
                    <form method="POST" action={formAction}>
                        <input type="submit" value="Delete"/>
                    </form>
                </body>
            </html>
        );
    }
}

module.exports = Delete;