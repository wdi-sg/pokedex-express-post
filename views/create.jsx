var React = require('react');

class Createpage extends React.Component {
  render() {
    return (
      <html>
      <head>
        <title>The Pokemon Laboratory!</title>
        <link href="https://fonts.googleapis.com/css?family=Ubuntu:300,400&display=swap" rel="stylesheet"/>
        <link rel="stylesheet" type="text/css" href="/style.css"/>
        </head>
        <header>
        <nav>
            <ul id="nav-container">
                <li className="item"><a href="/pokemon">Home</a></li>
                <li className="item"><a href="/pokemon/new">New</a></li>
                <li className="item"><a href="null">Types</a></li>
                <div id="bar"></div>
            </ul>
        </nav>
        </header>
        <body>
          <div className = "create-mon">
            <h1>Create a new Pokemon</h1>
                <form action="/pokemon "method="POST" className = "form-container">
                    <h2>ID</h2>
                    <input type="number" name="id" defaultValue="ID"/>

                    <h2>Num</h2>
                    <input type="text" name="num" defaultValue="Number"/>

                    <h2>Name</h2>
                    <input type="text" name="name" defaultValue="Name"/>

                    <h2>Img Src</h2>
                    <input type="text" name="img" defaultValue="Img Src"/>

                    <h2>Height</h2>
                    <input type="text" name="height" defaultValue="Height"/>

                    <h2>Weight</h2>
                    <input type="text" name="weight" defaultValue="Weight"/>

                    <h2>Candy</h2>
                    <input type="text" name="candy" defaultValue="Candy"/>

                    <h2>Candy Count</h2>
                    <input type="text" name="candycount" defaultValue="Candy Count"/>

                    <h2>Egg</h2>
                    <input type="text" name="egg" defaultValue="Egg"/>

                    <h2>Average Spawns</h2>
                    <input type="number" name="avgspawns" defaultValue="Average Spawns"/>

                    <h2>Spawn Time</h2>
                    <input type="text" name="spawntime" defaultValue="Spawn Time"/>
                    <br/>
                    <input type="submit"/>
                </form>
              </div>
        </body>
      </html>
    );
  }
}

module.exports = Createpage;