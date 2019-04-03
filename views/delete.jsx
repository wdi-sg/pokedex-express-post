var React = require('react');

class Delete extends React.Component {

  render() {

// add a new page with a form ( it will be a form with only a single button )
// make the path for this page /pokemon/:id/delete
// submit the form to /pokemon/:id with method DELETE
    const id = this.props.id;
    const name = this.props.name;
    const num = this.props.num;
    const weight = this.props.weight;
    const height = this.props.height;
    const egg = this.props.egg;
    const img = this.props.img;
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