var React = require('react');

class Delete extends React.Component {
    render() {
        return (
            <html>
        <body>
          <div>
            <h1>Deleting a pokemon?</h1>
                <form method="POST" action={"/pokemon/"+this.props.id+"?_method=DELETE"} methods = "DELETE">


              <button>Delete!</button>
            </form>
          </div>
        </body>
      </html>
        );
    }
}

module.exports = Delete;