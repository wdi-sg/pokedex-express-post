var React = require('react');
class forms extends React.Component {
  render() {
    return (
      <html>
        <body>
          <div>
            <h1>Create Your Pokemon!!</h1>
            <img style={{width: 10 + '%'}} src="https://ih1.redbubble.net/image.288502627.1221/flat,550x550,075,f.u2.jpg"/><br/><br/>
            <h3 style={{color: "red"}}>ID and Number doesn't match!</h3>
            <form method='POST' action='/pokemon'>
                ID: <br/><input type='number' name='id' required/><br/><br/>
                Number: <br/><input type='number' name='num' required/><br/><br/>
                Name: <br/><input type='text' name='name' required/><br/><br/>
                Image src: <br/><input type='url' name='img' required/><br/><br/>
                Weight: <br/><input type='text' name='weight' required/><br/><br/>
                Height: <br/><input type='text' name='height' required/><br/><br/>
                        <input type='submit' value='Submit'/>
            </form>
          </div>
        </body>
      </html>
    );
  }
}

module.exports = forms;