var React = require("react");
class Edit extends React.Component {
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
              <h1>Edit Pokemon: {name}</h1>
            <form method="POST" action={"/pokemon/"+id+"?_method=put"}>
              <p>ID: <input type="text" name="id" value= {id}/></p>
              <p>NUM: <input type="text" name="num" value ={num}/></p>
              <p> NAME: <input type="text" name="name" value = {name} /></p>
             
              <p>Height: <input type="text" name="height" value={height} /></p>
              <p> Weight: <input type="text" name="weight" value={weight} /></p>
              <p> Candy: <input type="text" name="weight" value={candy} /></p>
              <p> Egg: <input type="text" name="weight" value={egg} /></p>
              <p> Average Spawn: <input type="text" name="weight" value={spawn} /></p>
              <p> Spawn Time: <input type="text" name="weight" value={spawntime} /></p>
              <p> <img src={img} alt=""/></p>
            
              <input type="submit" />
            </form>
          </div>
        </body>
      </html>
    );
  }
}

module.exports = Edit;
