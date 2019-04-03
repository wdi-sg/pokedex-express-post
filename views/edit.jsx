var React = require('react');

class Home extends React.Component {
  render() {

    let actionAttribute = `/pokemon/${this.props.idKey}?_method=PUT`;

    return (
        <body>
        <h1>EDIT pokemons</h1>
        <form method="POST" action={actionAttribute}>
        Edit num:<input type="text" name="num" value={this.props.recordKey.num}/><br/>
        Edit name:<input type="text" name="name" value={this.props.recordKey.name}/><br/>
        Edit img:<input type="text" name="img" value={this.props.recordKey.img}/><br/>
        Edit height:<input type="text" name="height" value={this.props.recordKey.height}/><br/>
        Edit weight:<input type="text" name="weight" value={this.props.recordKey.weight}/><br/>
        Edit candy:<input type="text" name="candy" value={this.props.recordKey.candy}/><br/>
        Edit candy_count:<input type="text" name="candy_count" value={this.props.recordKey.candy_count}/><br/>
        Edit egg:<input type="text" name="egg" value={this.props.recordKey.egg}/><br/>
        Edit avg_spawns:<input type="text" name="avg_spawns" value={this.props.recordKey.avg_spawns}/><br/>
        Edit spawn_time:<input type="text" name="spawn_time" value={this.props.recordKey.spawn_time}/><br/>
        <input type="submit" value="Confirm"/>
        </form>
        </body>
    );
  }
}

module.exports = Home;