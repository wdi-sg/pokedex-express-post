var React = require('react');

class ID extends React.Component {
  render() {
    var id = parseInt(this.props.id)+1;
    var url = "/pokemon/"+id +"/edit" ;
    return (
       <html>
        <body>
            <div>
                <h1>{this.props.pokey.name}</h1>
                <div><img src = {this.props.pokey.img}/></div>
                <p>ID: {this.props.pokey.id}</p>
                <p>Num: {this.props.pokey.num}</p>
                <p>Name: {this.props.pokey.name}</p>
                <p>Height: {this.props.pokey.height}</p>
                <p>Weight: {this.props.pokey.weight}</p>
                <p>Candy: {this.props.pokey.candy}</p>
                <p>Candy Count: {this.props.pokey.candy_count}</p>
                <p>Egg: {this.props.pokey.egg}</p>
                <p>Average Spawn: {this.props.pokey.avg_spawns}</p>
                <p>Spawn Time: {this.props.pokey.spawn_time}</p>
            </div>
            <button><a href = {url}>Edit this Pokemon</a></button>
        </body>
        </html>
    );
  }
}

module.exports = ID;

