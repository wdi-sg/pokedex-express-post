var React = require('react');

class Layout extends React.Component {
    render() {
        return (
            <html>
                <head>
                <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous"></link>
                <link rel="stylesheet" href="/style.css"></link>

                <link href="https://fonts.googleapis.com/css?family=Shadows+Into+Light" rel="stylesheet"></link>
                </head>

                <body>
                    {this.props.children}
                </body>
            </html>
        ) // end of return
    }  // end of rendering
}  // end of layout

module.exports = Layout;