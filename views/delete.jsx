var React = require('react');
class Home extends React.Component {
    render() {
        return (
            <html>
              <body>
                <div>
                  <h1>GOTTA CATCH THEM ALL!{this.props.name}</h1>
                  <form action={"/pokemon/" + this.props.id+'?_method=delete'} method="POST">
                    <input type="submit" value="delete"/> {/* change button value to delete*/}
                  </form>
                </div>
              </body>
            </html>
        );
    }
}
module.exports = Home;