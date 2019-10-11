var React = require('react');
class Error extends React.Component {
  render() {
    return (
      <html>
        <body>
          <div>

           <h1> POKEMON</h1>

            <form method="POST" action="/pokemon">
              ID:
              <input type="text" name="id" /><br/>
              Number:
              <input type="text" name="num" /><br/>
              Name:
              <input type="text" name="name" /><br/>
              Image:
              <input type="text" name="img" /><br/>
              Height:
              <input type="text" name="height" /><br/>
              Weight:
              <input type="text" name="weight" /><br/>
              <input type="submit" value="Submit" />

             </form>

             <h2 style = {{color:"red"}}>YOU NEED TO FILL IN ALL OF THE ITEMS.</h2>


          </div>
        </body>
      </html>
    );
  }
}

module.exports = Error;