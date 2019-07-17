var React = require('react');

class Editpage extends React.Component {
  render() {
    let url = "/pokemon/" + this.props.id + "?_method=PUT";

    return (
      <html>
      <head>
        <title>Edit that Mon!</title>
        <link href="https://fonts.googleapis.com/css?family=Ubuntu:300,400&display=swap" rel="stylesheet"/>
        <link rel="stylesheet" type="text/css" href="/style.css"/>
        </head>
        <body>
          <div>
            <h1>Edit my MON: {this.props.name}</h1>
            <img src= {this.props.img}/>
            <form action={url} method="POST">
                <h1>ID</h1>
                <input type="number" name="id" value={this.props.id}/>
                <h1>Num</h1>
                <input type="text" name="num" value={this.props.num}/>
                <h1>Name</h1>
                <input type="text" name="name" value={this.props.name}/>
                <h1>Img Src</h1>
                <input type="text" name="img" value={this.props.img}/>
                <h1>Height</h1>
                <input type="text" name="height" value={this.props.height}/>
                <h1>Weight</h1>
                <input type="text" name="weight" value={this.props.weight}/>
                <h1>Candy</h1>
                <input type="text" name="candy" value={this.props.candy}/>
                <h1>Candy Count</h1>
                <input type="text" name="candycount" value={this.props.candy_count}/>
                <h1>Egg</h1>
                <input type="text" name="candycount" value={this.props.egg}/>
                <h1>Average Spawns</h1>
                <input type="number" name="avgspawns" value={this.props.avg_spawns}/>
                 <h1>Spawn Time</h1>
                <input type="text" name="spawntime" value={this.props.spawn_time}/>
                <input type="submit"/>
            </form>
          </div>
        </body>
      </html>
    );
  }
}

module.exports = Editpage;