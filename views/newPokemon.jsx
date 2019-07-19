var React = require('react');

class Home extends React.Component {

  render() {
    //code logic goes here
    var newId = parseInt(this.props.data.length) + 1;
    console.log(newId)
    function padding (num, size){
      var str = num+""
      while (str.length < size){
        str = "0" + str;
      }
      return str;
    }
    var newIdPad = padding(newId, 3);
    //form to sort by values
    var formAction = "/pokemon/added"
    var form =
      <form method="POST" action={formAction}>
      Pokemon ID
      <input type="text" name="id" value={newId} disabled/>
      <input type="hidden" name="id" value={newId}/>
      Pokemon Number
      <input type="text" name="num" value={newIdPad} disabled/>
      <input type="hidden" name="num" value={newIdPad}/>
      Pokemon Name
      <input type="text" name="name"/>
      Pokemon IMG
      <input type="text" name="img"/>
      Pokemon Height
      <input type="text" name="height"/>
      Pokemon Weight
      <input type="text" name="weight"/>
      Pokemon Candy
      <input type="text" name="candy"/>
      Pokemon Candy Count
      <input type="text" name="candy_count"/>
      Pokemon Egg
      <input type="text" name="egg"/>
      Pokemon Average Spawns
      <input type="text" name="avg_spawns"/>
      Pokemon Spawn Time
      <input type="text" name="spawn_time"/>
      <input type="submit" value="submit"/>
      </form>

    return (
      <html>
        <body style={{backgroundColor: "rgba(0,0,0,0.5)", textAlign:"center"}}>
          <div>
            <h1 style={{color: "#FFFFFF"}}>Add a new pokemon!</h1>
          </div>
          <div style={{width: '10%', color: "#FFFFFF", margin:"0 auto"}}>
            {form}
          </div>
          <div>
            <p style={{color: "#FFFFFF"}}><a href="/pokemon">Back to main</a></p>
          </div>
        </body>
      </html>
    );
  }
}

module.exports = Home;
