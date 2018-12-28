var React = require ('react');

class Default extends React.Component {
    render () {
        return (
            <html>
                <head>
                    <link href="https://fonts.googleapis.com/css?family=Titillium+Web" rel="stylesheet"/>
                    <link rel ="stylesheet" type="text/css" href="/style.css"/>
                </head>
                <body>
                    <h1> Welcome to the pokedex!</h1>
                    {this.props.children}
                </body>
            </html>
        )
    }
}

module.exports = Default;