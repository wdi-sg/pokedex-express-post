var React = require('react');

class Home extends React.Component {
  render() {
    return (
        <html lang="en">        
        <head>
            <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossOrigin="anonymous"/>
            <title>Submit new pokemon</title>
        </head>        
        <body>
            <div className="container">
                <div className="display-4">
                     {this.props.message}
                </div>
            </div>
        </body>       
        </html>
    );
  }
}

module.exports = Home;
