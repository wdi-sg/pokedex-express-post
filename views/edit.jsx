var React = require('react');

class Edit extends React.Component {
  render() {
    const id = this.props.id;
    const name = this.props.name;
    const num = this.props.num;
    const weight = this.props.weight;
    const height = this.props.height;
    const egg = this.props.egg;
    const img = this.props.img;

    let formAction = '/pokemon/' + id + '?_method=PUT';

    return (
      <div>
      <h1>Edit Pokemon Details</h1>
      <form method="POST" action={formAction} >
      Name: <input type= "text" name="pokeName" value={name} /><br></br>
      Num: <input type= "text" name="pokeNum" value={num} /><br></br>
      Img: <input type= "text" name="pokeImg" value={img} /><br></br>
      Weight: <input type= "text" name="pokeWeight" value={weight} /><br></br>
      Height: <input type= "text" name="pokeHeight" value={height} /><br></br>
      Egg Distance: <input type= "text" name="pokeEgg" value={egg} /><br></br>
      <input type="submit" value="Save Changes" />
      </form>
      </div>
    );
  }
}

module.exports = Edit;