var React = require('react');

class Home extends React.Component {
  render() {
    //code logic goes here
    console.log("testing")
    //flags if search for pokemon name turns up negative
    for (var i = 0; i < this.props.data.length; i++){
      if (this.props.data[i]["id"] === this.props.pokemon.id){
        var name = this.props.data[i]["name"]
        var height = this.props.data[i]["height"]
        var weight = this.props.data[i]["weight"]
        var img = this.props.data[i]["img"]
        var id = this.props.data[i]["id"]

      }
    }
    var edit = "/pokemon/"+id+"/edit"
    var deleteP = "/pokemon/"+id+"/delete"

    return (
      <html>
        <body style={{backgroundColor: "rgba(0,0,0,0.5)", textAlign:"center"}}>
          <div style={{color: "#FFFFFF"}}>
            <h1>Welcome to the world of {name}</h1>
          </div>
          <div style={{color: "#FFFFFF"}}>
            <h3>Pokemon Name</h3>
            <p>{name}</p>
          </div>
          <div style={{color: "#FFFFFF"}}>
            <h3>Pokemon Height</h3>
            <p>{height}</p>
          </div>
          <div style={{color: "#FFFFFF"}}>
            <h3>Pokemon Weight</h3>
            <p>{weight}</p>
          </div>
          <div style={{color: "#FFFFFF"}}>
            <h3>Pokemon Image</h3>
            <img src={img}/>
          </div>
          <div style={{color: "#FFFFFF"}}>
            <a href={edit}>Edit pokemon!</a>
          </div>
          <div style={{color: "#FFFFFF"}}>
            <a href={deleteP}>Delete pokemon!</a>
          </div>
          <div style={{color: "#FFFFFF"}}>
            <a href="/pokemon">Back to main!</a>
          </div>
        </body>
      </html>
    );
  }
}

module.exports = Home;
