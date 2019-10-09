var React = require("react");

class Home extends React.Component {
  render() {
    return (
      <html>
        <body>
          <h1>Edit Pokemon {this.props.pokemon.name}</h1>
          <form method="POST" action="/">
            <label>
              id:
              <input
                type="number"
                name="id"
                placeholder="id"
                value={this.props.pokemon.id}
              />
            </label>
            <br />
            <label>
              num:
              <input
                type="text"
                name="num"
                placeholder="num"
                value={this.props.pokemon.num}
              />
            </label>
            <br />
            <label>
              name:
              <input
                type="text"
                name="name"
                placeholder="name"
                value={this.props.pokemon.name}
              />
            </label>
            <br />
            <label>
              img:
              <input
                type="url"
                name="img"
                placeholder="img"
                value={this.props.pokemon.img}
              />
            </label>
            <br />
            <label>
              height:
              <input
                type="text"
                name="height"
                placeholder="height"
                value={this.props.pokemon.height}
              />
            </label>
            <br />
            <label>
              weight:
              <input
                type="text"
                name="weight"
                placeholder="weight"
                value={this.props.pokemon.weight}
              />
            </label>
            <br />
            <label>
              candy:
              <input
                type="text"
                name="candy"
                placeholder="candy"
                value={this.props.pokemon.candy}
              />
            </label>
            <br />
            <label>
              candy_count:
              <input
                type="text"
                name="candy_count"
                placeholder="candy_count"
                value={this.props.pokemon.candy_count}
              />
            </label>
            <br />
            <label>
              egg:
              <input
                type="text"
                name="egg"
                placeholder="egg"
                value={this.props.pokemon.egg}
              />
            </label>
            <br />
            <label>
              avg_spanws:
              <input
                type="text"
                name="avg_spawns"
                placeholder="avg_spawns"
                value={this.props.pokemon.avg_spawns}
              />
            </label>
            <br />
            <label>
              spawn_time:
              <input
                type="text"
                name="spawn_time"
                placeholder="spawn_time"
                value={this.props.pokemon.spawn_time}
              />
            </label>
            <br />
            <input type="submit" value="Submit" />
            <br />
          </form>
        </body>
      </html>
    );
  }
}

module.exports = Home;
