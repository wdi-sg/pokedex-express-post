var React = require('react');

class Home extends React.Component {

  render() {
    //code logic goes here
    //form to sort by values
    var formAction = "/pokemon/"+this.props.data.id+"?_method=PUT"
    var form =
      <form method="POST" action={formAction}>
      Pokemon ID
      <input type="text" name="id" value={this.props.data.id} disabled/>
      <input type="hidden" name="id" value={this.props.data.id}/>
      Pokemon Number
      <input type="text" name="num" value={this.props.data.num} disabled/>
      <input type="hidden" name="num" value={this.props.data.num}/>
      Pokemon Name
      <input type="text" name="name" value={this.props.data.name}/>
      Pokemon IMG
      <input type="text" name="img" value={this.props.data.img}/>
      Pokemon Height
      <input type="text" name="height" value={this.props.data.height}/>
      Pokemon Weight
      <input type="text" name="weight" value={this.props.data.weight}/>
      Pokemon Candy
      <input type="text" name="candy" value={this.props.data.candy}/>
      Pokemon Candy Count
      <input type="text" name="candy_count" value={this.props.data.candy_count}/>
      Pokemon Egg
      <input type="text" name="egg" value={this.props.data.egg}/>
      Pokemon Average Spawns
      <input type="text" name="avg_spawns" value={this.props.data.avg_spawns}/>
      Pokemon Spawn Time
      <input type="text" name="spawn_time" value={this.props.data.spawn_time}/>
      <input type="submit" value="submit"/>
      </form>


    return (
      <html>
        <body>
          <div>
            <h1>You are editing {this.props.data.name}</h1>
          </div>
          <div style={{width: '10%'}}>
            {form}
          </div>
        </body>
      </html>
    );
  }
}

module.exports = Home;
