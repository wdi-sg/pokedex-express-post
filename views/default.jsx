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
                        <form action="/" method="GET">
                            <select name="sortby">
                                <option value="name">sort by name</option>
                                <option value="height">sort by height</option>
                                <option value="weight">sort by weight</option>
                                </select>
                                <input type="submit" value = "submit"/>
                        </form>
                    {this.props.children}
                </body>
            </html>
        )
    }
}

module.exports = Default;