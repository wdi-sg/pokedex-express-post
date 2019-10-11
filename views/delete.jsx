var React = require('react');
class Delete extends React.Component {
  render() {
    var props = this.props
    var id = props.id;
    var num = props.num;
    var name = props.name;
    var img = props.img;
    var height = props.height;
    var weight = props.weight;
    var candy = props.candy;
    var egg = props.egg;
    var spawn = props.spawns;
    var spawntime = props.spawntime;
    return (
      <html>
        <body>
          <div>
              <img src={img} alt=""/>
         <h1>You are Deleting the Pokemon: {name}</h1>
        <form method="POST" action={"/pokemon/"+id+"?_method=delete"} >
        <input type="submit"  />
        </form>
          </div>
        </body>
      </html>
    );
  }
}

module.exports = Delete;