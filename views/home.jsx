var React = require('react');

class Home extends React.Component {
  render() {
    console.log(this.props);
    var url = "/pokemon/" +this.props.id + "/edit?_method=PUT";
    return (
      <html>
        <body>
          <div>
            <h1>Edit pokemon profile</h1>
            <p>ID: {this.props.id}</p>
            <form action={url} method="POST">
                <input type="hidden" name="id" value={this.props.id}/>
                <p>Num</p>
                <input name="num" value={this.props.num}/>
                <p>Name</p>
                <input name="name" value={this.props.name}/>
                <p>Img</p>
                <input name="img" value={this.props.img}/>
                <p>Height</p>
                <input name="height" value={this.props.height}/>
                <p>Weight</p>
                <input name="weight" value={this.props.weight}/>
                <p>Candy</p>
                <input name="candy" value={this.props.candy}/>
                <p>Egg</p>
                <input name="egg" value={this.props.egg}/>
                <p>Avg Spawns</p>
                <input name="avg_spawns" value={this.props.avg_spawns}/>
                <p>Spawn Time</p>
                <input name="spawn_time" value={this.props.spawn_time}/>
                <input type="submit"/>
            </form>

          </div>
        </body>
      </html>
    );
  }
}

module.exports = Home;