var React = require('react');

class Home extends React.Component {
  render() {
    //code logic goes here
    //flags if search for pokemon name turns up negative
    var search = false;
    var response = ""
    for (var i = 0; i < this.props.data.length; i++){
      if (this.props.data[i]["name"] === this.props.qstring){
        search = true;
        var name = this.props.data[i]["name"]
        var height = this.props.data[i]["height"]
        var weight = this.props.data[i]["weight"]
        var img = this.props.data[i]["img"]
        var id = this.props.data[i]["id"]
      }
    }
    if (this.props.qstring === ""){
      response = `Welcome to the online Pokedex!`
      search = true;
    }
    if (!search){
      response = `Could not find information about ${this.props.qstring} - Is that a new pokemon? Gotta catch em' all!`
    }
    var edit = "/pokemon/"+id+"/edit"

    return (
      <html>
        <body style={{backgroundColor: "rgba(0,0,0,0.5)", textAlign:"center"}}>
          <div style={{color: "#FFFFFF"}}>
            <h1>{response}</h1>
          </div>
          <div style={{color: "#FFFFFF"}}>
            <h3>Name</h3>
            <p>{name}</p>
          </div>
          <div style={{color: "#FFFFFF"}}>
            <h3>Height</h3>
            <p>{height}</p>
          </div>
          <div style={{color: "#FFFFFF"}}>
            <h3>Weight</h3>
            <p>{weight}</p>
          </div>
          <div style={{color: "#FFFFFF"}}>
            <img src={img}/>
          </div>
          <div style={{color: "#FFFFFF"}}>
            <a href={edit}>Edit pokemon!</a>
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
