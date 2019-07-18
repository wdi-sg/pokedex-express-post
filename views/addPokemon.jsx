var React = require('react');
const jsonfile = require('jsonfile');
var file = "pokedex.json"

class Home extends React.Component {
  render() {
    //code logic goes here
    var goodToAdd = `Pokemon Added!`
    var noGood = `Error! Unable to add Pokemon due to duplicate pokemon name found. Please try again.`
    var noGoodId = `Error! Unable to add Pokemon as someone else has taken this ID already. Please try again.`
    var list = this.props.data;
    var body = this.props.pokemon;
    var response = ""
    var responseSet = {
      flagstate : false,
      idstate : false
    }
    if (parseInt(body["id"]) <= list.length){
      responseSet.idstate = true
    }else {
      for (var i = 0; i < list.length; i++){
        if (list[i]["name"] === body["name"]){
          responseSet.flagstate = true
          break;
        }
      }
    }
    if (responseSet.idstate === true && responseSet.flagstate === false){
      response = noGoodId
    }else if(responseSet.idstate === false && responseSet.flagstate === true){
      response = noGood
    }else{
      response = goodToAdd
      jsonfile.readFile(file, function(err,obj){
        obj["pokemon"].push(body);
        jsonfile.writeFile(file,obj,(err) => {
          if(err){
            console.log(err)
          };
        });
      })
    }
    var pokelink = '/pokemon/'+body.id
    return (
      <html>
        <body style={{backgroundColor: "rgba(0,0,0,0.5)", textAlign:"center"}}>
          <div>
            <h1 style={{color: "#FFFFFF"}}>{response}</h1>
          </div>
          <div style={{color: "#FFFFFF"}}>
            <p><a href={pokelink}>Check out your pokemon!</a></p>
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
