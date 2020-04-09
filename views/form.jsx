var React = require('react');
class Forms extends React.Component {
  render() {
    console.log(this.props)
    // <h4>Image</h4><input type= "image" name= "image"/>
    return (
      <html>
        <body>
          <div>
            <form method="POST" action="/newpokedex.json">

                <h4>ID number</h4><input type= "number" name= "id"/>
                <h4>Pokemon number</h4><input type= "number" name= "num"/>
                <h4>Pokemon Name</h4><input type= "text" name= "name"/>

                <h4>Height</h4><input type= "number" name= "height"/>
                <h4>Weight</h4><input type= "number" name= "weight"/>
                <input type= "submit" name= "submit"/>

            </form>
          </div>
        </body>
      </html>
    );
  }
}

module.exports = Forms;