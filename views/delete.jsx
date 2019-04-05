var React = require('react');

class Delete extends React.Component {
  render() {
  	const id = this.props.id;
  	const name = this.props.name;
  	const num = this.props.num;
  	const weight = this.props.weight;
  	const height = this.props.height;
  	const egg = this.props.egg;
  	const img = this.props.image;
  	const zero = 0;

  	let formAction = '/pokemon/' + id + '?_method=DELETE';

	return (
	<div>
      <h1>Delete Pokemon? </h1>
      <form method="POST" action={formAction} >
      Name: <input type= "text" name="pokeName" value={name} /><br></br>
      Num: <input type= "text" name="pokeNum" value={num} /><br></br>
      <input type="submit" value="Delete Pokemon Record?" />
      </form>
      </div>

	);
  }
}

module.exports = Delete;