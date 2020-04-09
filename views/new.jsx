var React = require('react');
class New extends React.Component {
  render() {
    return (
      <html>
        <head>
        <meta charset="utf-8"></meta>
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"></meta>

          <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous"></link>
        </head>
        <body>
          <div className="row justify-content-center">
            <h1>Add a new pokemon</h1>
          </div>
          <div className="row justify-content-center">
            <div>
              <form method="POST" action="/pokemon">
                <div>
                  ID:
                  <input type="text" name="id"></input>
                </div>
                <div>
                  Num:
                  <input type="text" name="num"></input>
                </div>
                <div>
                  Name:
                  <input type="text" name="name"></input>
                </div>
                <div>
                  Img:
                  <input type="text" name="img"></input>
                </div>
                <div>
                  Height:
                  <input type="text" name="height"></input>
                </div>
                <div>
                  Weight:
                  <input type="text" name="weight"></input>
                </div>
                <div>
                  <input type="submit" value="submit"></input>
                </div>
              </form>
            </div>
          </div>
          {this.props.error}

          <script src="https://code.jquery.com/jquery-3.4.1.slim.min.js" integrity="sha384-J6qa4849blE2+poT4WnyKhv5vZF5SrPo0iEjwBvKU7imGFAV0wwj1yYfoRSJoZ+n" crossorigin="anonymous"></script>
          <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js" integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" crossorigin="anonymous"></script>
          <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js" integrity="sha384-wfSDF2E50Y2D1uUdj0O3uMBJnjuUD4Ih7YwaYd1iqfktj0Uod8GCExl3Og8ifwB6" crossorigin="anonymous"></script>
        </body>
      </html>
    );
  }
}

module.exports = New;