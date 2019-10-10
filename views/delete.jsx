var React = require('react');

class Delete extends React.Component {
    render() {
        let formAction = '/pokemon/' + this.props.id + '?_method=delete';
        return (
            <html>
                <body>
                    <h2>Confirm delete this pokemon?</h2>
                    <p>ID: { this.props.id }<br/>
                        Number: { this.props.num }<br/>
                        Name: { this.props.name }<br/>
                        <img src={ this.props.img }/><br/>
                        Height: { this.props.height }<br/>
                        Weight: { this.props.weight }<br/>
                    </p>
                    <form method="POST" action={formAction}>
                        <input type="submit" value="Delete"/>
                    </form>
                </body>
            </html>
        );
    }
}

module.exports = Delete;
