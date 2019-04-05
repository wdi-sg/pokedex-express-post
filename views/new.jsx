var React = require('react');

class New extends React.Component {

  render() {
    return (
                      <form method = "POST" action = {''}>
                      Pokemon Num: <input type= "text" name = "num"/> //always remember to close the tags for jsx files....
                      Pokemon Name: <input type= "text" name = "name"/>
                      Pokemon Image: <input type= "image" name = "img"/>
                      Height: <input type= "number" name = "height"/>
                      Weight: <input type= "number" name = "weight"/>
                      <input type= "submit" value= "Submit"/>
                      </form>
            );
          }
}

module.exports = New;
