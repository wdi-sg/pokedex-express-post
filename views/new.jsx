var React = require('react');

class New extends React.Component {
  render() {
    return (
      <html>
        <body>
          <div>
            <h1>New Pokemon Entry!!!!!!</h1>
            <form method= "POST" action="/pokemon">
                <p>Id</p>
                <input name="id" readonly="readonly" defaultValue={parseInt(this.props.pokemonId)}/>
                <p>Num</p>
                <input name="num" readonly="readonly" defaultValue={this.props.pokemonId}/>
                <p>Name</p>
                <input name="name"/>
                <p>Img</p>
                <input name="img"/>
                <p>Height</p>
                <input name="height"/>
                <p>Weight</p>
                <input name="weight"/>
                <p>Candy</p>
                <input name="candy"/>
                <p>Candy_Count</p>
                <input name="candy_count"/>
                <p>Egg Hatch Steps</p>
                <input name="egg"/>
                <p>Avg_Spawns</p>
                <input name="avg_spawns"/>
                <p>Spawn_Time</p>
                <input name="spawn_time"/>
                <input type="submit"/>
            </form>
          </div>
        </body>
      </html>
    );
  }
}

module.exports = New;