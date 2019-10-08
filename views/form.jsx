var React = require('react');

class Home extends React.Component {
  render() {
    return (
      <html>
        <body>
            <h1>New Pokemon:</h1>
            <form method="POST" action="/pokemon">
                <label for="id">id:</label>
                <input type="text" name="id" id="id" /><br/>

                <label for="num">num:</label> 
                <input type="text" name="num" id="num"/><br/>

                <label for="name">name:</label> 
                <input type="text" name="name" id="name"/><br/>

                <label for="img">img:</label>
                <input type="text" name="img" id="img"/><br/>

                <label for="height">height:</label>
                <input type="text" name="height" id="height"/><br/>

                <label for="weight">weight:</label>
                <input type="text" name="weight" id="weight"/><br/>
                
                <input type="submit" value="Submit"/><br/>
            </form>
        </body>
      </html>
    );
  }
}

module.exports = Home;
