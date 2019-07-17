var React = require('react');

class Home extends React.Component {
  render() {
    var url = "/pokemon/" +this.props.id + "/edit";
    return (
      <html>
        <body>
          <div>
            <h1>Edit pokemon profile</h1>
            <p>ID: {this.props.id}</p>
            <form action={url} method="POST">
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
                <input name="egg" value={this.props.egge}/>
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