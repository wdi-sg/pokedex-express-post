var React = require('react');

class showPokemon extends React.Component {
  render() {
    return (
      <html>
        <body>
          <div>
            <h1>{this.props.name}</h1>
            <img src={this.props.img} alt="image"/>
          </div>
          {/*Start Table*/}
          <table class="table">
            <tbody>
								<tr>
                	<th>ID</th>
									<td>{this.props.id}</td>
                </tr>
                <tr>
                <th>Height</th>
									<td>{this.props.height}</td>
                </tr>
								
                <tr>
                <th>Weight</th>
									<td>{this.props.weight}</td>
                </tr>

								<tr>
                <th>Candy</th>
									<td>{this.props.candy}</td>
                </tr>

								<tr>
                <th>Egg</th>
									<td>{this.props.egg}</td>
                </tr>

								<tr>
                <th>Average Spawn</th>
									<td>{this.props.avg_spawns}</td>
                </tr>

								<tr>
                <th>Spawn Time</th>
									<td>{this.props.spawn_time}</td>
                </tr>
            </tbody>
          </table>


        </body>
      </html>
    );
  }
}

module.exports = showPokemon;