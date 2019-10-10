var React = require('react');

class Found extends React.Component {
    render() {
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
                </body>
            </html>
        );
    }
}

module.exports = Found;