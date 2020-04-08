const React = require('react');
class Form extends React.Component {
  render() {
    return (
      <html lang="en" dir="ltr">
        <head><link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossOrigin="anonymous"/></head>

        <body style={{textAlign: "center"}}>
        <div className="jumbotron">        <h1>Submit a Pokemon!</h1>

        </div>
        <p style={{color: 'red'}}>{this.props.error}</p>
          <form method="POST" action="/pokemon">
            <br/><input type="text" name="name" placeholder="Name"/ >
            <br/><input type="text" name="img" placeholder="Image"/ >
            <br/><input type="text" name="height" placeholder="Height"/ >
            <br/><input type="text" name="weight" placeholder="Weight"/ >
            <br/><input className="btn btn-primary" type="submit" value="Submit" />
          </form>
        </body>
      </html>
    );
  }
}

module.exports = Form;
