var React = require('react');

class Home extends React.Component{
    render() {
        return (
          <html>
            <body>
              <div>
                <form method="get" action="/?sortby=name">
                  <input type="text" name="name" placeholder="name of pokemon"></input><br></br>
                  <input type="submit" value="Sort By Name"></input>
                </form>
              </div>
            </body>
           </html>
        );
    }
}

module.exports = Home;