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
      }
    }
    if (this.props.qstring === ""){
      response = `Welcome to the online Pokedex!`
      search = true;
    }
    if (!search){
      response = `Could not find information about ${this.props.qstring} - Is that a new pokemon? Gotta catch em' all!`
    }


    return (
      <html>
        <body>
          <div>
            <h1>{response}</h1>
          </div>
          <div>
            <h1>Pokemon Name</h1>
            <h1>{name}</h1>
          </div>
          <div>
            <h1>Pokemon Height</h1>
            <h1>{height}</h1>
          </div>
          <div>
            <h1>Pokemon Weight</h1>
            <h1>{weight}</h1>
          </div>
          <div>
            <h1>Pokemon Image</h1>
            <img src={img}/>
          </div>
        </body>
      </html>
    );
  }
}

module.exports = Home;
