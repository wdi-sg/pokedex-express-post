var React = require('react');
class Home extends React.Component {
  render() {

    return (
      <html>
       <meta charset="UTF-8"/>
        <link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet"/>
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous"/>
        <link rel="stylesheet" type="text/css" href="css/style.css"/>
        <body>
          <div className="container mt-5">
          <h1><u> Enter New Pokemon </u></h1>
            <form method="POST" action="/pokemon/newpokemon">
              Pokemon id: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <input type="text" name="id" placeholder="for eg. 200"/><br/>
              Pokemon num: &nbsp;&nbsp;&nbsp;
              <input type="text" name="num" placeholder="3digits"/><br/>
              Pokemon name: &nbsp;
              <input type="text" name="name" placeholder="name"/><br/>
              Pokemon img: &nbsp;&nbsp;&nbsp;&nbsp;
              <input type="text" name="img" placeholder="url"/><br/>
              Pokemon height:
              <input type="text" name="height" placeholder="meter"/><br/>
              Pokemon weight:
              <input type="text" name="weight" placeholder="kg"/><br/>
              <input className="btn btn-primary" type="submit" value="Submit"/>
            </form>
          </div>
        </body>
      </html>
    );
  }
}

module.exports = Home;