var React = require('react');

class Found extends React.Component {
    render() {
        let formEdit = '/pokemon/' + this.props.id + '/edit';
        let formDelete = '/pokemon/' + this.props.id + '/delete';

        return (
            <html>
                <body>
                    <h2>Pokemon { this.props.message }</h2>
                    <p>ID: { this.props.id }<br/>
                        Number: { this.props.num }<br/>
                        Name: { this.props.name }<br/>
                        <img src={ this.props.img }/><br/>
                        Height: { this.props.height }<br/>
                        Weight: { this.props.weight }<br/>
                    </p>
                    <form method="GET" action={formEdit}>
                        <input type="submit" value="Edit Pokemon"/>
                    </form>
                    <form method="GET" action={formDelete}>
                        <input type="submit" value="Delete Pokemon"/>
                    </form>
                </body>
            </html>
        );
    }
}

module.exports = Found;