var React = require('react');

class Home extends React.Component{
    render() {
        return (
          <html>
            <body>
              <div>
                <form method="get" action="/?sortby=name&sortby=sort">
                  <input type="text" name="name"></input>
                  <select name="sortby" size ="1">
                    <option name="sort">name</option>
                    <option name="sort">id</option>
                    <option name="sort">height</option>
                    <option name="sort">weight</option>
                    <option name="sort">candy</option>
                    <option name="sort">egg</option>
                  </select><br></br>
                  <input type="submit" value="Sort By Name"></input>
                </form>
              </div>
            </body>
           </html>
        );
    }
}

module.exports = Home;