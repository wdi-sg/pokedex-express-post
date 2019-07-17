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
          <div className = "edit-mon">
            <h1>Edit my MON: {this.props.name}</h1>
            <img src= {this.props.img}/>
                <form action={url} method="POST" className = "form-container">
                    <h2>ID</h2>
                    <input type="number" name="id" placeholder={this.props.id}/>

                    <h2>Num</h2>
                    <input type="text" name="num" placeholder={this.props.num}/>

                    <h2>Name</h2>
                    <input type="text" name="name" placeholder={this.props.name}/>

                    <h2>Img Src</h2>
                    <input type="text" name="img" placeholder={this.props.img}/>

                    <h2>Height</h2>
                    <input type="text" name="height" placeholder={this.props.height}/>

                    <h2>Weight</h2>
                    <input type="text" name="weight" placeholder={this.props.weight}/>

                    <h2>Candy</h2>
                    <input type="text" name="candy" placeholder={this.props.candy}/>

                    <h2>Candy Count</h2>
                    <input type="text" name="candycount" placeholder={this.props.candy_count}/>

                    <h2>Egg</h2>
                    <input type="text" name="candycount" placeholder={this.props.egg}/>

                    <h2>Average Spawns</h2>
                    <input type="number" name="avgspawns" placeholder={this.props.avg_spawns}/>

                    <h2>Spawn Time</h2>
                    <input type="text" name="spawntime" placeholder={this.props.spawn_time}/>
                    <br/>
                    <input type="submit"/>
                </form>
              </div>
        </body>
      </html>
    );
  }
}

module.exports = Editpage;