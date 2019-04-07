var React = require('react');

class New extends React.Component {

  render() {
    return (
            <form method = "POST" action = {'/pokemon'}>
              Pokemon ID: <br/>
              <input type= "text" name = "id" value = /><br/>
              Pokemon Num: <br/>
              <input type= "text" name = "num"/><br/> //always remember to close the tags for jsx files....
              Pokemon Name: <br/>
              <input type= "text" name = "name"/><br/>
              Pokemon Image: <br/>
              <input type= "image" name = "img"/><br/>
              Height: <br/>
              <input type= "number" name = "height"/><br/>
              Weight: <br/>
              <input type= "number" name = "weight"/><br/>
              <input type= "submit" value= "Submit"/><br/>
            </form>
            );
          }
}

module.exports = New;
