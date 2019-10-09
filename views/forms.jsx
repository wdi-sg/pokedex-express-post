var React = require('react');
class forms extends React.Component {
  render() {
    return (
      <html>
        <body>
          <div>
            <h1>Create Your Pokemon!!</h1>
            <img style={{width: 10 + '%'}} src="https://ih1.redbubble.net/image.288502627.1221/flat,550x550,075,f.u2.jpg"/><br/><br/>
            <form method='POST' action='/pokemon'>
                ID: <br/><input type='number' name='id'/><br/><br/>
                Number: <br/><input type='number' name='num'/><br/><br/>
                Name: <br/><input type='text' name='name'/><br/><br/>
                Image src: <br/><input type='text' name='img'/><br/><br/>
                Weight: <br/><input type='text' name='weight'/><br/><br/>
                Height: <br/><input type='text' name='height'/><br/><br/>
                        <input type='submit' value='Submit'/>
            </form>
          </div>
        </body>
      </html>
    );
  }
}

module.exports = forms;