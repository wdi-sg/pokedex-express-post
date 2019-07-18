var React = require('react');

class New extends React.Component {
  render() {
    return (
      <html>
        <body>
          <div>
            <h1>Add new Pokemon</h1>
            <form action="/pokemon1" method="POST">
                <p>name</p>
                <input name="name"/>
                <p>id</p>
                <input name="id" value={this.props.lastIndex}/>
                <p>number</p>
                <input name="num" value={this.props.lastIndex}/>
                <p>height</p>
                <input name="height"/>
                <p>weight</p>
                <input name="weight"/>
                <p>image</p>
                <input name="img"/>
                <br/><br/>
                <input type="submit"/>
                <br/>
            </form>
          </div>
        </body>
      </html>
    );
  }
}

module.exports = New;
